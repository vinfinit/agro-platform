import { Fragment, Component } from 'react'
import { GoogleMap } from '@react-google-maps/api'

import AgroDrawingManager from './AgroDrawingManager'
import ControlPanel from './ControlPanel'
import FlaxCluster from './FlaxCluster'

class AgroMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 53.768,
        lng: 27.592
      },
      cluster: props.cluster,
      fields: props.cluster.fields,
    }
  }

  saveField = async (field) => {
    const clusterId = '5d90aa2b9d768a3b165f0c16';
    const fields = [
      ...this.state.fields, field,
    ];
    console.log(this.state.fields);
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
            cluster={this.state.cluster} 
            nodeOnClick={this.nodeOnClick} 
          />
          <AgroDrawingManager 
            polygons={this.state.fields}
            savePolygon={this.saveField}
          />
        </GoogleMap>
        <ControlPanel 
          cluster={this.state.cluster}
        />
      </Fragment>
    )
  }
}

export default AgroMap