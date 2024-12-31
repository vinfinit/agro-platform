import Image from 'next/image'
import { useState } from 'react'
import { MathJaxContext, MathJax } from 'better-react-mathjax'
import { Button, Menu, MenuItem } from '@mui/material'
import styles from '../styles/ControlPanel.module.scss'

const STATES = {
  INTRODUCTION: 'Введение',
  LEGEND: 'Легенда',
  ALGORITHMS: 'Алгоритмы',
}

const mathJaxConfig = {
  loader: { load: ["input/asciimath"] }
};

const ControlPanel = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const open = Boolean(menuAnchorEl)

  const [curState, setState] = useState(STATES.INTRODUCTION)
  const [isHidden, setHidden] = useState(true)

  const openMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  return (
    <div className={`${styles.controlPanel} ${isHidden ? styles.controlPanelHidden : ''}`}>
      <span 
        onClick={() => setHidden(!isHidden)} 
        className={`${styles.hiddenTrigger} ${isHidden ? styles.hiddenTriggerLeft : styles.hiddenTriggerRight}`}
        >
          ^
      </span>

      <section className={`${styles.content} ${isHidden ? styles.hiddenItem : ''}`}>
        <Button onClick={openMenu}>
          {curState}
        </Button>
        <Menu
          open={open}
          anchorEl={menuAnchorEl}
          onClose={closeMenu}
        >
          {Object.entries(STATES).map(([state, stateName], index) => (
            <MenuItem
              key={index}
              selected={curState === stateName}
              onClick={() => setState(stateName)}
            >
              {stateName}
            </MenuItem>
          ))}
        </Menu>

        <section className={curState === STATES.INTRODUCTION ? '' : styles.hiddenItem}>
          <p>Добро пожаловать на платформу для помощи сельскому хозяйству, которая поможет Вам убрать поле в кратчайшие сроки и покажет наиболее оптимальный маршрут для этого.</p>
          <h3>Как использовать</h3>
          <ul>
            <li>Выберите кластер в левом верхнем углу экрана</li>
            <li>Создайте новый или измените существующую конфигурация поля или маркера</li>
            <li>Чтобы изменить текущий элемент, выберите __руку__ и нажмите один раз на эелемент</li>
            <li>Чтобы удалить текущий элемент, выберите __руку__ и двойной клик на эелементе</li>
            <li>Чтобы сохранить Ваши изменения, нажмите комбинацию клавиш ctrl+k (появится индикатор сохранения на экране)</li>
          </ul>
        </section>
        
        <section className={curState === STATES.LEGEND ? '' : styles.hiddenItem}>
          <h3>Легенда</h3>
          <ul>
            <li><b>(S) Площадь</b> - площадь выделенного участка в <i>га</i></li>
            <li><b>(HS) Размер комбайна</b> - ширина комбайна в <i>м</i></li>
            <li><b>(L) Длина поля</b> - полезное расстояние, которое нужно пройти машине чтобы убрать поле в <i>м</i></li>
            <li><b>(N) Количество борозд</b> - общее количство борозд</li>
            <li><b>(V) Скорость комбайна</b> - приблизительная скорость комбайна при уборке в <i>км/ч</i></li>
            <li><b>(T) Время</b> - время, которое необходимо затратить для уборки 1 комбайном в <i>ч</i></li>
            <li><b>(Е) КПД</b> - КПД (коэфициент полезного действия)</li>
          </ul>
        </section>
    
        <MathJaxContext config={mathJaxConfig}>
          <section className={curState === STATES.ALGORITHMS ? '' : styles.hiddenItem}>
            <section>
              <h3>Выбор оптимального направления для уборки комбайном</h3>
              <ol>
                <li>
                  <MathJax inline>{"`forall p \in P | P`"}</MathJax> - множество сторон многоугольника, вычислить <MathJax inline>{"`k = tan \alpha_p | \alpha_p`"}</MathJax> - угол наклона <MathJax inline>{"`p`"}</MathJax>
                </li>
                <li>
                  <MathJax inline>{"`forall p`"}</MathJax> создать кластер <MathJax inline>{"`{C_p = {p, p_i, p_j, ...}} | \alpha_p - 5° \le p_i, p_j \le \alpha_p + 5°`"}</MathJax>
                </li>
                <li>
                  <MathJax inline>{"`forall C_p`"}</MathJax> вычислить <MathJax inline>{"`{L = \sum_{p \in C_p} l_p | l}`"}</MathJax> - длина стороны <MathJax inline>{"`p`"}</MathJax>
                </li>
                <li>
                  Решение: <MathJax inline>{"`\alpha_p`"}</MathJax>, где <MathJax inline>{"`p \in C_p | L - max`"}</MathJax>
                </li>
              </ol>
            </section>
          
            <section>
              <h3>(L) Расчет полезного расстояния</h3>
              <MathJax>{"`L = (S (km^2)) / (HS (km)) km.`"}</MathJax>
            </section>
            <section>
              <h3>(N) Количество борозд</h3>
              <ol>
                <li>Строим перпендикуляр к направлению уборки</li>
                <li>Находим самое широкое место в поле по направлению этого перпендикуляра</li>
                <li>Делим это расстояние на ширину захвата</li>
              </ol>
            </section>
            <section>
              <h3>(T) Расчет времени уборки поля</h3>
              <MathJax>{"`T = L / V + T_w.`"}</MathJax>
            </section>
            <section>
              <h3>(E) КПД поля</h3>
              <MathJax>{"`E = N_⊥ / N`"}</MathJax>
            </section>
          </section>
        </MathJaxContext>
      </section>
    </div>
  )
} 

export default ControlPanel