import { LoadScript } from '@react-google-maps/api'
import { GMAP_API_KEY } from '../config'

import AgroMap from '../components/AgroMap'

import styles from '../styles/main.scss'

import belarusFlax from '../data/belarus'
import belgiumFlax from '../data/belgium'

const Index = props => (
  <div className={styles.container}>
    <LoadScript
      id="script-loader"
      googleMapsApiKey={GMAP_API_KEY}
      libraries={['geometry', 'drawing']}
    >
      <AgroMap items={props.data} />      
    </LoadScript>
  </div>
);

Index.getInitialProps = async () => {
  return {
    data: [{
      name: 'Belarus',
      toggled: false,
      children: belarusFlax
    }, {
      name: 'Belgium',
      toggled: false,
      children: belgiumFlax
    }]
  }
}

export default Index;