import { InfoWindow } from '@react-google-maps/api'

import { round } from '../utils/geometry'
import styles from '../styles/main.scss'

const AgroInfoWindow = (props) => (
  <InfoWindow 
    position={props.polygon.position}
    onCloseClick={props.onClose}
  >
    <section className={styles.infoWindow}>
      <header>
        {props.polygon.isSaved
          ? <span>Saved!</span>
          : <button type="button" onClick={props.onSave}>Save (WIP)</button>
        }
      </header>
      <div>
        <p>Area: {round(props.polygon.area / 10000)} ha</p>
        <p>Harvester size: 
          <input 
            value={props.harvesterSize}
            onChange={props.onHarvesterSizeChange}
          />
          m
        </p>
        <p>Total distance: {round(props.totalDistance / 1000)} km</p>
      </div>
    </section>
  </InfoWindow>
)

export default AgroInfoWindow