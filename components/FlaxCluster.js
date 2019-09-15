import { Component } from 'react';
import { MarkerClusterer, Marker } from '@react-google-maps/api';

class FlaxCluster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.items
    }
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
          (clusterer) => this.props.items.map((item, index) => (
            <Marker
              key={index}
              position={item.location}
              clusterer={clusterer}
              icon={item.active ? activeMarker : passiveMarker}
              onClick={() => this.props.itemOnClick(index)}
            />
          ))
        }
      </MarkerClusterer>
    )
  }
}

export default FlaxCluster