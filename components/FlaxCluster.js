import { Component } from 'react';
import { MarkerClusterer, Marker } from '@react-google-maps/api';

class FlaxCluster extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const [passiveMarker, activeMarker] = [
      'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    ];
    return (
      <MarkerClusterer options={{
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
      }}>
        {
          (clusterer) => this.props.nodes.map((node, index) => (
            <Marker
              key={index}
              position={node.location}
              clusterer={clusterer}
              icon={node.active ? activeMarker : passiveMarker}
              onClick={() => this.props.nodeOnClick(node)}
            />
          ))
        }
      </MarkerClusterer>
    )
  }
}

export default FlaxCluster