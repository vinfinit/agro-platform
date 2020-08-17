import { Fragment } from 'react'
import { Circle, Marker } from '@react-google-maps/api'
import { Point } from '../../utils/geometry'

const drawingOptions = {
  circle: {
    fillColor: '#c004ff',
    fillOpacity: 0.4,
    strokeColor: '#8a04ff',
    strokeWeight: 2
  },
  savedCircle: {
    fillColor: '#04fbff',
    fillOpacity: 0.4,
    strokeColor: '#02d5ff',
    strokeWeight: 2
  },
};

const CanvasManagerCircle = (props) => {
  const circles = props.savedCircles.map(({ center, area }) => ({
    center: Point(center.lat, center.lng),
    radius: Math.sqrt(area * 10000 / Math.PI),
    area: `${area}`
  }));
    
  return (
    <Fragment>
      {circles.map((circle, i) => (
        <Fragment key={i}>
          <Circle
            center={circle.center}
            radius={circle.radius}
            options={drawingOptions.circle}
          />
          <Marker
            position={circle.center}
            label={circle.area}
          />
        </Fragment>
      ))}
      {/* {props.newPolygons.map((polygon, i) => (
        <Polygon 
          key={i}
          path={polygon.getPath()}
          options={drawingOptions.polygonOptions}
          onClick={props.onPolygonClick(polygon, i)}
        />
      ))} */}
    </Fragment>
  );
};

export default CanvasManagerCircle;