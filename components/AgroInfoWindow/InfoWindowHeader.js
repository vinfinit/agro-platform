import styles from '../../styles/AgroInfoWindow.module.scss'

const InfoWindowHeader = (props) => (
  <header>
    {props.isSaved
      ? <div>
          <span>Saved!</span>
          <button 
            className={styles.infoWindowDelete} 
            type="button" 
            onClick={props.onDelete}>Delete</button>
        </div>
      : <button 
          type="button" 
          onClick={props.onSave}>Save</button>
    }
  </header>
);

export default InfoWindowHeader;
