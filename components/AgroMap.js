import { Fragment, useEffect, useState, useCallback } from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'

import AgroDrawingManager from './AgroDrawingManager'
import ControlPanel from './ControlPanel'
import FlaxCluster from './FlaxCluster'

import { API_URL } from '../utils/constants'
import config from '../config'

const libraries = ['geometry', 'drawing'];

const AgroMap = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: config.GMAP_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, []);

  const [activeCluster, setActiveCluster] = useState(props.cluster._id);
  const [center, setCenter] = useState(props.cluster.location || {
    lat: 53.768,
    lng: 27.592
  });
  const [fields, setFields] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (props.cluster._id !== activeCluster) {
      loadCluster(props.cluster._id);
      setActiveCluster(props.cluster._id);
      setCenter(props.cluster.location);
    }
  }, [props.cluster._id, activeCluster, props.cluster.location]);

  const loadCluster = async (clusterId) => {
    const res = await fetch(`${API_URL}/api/cluster/${clusterId}`);
    const { fields, markers } = await res.json();
    
    setFields(fields || []);
    setMarkers(markers || []);
  }

  const updateCluster = async (markers, fields) => {
    await fetch(`/api/cluster/${activeCluster}`, {
      method: 'POST',
      body: JSON.stringify({ markers, fields }),
    });

    setFields(fields);
    setMarkers(markers);
  }

  return (
    <Fragment>
      {isLoaded && (
        <GoogleMap
          id="agro-platform-map"
          mapContainerStyle={{
            height: "100%",
            width: "100%"
          }}
          center={center}
          zoom={6}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <FlaxCluster 
            cluster={props.cluster} 
            nodeOnClick={() => {}} 
          />
          <AgroDrawingManager 
            polygons={fields}
            markers={markers}
            updateCluster={updateCluster}
          />
        </GoogleMap>
      )}
      <ControlPanel />
    </Fragment>
  )
}

export default AgroMap