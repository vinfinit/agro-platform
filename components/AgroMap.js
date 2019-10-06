import { Fragment, Component } from 'react'
import { GoogleMap } from '@react-google-maps/api'

import AgroDrawingManager from './AgroDrawingManager'
import ControlPanel from './ControlPanel'
import FlaxCluster from './FlaxCluster'

class AgroMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cursor: null,
      nodes: props.nodes
    }
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
          center={{
            lat: 53.768,
            lng: 27.592
          }}
        >
          <FlaxCluster 
            cursor={this.state.cursor}
            nodes={this.state.nodes} 
            nodeOnClick={this.nodeOnClick} 
          />
          <AgroDrawingManager />
        </GoogleMap>
        <ControlPanel 
          cursor={this.state.cursor}
          nodes={this.state.nodes}
        />
      </Fragment>
    )
  }
}

export default AgroMap