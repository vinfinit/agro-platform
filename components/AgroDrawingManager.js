import { Fragment, Component } from 'react'
import { DrawingManager, Polygon, GoogleMap } from '@react-google-maps/api'
import StrokeFill from './StrokeFill'
import AgroInfoWindow from './AgroInfoWindow'

import { round, computeArea, getCenter, getBounds } from '../utils/geometry'
import { 
  HARVESTER_SIZE, 
  WORKING_SPEED, 
  TURN_SPEED,
} from '../utils/constants'

const drawingOptions = {
  drawingControlOptions: {
    drawingModes: ['polygon']
  },
  polygonOptions: {
    fillColor: '#c004ff',
    fillOpacity: 0.4,
    strokeColor: '#8a04ff',
    strokeWeight: 2
  },
  savedPolygonOptions: {
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
      workingSpeed: WORKING_SPEED,
      turnSpeed: TURN_SPEED,
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
    const singleTurnDistance = (+state.harvesterSize * 105) / 14 + 34;
    this.setState({ 
      totalDistance,
      singleTurnDistance,
     });
    if (state.projectSegments) {
      this.setState({
        nLines: state.projectSegments.projectionLen / 2 / state.harvesterSize,
      })
    }
  }

  updateHarvesterSize = (e) => {
    const re = /^[0-9.]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({ harvesterSize: e.target.value }, this.calculateMetrics)
    }
  }

  updateWorkingSpeed = (e) => {
    const re = /^[0-9.]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({ workingSpeed: e.target.value }, this.calculateMetrics)
    }
  }

  updateTurnSpeed = (e) => {
    const re = /^[0-9.]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({ turnSpeed: e.target.value }, this.calculateMetrics)
    }
  }

  openInfoWindow = (polygon, index, isSaved = false) => () => {
    this.setState({
      curPolygon: {
        polygon,
        isSaved,
        index,
        position: getCenter(polygon),
        area: computeArea(polygon),
        bounds: getBounds(polygon),
      }
    }, this.calculateMetrics);
  }

  closeInfoWindow = () => {
    this.setState({
      curPolygon: null,
    })
  }

  savePolygon = async () => {
    const polygon = this.state.curPolygon.bounds.map(p => ({
      lat: p.lat(),
      lng: p.lng(),
    }));

    const newPolygons = [...this.state.polygons];
    newPolygons.splice(this.state.curPolygon.index, 1);

    this.setState({
      curPolygon: null,
      polygons: newPolygons,
    });
    await this.props.savePolygon(polygon)
  }

  deletePolygon = async () => {
    const polygon = this.state.curPolygon.bounds.map(p => ({
      lat: p.lat(),
      lng: p.lng(),
    }));

    this.setState({ curPolygon: null });
    await this.props.deletePolygon(polygon)
  }

  projectSegments = (projectionLen, originLen) => {
    this.setState({
      projectSegments: { projectionLen, originLen },
    }, this.calculateMetrics)
  }

  render() {
    const savedPolygons = this.props
      .polygons.map(paths => new google.maps.Polygon({ paths }));

    return (
      <Fragment>
        <DrawingManager
          onPolygonComplete={this.onPolygonComplete}
          options={drawingOptions}
        />
        {savedPolygons.map((polygon, i) => (
          <Polygon 
            key={i}
            path={polygon.getPath()}
            options={drawingOptions.savedPolygonOptions}
            onClick={this.openInfoWindow(polygon, i, true)}
          />
        ))}
        {this.state.polygons.map((polygon, i) => (
          <Polygon 
            key={i}
            path={polygon.getPath()}
            options={drawingOptions.polygonOptions}
            onClick={this.openInfoWindow(polygon, i)}
          />
        ))}
        {this.state.curPolygon && 
          <AgroInfoWindow 
            polygon={this.state.curPolygon}
            harvesterSize={this.state.harvesterSize}
            workingSpeed={this.state.workingSpeed}
            turnSpeed={this.state.turnSpeed}
            totalDistance={this.state.totalDistance}
            singleTurnDistance={this.state.singleTurnDistance}
            nLines={this.state.nLines}
            onHarvesterSizeChange={this.updateHarvesterSize}
            onWorkingSpeedChange={this.updateWorkingSpeed}
            onTurnSpeedChange={this.updateTurnSpeed}
            onSave={this.savePolygon}
            onDelete={this.deletePolygon}
            onClose={this.closeInfoWindow}
          />
        }
        {this.state.curPolygon && 
          <StrokeFill 
            key={this.state.curPolygon.index}
            polygon={this.state.curPolygon.polygon}
            projectSegments={this.projectSegments}
          />
        }
      </Fragment>
    )
  }
}

export default AgroDrawingManager