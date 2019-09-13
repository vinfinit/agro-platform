import { Component } from 'react';
import { MarkerClusterer, Marker } from '@react-google-maps/api';

class FlaxCluster extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <MarkerClusterer options={{
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
      }}>
        {
          (clusterer) => this.props.data.map((item, i) => (
            <Marker
              key={i}
              position={item.location}
              clusterer={clusterer}
            />
          ))
        }
      </MarkerClusterer>
    )
  }
}

export default FlaxCluster