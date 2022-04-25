import { useState, Fragment } from 'react'
import fetch from 'isomorphic-unfetch'

import { API_URL } from '../utils/constants'

import Layout from '../components/Layout'
import AgroMap from '../components/AgroMap'

const Dashboard = ({ clusterList }) => {
  const [cluster, setCluster] = useState(clusterList[0]);
  
  return (
    <Fragment>
      <Layout 
        clusterList={clusterList}
        setCluster={setCluster}
      >
        <AgroMap cluster={cluster} />
      </Layout>
    </Fragment>
  )
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
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      }
    }
  }
};

export default Dashboard;