import { useState, Fragment } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import { Spinner } from 'react-bootstrap'
import fetch from 'isomorphic-unfetch'

import { API_URL } from '../utils/constants'
import { GMAP_API_KEY } from '../config'

import Layout from '../components/Layout'
import Login from '../components/Login'
import AgroMap from '../components/AgroMap'

import styles from '../styles/Layout.module.scss'

const libraries = ['geometry', 'drawing'];

const Index = () => {
  const [cluster, setCluster] = useState({});
  const [clusterList, setClusterList] = useState([]);
  const [errorLog, setErrorLog] = useState('');
  const [isAuthorized, setAuthorized] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GMAP_API_KEY,
    libraries,
  });

  const init = async () => {
    setLoading(true);
    try {
      const clustersRes = await fetch(`${API_URL}/api/cluster`);
      const clusterList = await clustersRes.json();
  
      setClusterList(clusterList);
      setCluster(clusterList[0]);
      setAuthorized(true);
    } catch(err) {
      setAuthorized(false);
    }
    setLoading(false);
  }
  
  return (
    <Fragment>
      {isLoading &&
        <section className={styles.spinnerContainer}>
          <Spinner 
            className={styles.spinnerItem}
            animation="border" 
          />
        </section>
      }
      {!isAuthorized && 
        <Login
          onSuccess={init}
          errorLog={errorLog}
        ></Login>
      }
      {isAuthorized &&
        <Layout 
          clusterList={clusterList}
          setCluster={setCluster}
        >
          {isLoaded && <AgroMap cluster={cluster} />}
        </Layout>
      }
    </Fragment>
  )
};

export default Index;