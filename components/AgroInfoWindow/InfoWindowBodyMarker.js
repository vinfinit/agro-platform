import styles from '../../styles/AgroInfoWindow.module.scss'

const InfoWindowBodyMarker = (props) => (
  <section className={styles.infoWindowBody}>
    <div>Площадь: 
      <input 
        value={props.area}
        onAreaChange={props.onAreaChange}
      />
      m
    </div>
  </section>
);

export default InfoWindowBodyMarker;
