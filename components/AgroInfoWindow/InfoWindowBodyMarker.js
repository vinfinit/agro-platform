import { numericMask } from '../../utils/masks'
import styles from '../../styles/AgroInfoWindow.module.scss'

const InfoWindowBodyMarker = (props) => (
  <section className={styles.infoWindowBody}>
    <div>Площадь: 
      <input 
        value={props.area}
        onChange={numericMask(props.onAreaChange)}
      />
      га
    </div>
  </section>
);

export default InfoWindowBodyMarker;
