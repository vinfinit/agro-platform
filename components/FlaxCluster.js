import { MarkerClusterer, Marker } from '@react-google-maps/api';

const FlaxCluster = (props) => {
  const [passiveMarker, activeMarker] = [
    'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  ];
  return (
    <MarkerClusterer options={{
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    }}>
      {
        (clusterer) => (
          <Marker
            position={props.cluster.location}
            clusterer={clusterer}
            icon={passiveMarker}
            onClick={() => this.props.nodeOnClick()}
          />
        )
      }
    </MarkerClusterer>
  )
}

export default FlaxCluster