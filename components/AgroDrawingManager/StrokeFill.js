import { Component, Fragment } from 'react'
import { Polyline } from '@react-google-maps/api'
import { polygon as turfPolygon, lineString, lineIntersect } from '@turf/turf'
import { cos, tangent, arcTangent, computeLength, Point, isSamePoints } from '../../utils/geometry'

const ANGLE_WINDOW = 5;

class StrokeFill extends Component {
  constructor(props) {
    super(props);

    this.projectSegmentsData = {
      projectionLen: 0,
      originLen: 0,
    }
  }

  splitPolygonIntoSegments = polygon => {
    const path = polygon.getPath().getArray();
    const segments = [];
    for (let i = 0; i < path.length; i++) {
      const [pointA, pointB] = [ 
        path[i], i+1 !== path.length ? path[i+1] : path[0] 
      ];
      if (isSamePoints(pointA, pointB)) {
        continue;
      }
      const k = (pointA.lat() - pointB.lat()) / (pointA.lng() - pointB.lng());
      segments.push({
        segment: [pointA, pointB],
        k,
        angle: arcTangent(k),
        length: computeLength(pointA, pointB),
      })
    }
    return segments
  }

  findBiggestSegmentCluster = segments => {
    const cluster = [];
    segments.forEach((segmentA, i) => {
      cluster.push({ segments: [ segmentA ] });
      segments.forEach((segmentB, j) => {
        if (i !== j &&
          segmentA.angle - ANGLE_WINDOW <= segmentB.angle &&
          segmentB.angle <= segmentA.angle + ANGLE_WINDOW
        ) {
          cluster[i].segments.push(segmentB);
        }
      });
      cluster[i].k = segmentA.k;
      cluster[i].totalLength = cluster[i].segments.reduce((acc, segment) => acc + segment.length, 0);
    });

    const biggestCluster = cluster.reduce(
      (prev, cur) => (prev.totalLength > cur.totalLength) ? prev : cur
    );

    return biggestCluster
  }

  wrapPolygonIntoRectangle = polygon => {
    let [north, south, east, west] = [0, 90, 0, 180];
    polygon.getPath().forEach(point => {
      north = point.lat() > north ? point.lat() : north;
      south = point.lat() < south ? point.lat() : south;
      east = point.lng() > east ? point.lng() : east;
      west = point.lng() < west ? point.lng() : west;
    });
    return { north, south, east, west }
  }

  computeLatLngSteps = ({ north, south, east, west }, k, nMaxSteps = 75) => {
    let lat_step, lng_step, n_lat_steps, n_lng_steps;
    if (k > 0) {
      lat_step = (north - south) / nMaxSteps;
      lng_step = Math.abs(lat_step / k);
    } else {
      lng_step = (east - west) / nMaxSteps;
      lat_step = Math.abs(lng_step * k);
    }
    let i = 1;
    do {
      lat_step *= i;
      lng_step *= i; 
      n_lat_steps = Math.floor((north-south)/lat_step);
      n_lng_steps = Math.floor((east-west)/lng_step);
      i+=0.1;
    } while (n_lat_steps + n_lng_steps > nMaxSteps);
    return { lat_step, lng_step, n_lat_steps, n_lng_steps }
  }

  generateDirectionSegments = ({ north, south, east, west }, k) => {
    const { lat_step, lng_step, n_lat_steps, n_lng_steps } 
      = this.computeLatLngSteps({ north, south, east, west }, k);

    const segments = [];

    [...Array(n_lat_steps).keys()].forEach(i => {
      segments.push([
        Point(north - i*lat_step, west), 
        Point(north - i*lat_step + k*(east-west), east),
      ])
    });
    [...Array(n_lng_steps).keys()].forEach(i => {
      segments.push([
        Point(k > 0 ? south : north, west + i*lng_step), 
        Point(k > 0 ? north : south, west + i*lng_step + Math.abs((north-south)/k)),
      ])
    });
    return segments
  }

  computeIntersectSegments = (segments, polygon) => {
    const polygonPath = polygon.getPath().getArray().map(i => ([i.lat(), i.lng()]));
    polygonPath.push(polygonPath[0]);
    const polygonFeature = turfPolygon([polygonPath]);
    const intersects = [];
    segments.forEach(segment => {
      const line = lineString([
        [segment[0].lat(), segment[0].lng()], 
        [segment[1].lat(), segment[1].lng()],
      ]);
      intersects.push(lineIntersect(line, polygonFeature));
    });
    return intersects
      .filter(({ features }) => features.length)
      .map(({ features }) => features
        .map(({ geometry: { coordinates }}) => coordinates))
      .map(intersection => intersection.map(([ lat, lng ]) => Point(lat, lng)))
  }

  getNormal = (k) => {
    const degrees = arcTangent(k);
    return tangent(degrees + 90)
  }

  projectPolygonToNormal = (segments, n, k) => {
    const kDegrees = arcTangent(k);
    const nDegrees = arcTangent(n);
    const segmentsForProjection = [];

    segments.forEach(segment => {
      if (!(segment.angle - ANGLE_WINDOW <= kDegrees &&
        kDegrees <= segment.angle + ANGLE_WINDOW
      )) {
        segmentsForProjection.push(segment)
      }
    });

    let [projectionLen, originLen] = [0, 0];
    segmentsForProjection.forEach(segment => {
      projectionLen += Math.abs(cos(segment.angle - nDegrees) * segment.length);
      originLen += segment.length;
    });

    return [projectionLen, originLen];
  }

  computePerpendicularDistance = (segmentStart, segmentEnd, point) => {
    const xA = segmentStart.lat();
    const yA = segmentStart.lng();
    const xB = segmentEnd.lat();
    const yB = segmentEnd.lng();
    const xC = point.lat();
    const yC = point.lng();

    // Vector AB
    const ABx = xB - xA;
    const ABy = yB - yA;

    // Vector AC
    const ACx = xC - xA;
    const ACy = yC - yA;

    // Dot product of AC and AB
    const dotProduct = ACx * ABx + ACy * ABy

    // Dot product of AB with itself (AB·AB)
    const ABLengthSquared = ABx * ABx + ABy * ABy

    // Calculate the projection scalar (t)
    const t = dotProduct / ABLengthSquared

    // Calculate the coordinates of point D
    const xD = xA + t * ABx;
    const yD = yA + t * ABy;

    // console.log('A', xA, yA)
    // console.log('B', xB, yB)
    // console.log('C', xC, yC)
    // console.log('D', xD, yD)
    // console.log('len', computeLength(point, Point(xD, yD)))

    return computeLength(point, Point(xD, yD));
  }

  // Функция для вычисления самого длинного перпендикуляра по углу нормали
  findLongestPerpendicularByNormal = (mainSegments, segments, k) => {
    const kDegrees = arcTangent(k);
    const segmentsForProjection = [];

    segments.forEach(segment => {
      if (!(segment.angle - ANGLE_WINDOW <= kDegrees &&
        kDegrees <= segment.angle + ANGLE_WINDOW
      )) {
        segmentsForProjection.push(segment)
      }
    });

    let maxDistance = 0;
    mainSegments.forEach(mainSegment => {
      segmentsForProjection.forEach(segment => {
        const dA = this.computePerpendicularDistance(mainSegment.segment[0], mainSegment.segment[1], segment.segment[0])
        const dB = this.computePerpendicularDistance(mainSegment.segment[0], mainSegment.segment[1], segment.segment[1])
        maxDistance = Math.max(maxDistance, dA, dB)
      })
    })

    return maxDistance;
  }

  componentDidMount() {
    this.props.projectSegments(this.projectSegmentsData.projectionLen, this.projectSegmentsData.originLen);
  }

  render() {
    const googlePolygon = new google.maps.Polygon({ paths: this.props.polygon });

    const rectWrapper = this.wrapPolygonIntoRectangle(googlePolygon);
    const polygonSegments = this.splitPolygonIntoSegments(googlePolygon);
    const { segments: mainSegments, k } = this.findBiggestSegmentCluster(polygonSegments);
    const longestPerpendicular = this.findLongestPerpendicularByNormal(mainSegments, polygonSegments, k)
    console.log('longestPerpendicular ', longestPerpendicular)
    this.props.setLongestPerpendicular(longestPerpendicular)
    const directionSegments = this.generateDirectionSegments(rectWrapper, k);
    const intersectSegments = this.computeIntersectSegments(directionSegments, googlePolygon);

    const n = this.getNormal(k);
    const [projectionLen, originLen] = this.projectPolygonToNormal(polygonSegments, n, k);
    this.projectSegmentsData = { projectionLen, originLen };

    return (
      <Fragment>
        {intersectSegments.map((segment, i) => (
          <Polyline
            key={i}
            path={segment}
            options={{
              strokeWeight: 1
            }}
          />
        ))}
      </Fragment>
    )
  }
}

export default StrokeFill