import { InfoWindow } from '@react-google-maps/api'

import InfoWindowHeader from './InfoWindowHeader'
import InfoWindowBodyPolygon from './InfoWindowBodyPolygon'
import styles from '../../styles/AgroInfoWindow.module.scss'
import InfoWindowBodyMarker from './InfoWindowBodyMarker';

const AgroInfoWindow = (props) => (
  <InfoWindow 
    position={props.polygon.position}
    onCloseClick={props.onClose}
  >
    <section className={styles.infoWindow}>
      <InfoWindowHeader
        isSaved={props.polygon.isSaved}
        onSave={props.onSave}
        onDelete={props.onDelete}
      />
      {props.polygon
       ? <InfoWindowBodyPolygon
        polygon={props.polygon}
        totalDistance={props.totalDistance}
        workingSpeed={props.workingSpeed}
        onWorkingSpeedChange={props.onWorkingSpeedChange}
        nLines={props.nLines}
        singleTurnDistance={props.singleTurnDistance}
        turnSpeed={props.turnSpeed}
        onTurnSpeedChange={props.onTurnSpeedChange}
        harvesterSize={props.harvesterSize}
        onHarvesterSizeChange={props.onHarvesterSizeChange}
      />
      : <InfoWindowBodyMarker
        area={props.area}
        onAreaChange={props.onAreaChange}
      />
      }
    </section>
  </InfoWindow>
);

export default AgroInfoWindow