import { MarkerClusterer, Marker } from '@react-google-maps/api';

const FlaxCluster = (props) => {
  const markers = [
    'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow_v3-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v3-2-medium.png,assets/icons/poi/tactile/pinlet_v3-2-medium.png,assets/icons/poi/quantum/pinlet/ferriswheel_pinlet-2-medium.png&highlight=ff000000,ffffff,13b5c7,ffffff?scale=2',
    'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow_v3-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v3-2-medium.png,assets/icons/poi/tactile/pinlet_v3-2-medium.png,assets/icons/poi/quantum/pinlet/worship_temple_pinlet-2-medium.png&highlight=ff000000,ffffff,7b9eb0,ffffff?scale=2',
    'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow_v3-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v3-2-medium.png,assets/icons/poi/tactile/pinlet_v3-2-medium.png,assets/icons/poi/quantum/pinlet/civic_bldg_pinlet-2-medium.png&highlight=ff000000,ffffff,7b9eb0,ffffff?scale=2'
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
            icon={markers[0]}
            onClick={() => this.props.nodeOnClick()}
          />
        )
      }
    </MarkerClusterer>
  )
}

export default FlaxCluster