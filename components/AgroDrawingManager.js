import { Fragment, Component } from 'react'
import { DrawingManager, Polygon, GoogleMap } from '@react-google-maps/api'
import StrokeFill from './StrokeFill'
import AgroInfoWindow from './AgroInfoWindow'

import { round, computeArea, getCenter, getBounds } from '../utils/geometry'
import { HARVESTER_SIZE } from '../utils/constants'

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
            totalDistance={this.state.totalDistance}
            onHarvesterSizeChange={this.updateHarvesterSize}
            onSave={this.savePolygon}
            onClose={this.closeInfoWindow}
          />
        }
        {this.state.curPolygon && 
          <StrokeFill 
            polygon={this.state.curPolygon.polygon}
          />
        }
      </Fragment>
    )
  }
}

export default AgroDrawingManager