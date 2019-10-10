import { useState } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import fetch from 'isomorphic-unfetch'

import { API_URL } from '../utils/constants'
import { GMAP_API_KEY } from '../config'

import Layout from '../components/Layout'
import AgroMap from '../components/AgroMap'

const libraries = ['geometry', 'drawing'];

const Index = props => {
  const [cluster, setCluster] = useState(props.clusterList[0]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GMAP_API_KEY,
    libraries,
  })
  
  const renderMap = () => (
    <Layout 
      clusterList={props.clusterList}
      setCluster={setCluster}
    >
      {isLoaded && <AgroMap cluster={cluster} />}
    </Layout>
  )

  return isLoaded ? renderMap() : null;
};

Index.getInitialProps = async () => {
  const clustersRes = await fetch(`${API_URL}/api/cluster`);
  const clusterList = await clustersRes.json();

  return { clusterList }
}

export default Index;