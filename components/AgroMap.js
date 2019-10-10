import { Fragment, Component } from 'react'
import { GoogleMap } from '@react-google-maps/api'

import AgroDrawingManager from './AgroDrawingManager'
import ControlPanel from './ControlPanel'
import FlaxCluster from './FlaxCluster'

import { API_URL } from '../utils/constants'

class AgroMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 53.768,
        lng: 27.592
      },
      fields: [],
    };

    this.loadFields(this.props.cluster._id)
  }

  async componentDidUpdate(prevProps, prevState) {
    const curClusterId = this.props.cluster._id;
    if (curClusterId  !== prevProps.cluster._id) {
      this.loadFields(curClusterId)
    }
  }

  loadFields = async (clusterId) => {
    const res = await fetch(`${API_URL}/api/cluster/${clusterId}`);
    const { fields } = await res.json();
    this.setState({ fields: fields || [] })
  }

  saveField = async (field) => {
    const clusterId = this.props.cluster._id;
    const fields = [
      ...this.state.fields, field,
    ];

    await fetch(`/api/cluster/${clusterId}`, {
      method: 'POST',
      body: JSON.stringify({ fields }),
    });

    this.setState({ fields: [...fields, field] })
  }

  nodeOnClick = (node) => {
    // console.log(this.state)
    // const { cursor } = this.state;
    // if (node.children) {
    //   node.toggled = toggled;
    // }
    // this.setState(() => ({ cursor: node, clusters: [...clusters] }));
  }

  render() {
    return (
      <Fragment>
        <GoogleMap
          id="agro-platform-map"
          mapContainerStyle={{
            height: "100%",
            width: "80%"
          }}
          zoom={6}
          center={this.state.center}
        >
          <FlaxCluster 
            cluster={this.props.cluster} 
            nodeOnClick={this.nodeOnClick} 
          />
          <AgroDrawingManager 
            polygons={this.state.fields}
            savePolygon={this.saveField}
          />
        </GoogleMap>
        {/* <ControlPanel 
          cluster={this.state.cluster}
        /> */}
      </Fragment>
    )
  }
}

export default AgroMap