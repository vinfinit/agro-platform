import { LoadScript } from '@react-google-maps/api'
import fetch from 'isomorphic-unfetch'

import { API_URL } from '../utils/constants'
import { GMAP_API_KEY } from '../config'

import AgroMap from '../components/AgroMap'
import styles from '../styles/main.scss'

const Index = props => (
  <div className={styles.container}>
    <LoadScript
      id="script-loader"
      googleMapsApiKey={GMAP_API_KEY}
      libraries={['geometry', 'drawing']}
    >
      <AgroMap cluster={props.cluster} />      
    </LoadScript>
  </div>
);

Index.getInitialProps = async () => {
  const res = await fetch(`${API_URL}/api/cluster/5d90aa2b9d768a3b165f0c16`);
  const cluster = await res.json();

  console.log(cluster)
  return { cluster }
}

export default Index;