import { InfoWindow } from '@react-google-maps/api'

import { round } from '../utils/geometry'
import styles from '../styles/main.scss'

const AgroInfoWindow = (props) => {
  const totalDistance = props.totalDistance / 1000;
  const workingTime = totalDistance / props.workingSpeed;
  const turnsDistance = (props.nLines ? props.nLines - 1 : 0) * props.singleTurnDistance / 1000;
  const auxiliaryTime = turnsDistance / props.turnSpeed;
  const efficiencyDistance = totalDistance / (totalDistance + turnsDistance);
  const efficiencyTime = workingTime / (workingTime + auxiliaryTime);

  return (
    <InfoWindow 
      position={props.polygon.position}
      onCloseClick={props.onClose}
    >
      <section className={styles.infoWindow}>
        <header>
          {props.polygon.isSaved
            ? <div>
                <span>Saved!</span>
                <button 
                  className={styles.infoWindowDelete} 
                  type="button" 
                  onClick={props.onDelete}>Delete</button>
              </div>
            : <button type="button" onClick={props.onSave}>Save</button>
          }
        </header>
        <div>
          <p>Площадь: {round(props.polygon.area / 10000)} га</p>
          <p>Ширина захвата: 
            <input 
              value={props.harvesterSize}
              onChange={props.onHarvesterSizeChange}
            />
            m
          </p>
          <p>Рабочий ход: {round(totalDistance)} км</p>
          <p>Средняя длина гона: {round(totalDistance / props.nLines)} км</p>
          <p>Количество проходов: {parseInt(props.nLines)}</p>
          <p>Рабочая скорость: 
            <input 
              value={props.workingSpeed}
              onChange={props.onWorkingSpeedChange}
            />
            km/h
          </p>
          <p>Чистое рабочее время: {round(workingTime)} ч</p>
          <p>Повороты: {round(turnsDistance)} км</p>
          <p>Скорость на поворотах:
            <input 
              value={props.turnSpeed}
              onChange={props.onTurnSpeedChange}
            />
            km/h
          </p>
          <p>Вспомогательное время: {round(auxiliaryTime)} ч</p>
          <p>КПД по расстоянию: {round(efficiencyDistance * 100)} %</p>
          <p>КПД по времени: {round(efficiencyTime * 100)} %</p>
        </div>
      </section>
    </InfoWindow>
)}

export default AgroInfoWindow