import { Fragment, useState, useEffect } from 'react'
import { DrawingManager } from '@react-google-maps/api'
import { useBeforeunload } from 'react-beforeunload'
import { useHotkeys } from 'react-hotkeys-hook'
import CanvasManagerPolygon from './CanvasManagerPolygon'
import CanvasManagerMarker from './CanvasManagerMarker'
import Loader from '../Loader'

const drawingOptions = {
  drawingControlOptions: {
    drawingModes: ['polygon', 'marker']
  },
};

const AgroDrawingManager = (props) => {
  const [polygons, setPolygons] = useState([]);
  const [markers, setMarkers] = useState([...props.markers]);
  const [isLoading, toggleLoading] = useState(false);
  
  useEffect(() => {
    setMarkers([...props.markers])
  }, [props.markers]);

  const onPolygonComplete = (polygon) => {
    setPolygons([...polygons, polygon]);
    polygon.setMap(null);
  };

  const onMarkerComplete = (marker) => {
    const position = marker.getPosition();
    const [lat, lng] = [position.lat(), position.lng()];
    setMarkers([...markers, { 
      center: { lat, lng },
      area: 20,
    }]);
    marker.setMap(null);
  };

  const onMarkerChange = (marker, index) => {
    const markersCopy = [...markers];
    if (marker) {
      markersCopy[index] = {
        center: { ...marker.center },
        area: marker.area
      };
    } else {
      markersCopy.splice(index, 1);
    }
    setMarkers(markersCopy);
  }

  useHotkeys('ctrl+k', async () => {
    toggleLoading(true);
    await props.uploadMarkers(markers);
    toggleLoading(false);
  }, [markers]);

  return (
    <Fragment>
      <DrawingManager
        onPolygonComplete={onPolygonComplete}
        onMarkerComplete={onMarkerComplete}
        options={drawingOptions}
      />
      <CanvasManagerPolygon
        savedPolygons={props.polygons}
        newPolygons={polygons}
        savePolygon={props.savePolygon}
        deletePolygon={props.deletePolygon}
      />
      <CanvasManagerMarker
        markers={markers}
        onMarkerChange={onMarkerChange}
      />
      {isLoading && <Loader />}
    </Fragment>
  );
};

export default AgroDrawingManager