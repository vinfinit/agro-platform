import { useState, Fragment } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import fetch from 'isomorphic-unfetch'

import { API_URL } from '../utils/constants'
import { GMAP_API_KEY } from '../config'

import Layout from '../components/Layout'
import AgroMap from '../components/AgroMap'

const libraries = ['geometry', 'drawing'];

const Dashboard = ({ clusterList }) => {
  const [cluster, setCluster] = useState(clusterList[0]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GMAP_API_KEY,
    libraries,
  });
  
  const renderMap = () => (
    <Fragment>
      <Layout 
        clusterList={clusterList}
        setCluster={setCluster}
      >
        {isLoaded && <AgroMap cluster={cluster} />}
      </Layout>
    </Fragment>
  )

  return isLoaded ? renderMap() : null;
};

export const getServerSideProps = async (ctx) => {
  try {
    const cookie = ctx.req?.headers?.cookie;
    const clustersRes = await fetch(`${API_URL}/api/cluster`, {
      headers: new Headers({
        'Cookie': cookie
      })
    });
    const clusterList = await clustersRes.json();

    return {
      props: {
        clusterList
      }
    }
  } catch(err) {
    ctx.res.writeHead(302, { Location: '/login' }).end();
  }

  return { props: { clusterList: [] } };
};

export default Dashboard;