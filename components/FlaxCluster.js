import { Circle, MarkerClusterer, Marker } from '@react-google-maps/api';
import { Fragment, useState } from 'react';

const drawingOptions = {
  circle: {
    fillOpacity: 0,
    strokeColor: '#382bd4',
    strokeWeight: 1,
  },
};

const FlaxCluster = (props) => {
  const { cluster } = props

  const [showFibonacci, setShowFibonacci] = useState(false)

  const markers = [
    'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow_v3-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v3-2-medium.png,assets/icons/poi/tactile/pinlet_v3-2-medium.png,assets/icons/poi/quantum/pinlet/ferriswheel_pinlet-2-medium.png&highlight=ff000000,ffffff,13b5c7,ffffff?scale=2',
    'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow_v3-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v3-2-medium.png,assets/icons/poi/tactile/pinlet_v3-2-medium.png,assets/icons/poi/quantum/pinlet/worship_temple_pinlet-2-medium.png&highlight=ff000000,ffffff,7b9eb0,ffffff?scale=2',
    'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow_v3-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v3-2-medium.png,assets/icons/poi/tactile/pinlet_v3-2-medium.png,assets/icons/poi/quantum/pinlet/civic_bldg_pinlet-2-medium.png&highlight=ff000000,ffffff,7b9eb0,ffffff?scale=2'
  ];

  const fibonacciRadius = [1, 2, 3, 5, 8, 13]

  return (
    <Fragment>
      <MarkerClusterer options={{
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
      }}>
        {
          (clusterer) => (
            <Marker
              position={cluster.location}
              clusterer={clusterer}
              icon={markers[0]}
              onClick={() => setShowFibonacci(!showFibonacci)}
            />
          )
        }
      </MarkerClusterer>
      {showFibonacci && fibonacciRadius.map(radius => (
        <Circle
          key={radius}
          center={cluster.location}
          radius={radius * 1000}
          options={drawingOptions.circle}
        />
      ))}
    </Fragment>
  )
}

export default FlaxCluster