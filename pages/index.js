import { useState, Fragment } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import fetch from 'isomorphic-unfetch'

import { API_URL } from '../utils/constants'
import { GMAP_API_KEY } from '../config'

import Layout from '../components/Layout'
import Login from '../components/Login'
import AgroMap from '../components/AgroMap'

const libraries = ['geometry', 'drawing'];

const Index = () => {
  const [cluster, setCluster] = useState({});
  const [clusterList, setClusterList] = useState([]);
  const [errorLog, setErrorLog] = useState('');
  const [isAuthorized, setAuthorized] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GMAP_API_KEY,
    libraries,
  });

  const init = async (email, password) => {
    const clustersRes = await fetch(`${API_URL}/api/cluster?email=${email}&password=${password}`);
    if (!clustersRes.ok) {
      return setErrorLog('Неправильное имя или пароль!');
    }
    setErrorLog('');
    const clusterList = await clustersRes.json();

    setClusterList(clusterList);
    setCluster(clusterList[0]);
    setAuthorized(true)
  }
  
  const renderMap = () => (
    <Fragment>
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

  return isLoaded ? renderMap() : null;
};

Index.getInitialProps = async () => {
  // const email = localStorage.getItem('email') || '';
  // const password = localStorage.getItem('password') || '';
  // if (!email || !password) {
  //   Router.push('/login')
  // }

  // const clustersRes = await fetch(`${API_URL}/api/cluster?email=${email}&password=${password}`);
  // const clusterList = await clustersRes.json();

  return { }
}

export default Index;