import { Fragment, useState, useEffect } from 'react'
import { DrawingManager } from '@react-google-maps/api'
import { useHotkeys } from 'react-hotkeys-hook'
import CanvasManagerPolygon from './CanvasManagerPolygon'
import CanvasManagerMarker from './CanvasManagerMarker'
import Loader from '../Loader'
import { useEvents } from '../../utils/useEvents'

const drawingOptions = {
  drawingControlOptions: {
    drawingModes: ['polygon', 'marker']
  },
};

const AgroDrawingManager = (props) => {
  const { polygons: savedPolygons, markers: savedMarkers, updateCluster } = props

  const [polygons, setPolygons] = useState(savedPolygons);
  const [markers, setMarkers] = useState(savedMarkers);
  const [isLoading, toggleLoading] = useState(false);
  const eventsEmitter = useEvents()

  useEffect(() => {
    setPolygons(savedPolygons);
    setMarkers(savedMarkers);
  }, [savedPolygons, savedMarkers]);

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

  useEffect(() => {
    const saveData = async () => {
      toggleLoading(true);
      await updateCluster(markers, polygons);
      toggleLoading(false);
    }

    eventsEmitter.on('SAVE', saveData)
    return () => {
      eventsEmitter.off('SAVE', saveData)
    }
  }, [markers, polygons, toggleLoading])

  useHotkeys('ctrl+k', async () => {
    toggleLoading(true);
    await updateCluster(markers, polygons);
    toggleLoading(false);
  }, [markers, polygons, toggleLoading]);

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