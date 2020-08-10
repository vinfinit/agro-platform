import { useState } from 'react'
import { round } from '../../utils/geometry'
import styles from '../../styles/AgroInfoWindow.module.scss'

const numberMask = (handler) => 
  (e) => {
    const re = /^[0-9.]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      handler(e.target.value)
    }
  }

const InfoWindowBodyPolygon = (props) => {
  const [obstaclesDistance, setObstaclesDistance] = useState(100);
  const [obstaclesTime, setObstaclesTime] = useState(30);

  const totalDistance = props.totalDistance / 1000;
  const workingTime = totalDistance / props.workingSpeed;
  const turnsDistance = (props.nLines ? props.nLines - 1 : 0) * props.singleTurnDistance / 1000;
  const auxiliaryTime = turnsDistance / props.turnSpeed;
  const efficiencyDistance = totalDistance / (totalDistance + turnsDistance + obstaclesDistance/1000);
  const efficiencyTime = workingTime / (workingTime + auxiliaryTime + obstaclesTime/60);

  return (
    <section className={styles.infoWindowBody}>
      <div>Площадь: {round(props.polygon.area / 10000)} га</div>
      <div>Ширина захвата: 
        <input 
          value={props.harvesterSize}
          onChange={props.onHarvesterSizeChange}
        />
        m
      </div>
      <div>Рабочий ход: {round(totalDistance)} км</div>
      <div>Средняя длина гона: {round(totalDistance / props.nLines)} км</div>
      <div>Количество проходов: {parseInt(props.nLines)}</div>
      <div>Рабочая скорость: 
        <input 
          value={props.workingSpeed}
          onChange={props.onWorkingSpeedChange}
        />
        km/h
      </div>
      <div>Чистое рабочее время: {round(workingTime)} ч</div>
      <div>Повороты: {round(turnsDistance)} км</div>
      <div>Скорость на поворотах:
        <input 
          value={props.turnSpeed}
          onChange={props.onTurnSpeedChange}
        />
        km/h
      </div>
      <div>Вспомогательное время: {round(auxiliaryTime)} ч</div>
      <div>Доп. расстояние на препятствия:
        <input 
          value={obstaclesDistance}
          onChange={numberMask(setObstaclesDistance)}
        />
        м
      </div>
      <div>Доп. время на препятствия:
        <input 
          value={obstaclesTime}
          onChange={numberMask(setObstaclesTime)}
        />
        мин
      </div>
      <div>КПД по расстоянию: {round(efficiencyDistance * 100)} %</div>
      <div>КПД по времени: {round(efficiencyTime * 100)} %</div>
    </section>
  );
};

export default InfoWindowBodyPolygon;
