import { Fragment, useState, useEffect } from 'react'
import { DrawingManager } from '@react-google-maps/api'
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
  const [polygons, setPolygons] = useState([...props.polygons]);
  const [markers, setMarkers] = useState([...props.markers]);
  const [isLoading, toggleLoading] = useState(false);

  useEffect(() => {
    setPolygons(props.polygons);
    setMarkers(props.markers);
  }, [props.polygons, props.markers]);

  const onPolygonComplete = (polygon) => {
    const paths = polygon.getPath().getArray().map(p => ({
      lat: p.lat(),
      lng: p.lng(),
    }));

    setPolygons([...polygons, paths]);
    polygon.setMap(null);
  };

  const onPolygonChange = (polygon, index) => {
    const polygonsCopy = [...polygons];
    if (polygon) {
      polygonsCopy[index] = polygon.getPath().getArray().map(p => ({
        lat: p.lat(),
        lng: p.lng(),
      }));
    } else {
      polygonsCopy.splice(index, 1);
    }
    setPolygons(polygonsCopy);
  }

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
    await props.updateCluster(markers, polygons);
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
        polygons={polygons}
        onPolygonChange={onPolygonChange}
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