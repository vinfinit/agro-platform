import AgroMap from '../components/AgroMap'
import ControlPanel from '../components/ControlPanel'

import styles from '../styles/main.scss'

import belarusFlax from '../data/belarus'
import belgiumFlax from '../data/belgium'

const Index = props => (
  <div className={styles.container}>
    <AgroMap data={belarusFlax} />
    <ControlPanel data={props.data} />
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