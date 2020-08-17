import { Fragment, useState } from 'react'
import { DrawingManager } from '@react-google-maps/api'
import CanvasManagerPolygon from './CanvasManagerPolygon'
import CanvasManagerCircle from './CanvasManagerCircle'

const drawingOptions = {
  drawingControlOptions: {
    drawingModes: ['polygon', 'marker']
  },
};

const AgroDrawingManager = (props) => {
  const [polygons, setPolygons] = useState([]);

  const onPolygonComplete = (polygon) => {
    setPolygons([...polygons, polygon]);
    polygon.setMap(null);
  };

  return (
    <Fragment>
      <DrawingManager
        onPolygonComplete={onPolygonComplete}
        options={drawingOptions}
      />
      <CanvasManagerPolygon
        savedPolygons={props.polygons}
        newPolygons={polygons}
        savePolygon={props.savePolygon}
        deletePolygon={props.deletePolygon}
      />
      <CanvasManagerCircle
        savedCircles={props.circles}
        newCircles={[]}
        onCircleClick={() => {}}
      />
    </Fragment>
  );
};

export default AgroDrawingManager