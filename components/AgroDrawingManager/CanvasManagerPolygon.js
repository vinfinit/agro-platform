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
  const [projectSegments, setProjectSegments] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [singleTurnDistance, setSingleTurnDistance] = useState(0);
  const [nLines, setNLines] = useState(0);

  useEffect(() => {
    console.log('calculate metrics', activePolygon);
    if (activePolygon) {
      setTotalDistance(round(activePolygon.area / +harvesterSize));
      setSingleTurnDistance((+harvesterSize * 105) / 14 + 34);
      if (projectSegments) {
        setNLines(projectSegments.projectionLen / 2 / harvesterSize);
      }
    }
  }, [activePolygon]);

  const onPolygonClick = (polygon, index, isSaved = false) => () => {
    setActivePolygon({
      polygon,
      isSaved,
      index,
      position: getCenter(polygon),
      area: computeArea(polygon),
      bounds: getBounds(polygon),
    });
    console.log('set active polygon');
  }

  const savePolygon = async () => {
    const polygon = activePolygon.bounds.map(p => ({
      lat: p.lat(),
      lng: p.lng(),
    }));

    setActivePolygon(null);
    await props.savePolygon(polygon)
  }

  const deletePolygon = async () => {
    const polygon = activePolygon.bounds.map(p => ({
      lat: p.lat(),
      lng: p.lng(),
    }));

    setActivePolygon(null);
    await props.deletePolygon(polygon)
  }

  const savedPolygons = props.savedPolygons.map((paths) => new google.maps.Polygon({ paths }));
    
  return (
    <Fragment>
      {savedPolygons.map((polygon, i) => {
        <Polygon 
          key={i}
          path={polygon.getPath()}
          options={drawingOptions.savedPolygonOptions}
          onClick={onPolygonClick(polygon, i, true)}
        />
      })}
      {props.newPolygons.map((polygon, i) => (
        <Polygon 
          key={i}
          path={polygon.getPath()}
          options={drawingOptions.polygonOptions}
          onClick={onPolygonClick(polygon, i)}
        />
      ))}
      {activePolygon && 
        <StrokeFill 
          key={activePolygon.index}
          polygon={activePolygon.polygon}
          projectSegments={
            (projectionLen, originLen) => setProjectSegments({ projectionLen, originLen })
          }
        />
      }
      {activePolygon && 
        <AgroInfoWindow
          polygon={activePolygon}
          onSave={savePolygon}
          onDelete={deletePolygon}
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