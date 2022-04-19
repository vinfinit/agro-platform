import Image from 'next/image'
import { useState } from 'react'
import MathJax from 'react-mathjax2'
import { Menu } from 'semantic-ui-react'
import styles from '../styles/ControlPanel.module.scss'

const STATES = {
  INTRODUCTION: 'Введение',
  LEGEND: 'Легенда',
  ALGORITHMS: 'Алгоритмы',
}

const ControlPanel = () => {
  const [curState, setState] = useState(STATES.INTRODUCTION)
  const [isHidden, setHidden] = useState(true)

  return (
    <div className={`${styles.controlPanel} ${isHidden ? styles.controlPanelHidden : ''}`}>
      <span 
        onClick={() => setHidden(!isHidden)} 
        className={`${styles.hiddenTrigger} ${isHidden ? styles.hiddenTriggerLeft : styles.hiddenTriggerRight}`}
        >
          ^
      </span>

      <section className={`${styles.content} ${isHidden ? styles.hiddenItem : ''}`}>
        <Menu>
          {Object.entries(STATES).map(([state, stateName], index) => (
            <Menu.Item
              key={index}
              name={state}
              active={curState === stateName}
              onClick={() => setState(stateName)}
            >
              {stateName}
            </Menu.Item>
          ))}
        </Menu>

        <section className={curState === STATES.INTRODUCTION ? '' : styles.hiddenItem}>
          <p>Добро пожаловать на платформу для помощи сельскому хозяйству, которая поможет Вам убрать поле в кратчайшие сроки и покажет наиболее оптимальный маршрут для этого.</p>
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
    
        <section className={curState === STATES.ALGORITHMS ? '' : styles.hiddenItem}>
          <MathJax.Context input='ascii'>
            <section>
              <h3>Выбор оптимального направления для уборки комбайном</h3>
              <ol>
                <li>
                  <MathJax.Node inline>\forall p \in P | P</MathJax.Node> - множество сторон многоугольника, вычислить <MathJax.Node inline>k = \tan \alpha_p | \alpha_p</MathJax.Node> - угол наклона <MathJax.Node inline>p</MathJax.Node>
                </li>
                <li>
                  <MathJax.Node inline>\forall p</MathJax.Node> создать кластер <MathJax.Node inline>{'C_p = {p, p_i, p_j, ...}'} | \alpha_p - 5° \le p_i, p_j \le \alpha_p + 5°</MathJax.Node>
                </li>
                <li>
                  <MathJax.Node inline>\forall C_p</MathJax.Node> вычислить <MathJax.Node inline>{'L = \sum_{p \in C_p} l_p | l'}</MathJax.Node> - длина стороны <MathJax.Node inline>p</MathJax.Node>
                </li>
                <li>
                  Решение: <MathJax.Node inline>\alpha_p</MathJax.Node>, где <MathJax.Node inline>p \in C_p | L - max</MathJax.Node>
                </li>
              </ol>
            </section>
          </MathJax.Context>
          <MathJax.Context input='ascii'>
            <section>
              <h3>(L) Расчет полезного расстояния</h3>
              <MathJax.Node>
                L = (S (km^2)) / (HS (km)) km.
              </MathJax.Node>
            </section>
          </MathJax.Context>
          <MathJax.Context input='ascii'>
            <section>
              <h3>(N) Количество борозд</h3>
              <ol>
                <li>Строим перпендикуляр к направлению уборки</li>
                <li>Проецируем на этот перпендикуляр все остальные стороны</li>
                <li>
                  <div><MathJax.Node inline>LN</MathJax.Node> - сумма длин остальных сторон (пригодится для КПД)</div>
                  <MathJax.Node inline>{'LN = (\sum l_{i}) | l_{i}'}</MathJax.Node> - длина i-ой стороны
                </li>
                <li>
                  <div><MathJax.Node inline>LN_⊥</MathJax.Node> - сумма длин спроецированных сторон</div>
                  <MathJax.Node inline>{'LN_⊥ = (\sum l_{i⊥}) | l_{i ⊥}'}</MathJax.Node> - длина i-ой спроецированной стороны
                </li>
                <li>
                  <MathJax.Node inline>N = (LN_⊥) / (2 * HS)</MathJax.Node>
                </li>
              </ol>
              <h4>Пример:</h4>
              <Image src={require('../images/nExample.png')} alt="example" />
              <ol start='0'>
                <li><MathJax.Node>GH</MathJax.Node> - направление уборки</li>
                <li><MathJax.Node>g</MathJax.Node> - перпендикуляр к GH</li>
                <li><MathJax.Node>b, c, d, f</MathJax.Node> - стороные, которые необходимо спроецировать на <MathJax.Node>g</MathJax.Node></li>
                <li>
                  <MathJax.Node inline>N = (h + i + j + (h + i +j)) / (2 * HS)</MathJax.Node>
                </li>
              </ol>
            </section>
          </MathJax.Context>
          <MathJax.Context input='ascii'>
            <section>
              <h3>(T) Расчет времени уборки поля</h3>
              <MathJax.Node>
                T = L / V + T_w.
              </MathJax.Node>
            </section>
          </MathJax.Context>
          <MathJax.Context input='ascii'>
            <section>
              <h3>(E) КПД поля</h3>
              <MathJax.Node>
                N_⊥ / N
              </MathJax.Node>
            </section>
          </MathJax.Context>
        </section>
      </section>
    </div>
  )
} 

export default ControlPanel