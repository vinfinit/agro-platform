import { Fragment, useState, useEffect } from 'react'
import { Polygon } from '@react-google-maps/api'
import StrokeFill from './StrokeFill'
import { AgroInfoWindow, InfoWindowBodyPolygon } from '../AgroInfoWindow'
import { computeArea, getCenter, getBounds, round } from '../../utils/geometry'
import { 
  HARVESTER_SIZE, 
  WORKING_SPEED, 
  TURN_SPEED,
} from '../../utils/constants'

const drawingOptions = {
  polygonOptions: {
    fillColor: '#c004ff',
    fillOpacity: 0.4,
    strokeColor: '#8a04ff',
    strokeWeight: 2
  },
  savedPolygonOptions: {
    fillColor: '#04fbff',
    fillOpacity: 0.4,
    strokeColor: '#02d5ff',
    strokeWeight: 2
  },
};

const CanvasManagerPolygon = (props) => {
  const [activePolygon, setActivePolygon] = useState(null);
  const [harvesterSize, setHarversterSize] = useState(HARVESTER_SIZE);
  const [workingSpeed, setWorkingSpeed] = useState(WORKING_SPEED);
  const [turnSpeed, setTurnSpeed] = useState(TURN_SPEED);
  const [longestPerpendicular, setLongestPerpendicular] = useState(0)
  const [projectSegments, setProjectSegments] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [singleTurnDistance, setSingleTurnDistance] = useState(0);
  const [nLines, setNLines] = useState(0);

  useEffect(() => {
    if (activePolygon) {
      setTotalDistance(round(activePolygon.area / +harvesterSize));
      setSingleTurnDistance((+harvesterSize * 105) / 14 + 34);
      if (longestPerpendicular) {
        setNLines(longestPerpendicular / harvesterSize);
      }
    }
  }, [activePolygon, harvesterSize, longestPerpendicular]);

  const onPolygonClick = (polygon, index) => {
    const googlePolygon = new google.maps.Polygon({ paths: polygon });
    setActivePolygon({
      polygon,
      index,
      position: getCenter(googlePolygon),
      area: computeArea(googlePolygon),
      bounds: getBounds(googlePolygon),
    });
    console.log('set active polygon');
  }
    
  return (
    <Fragment>
      {props.polygons.map((polygon, i) => 
        <Polygon 
          key={i}
          path={polygon}
          options={drawingOptions.savedPolygonOptions}
          onClick={() => onPolygonClick(polygon, i, true)}
          onRightClick={() => props.onPolygonChange(null, i)}
        />
      )}
      {activePolygon && 
        <StrokeFill 
          key={activePolygon.index}
          polygon={activePolygon.polygon}
          projectSegments={
            (projectionLen, originLen) => setProjectSegments({ projectionLen, originLen })
          }
          setLongestPerpendicular={setLongestPerpendicular}
        />
      }
      {activePolygon && 
        <AgroInfoWindow
          polygon={activePolygon}
          onClose={() => setActivePolygon(null)}
        >
          <InfoWindowBodyPolygon
            polygon={activePolygon}
            totalDistance={totalDistance}
            workingSpeed={workingSpeed}
            onWorkingSpeedChange={setWorkingSpeed}
            nLines={nLines}
            singleTurnDistance={singleTurnDistance}
            turnSpeed={turnSpeed}
            onTurnSpeedChange={setTurnSpeed}
            harvesterSize={harvesterSize}
            onHarvesterSizeChange={setHarversterSize}
          />
        </AgroInfoWindow>
      }
    </Fragment>
  );
};

export default CanvasManagerPolygon;