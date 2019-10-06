import { Fragment, Component } from 'react'
import { DrawingManager, Polygon, InfoWindow } from '@react-google-maps/api'
import { round, getArea, getCenter } from '../utils/geometry'
import { HARVESTER_SIZE } from '../utils/constants'

import styles from '../styles/main.scss'

const drawingOptions = {
  drawingControlOptions: {
    drawingModes: ['polygon']
  },
  polygonOptions: {
    fillColor: '#04fbff',
    fillOpacity: 0.4,
    strokeColor: '#02d5ff',
    strokeWeight: 2
  }
};

class AgroDrawingManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      polygons: [],
      curPolygon: null,
      harvesterSize: HARVESTER_SIZE,
    }
  }

  onPolygonComplete = (polygon) => {
    this.setState({
      polygons: [...this.state.polygons, polygon]
    });
    polygon.setMap(null);
  }

  calculateMetrics = () => {
    const state = this.state;
    const totalDistance = round(state.curPolygon.area / +state.harvesterSize);
    this.setState({ totalDistance });
  }

  updateHarvesterSize = (e) => {
    const re = /^[0-9.]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({ harvesterSize: e.target.value }, this.calculateMetrics)
    }
  }

  openInfoWindow = (polygon) => () => {
    this.setState({
      curPolygon: {
        position: getCenter(polygon),
        area: getArea(polygon),
      }
    }, this.calculateMetrics);
  }

  closeInfoWindow = () => {
    this.setState({
      curPolygon: null,
    })
  }

  render() {
    return (
      <Fragment>
        <DrawingManager
          onPolygonComplete={this.onPolygonComplete}
          options={drawingOptions}
        />
        {this.state.polygons.map((polygon, i) => (
          <Polygon 
            key={i}
            path={polygon.getPath()}
            onClick={this.openInfoWindow(polygon)}
          />
        ))}
        {this.state.curPolygon && 
          <InfoWindow 
            position={this.state.curPolygon.position}
            onCloseClick={this.closeInfoWindow}
          >
            <section className={styles.infoWindow}>
              <header>
                <button type="button">Save (WIP)</button>
              </header>
              <div>
                <p>Area: {round(this.state.curPolygon.area / 10000)} ha</p>
                <p>Harvester size: 
                  <input 
                    value={this.state.harvesterSize}
                    onChange={this.updateHarvesterSize}
                  />
                  m
                </p>
                <p>Total distance: {round(this.state.totalDistance / 1000)} km</p>
              </div>
            </section>
          </InfoWindow>
        }
      </Fragment>
    )
  }
}

export default AgroDrawingManager