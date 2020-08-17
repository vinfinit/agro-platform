import { InfoWindow } from '@react-google-maps/api'

import InfoWindowHeader from './InfoWindowHeader'
import InfoWindowBodyPolygon from './InfoWindowBodyPolygon'
import InfoWindowBodyMarker from './InfoWindowBodyMarker'

import styles from '../../styles/AgroInfoWindow.module.scss'

export const AgroInfoWindow = (props) => (
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
      {props.children}
    </section>
  </InfoWindow>
);

export {
  InfoWindowBodyPolygon,
  InfoWindowBodyMarker,
};