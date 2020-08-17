import { Fragment, useState } from 'react'
import { Circle, Marker, InfoWindow } from '@react-google-maps/api'
import { InfoWindowBodyMarker } from '../AgroInfoWindow'
import { Point, Size } from '../../utils/geometry'

const drawingOptions = {
  circle: {
    fillColor: '#04fbff',
    fillOpacity: 0.6,
    strokeColor: '#4bb4ad',
    strokeWeight: 2
  },
  marker: {
    icon: 'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow_v3-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v3-2-medium.png,assets/icons/poi/tactile/pinlet_v3-2-medium.png,assets/icons/poi/quantum/pinlet/dot_pinlet-2-medium.png&highlight=ff000000,ffffff,ff9e67,ff9e67?scale=1.3'
  }
};

const CanvasManagerCircle = (props) => {
  const [activeMarker, setActiveMarker] = useState(null);

  const markers = props.markers.map(({ center, area }) => ({
    center: Point(center.lat, center.lng),
    radius: Math.sqrt(area * 10000 / Math.PI),
    area: `${area}`
  }));

  const onMarkerDrag = (marker, index) => e => {
    const center = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    props.onMarkerChange({
      center,
      area: +marker.area
    }, index);
  };

  const onAreaChange = (area) => {
    const center = {
      lat: activeMarker.center.lat(),
      lng: activeMarker.center.lng()
    };
    setActiveMarker({ ...activeMarker, area });
    props.onMarkerChange({
      center,
      area: +area
    }, activeMarker.index);
  };
    
  return (
    <Fragment>
      {markers.map((marker, i) => (
        <Fragment key={i}>
          <Circle
            center={marker.center}
            radius={marker.radius}
            options={drawingOptions.circle}
          />
          <Marker
            icon={{
              url: drawingOptions.marker.icon,
              scaledSize: Size(30, 30)
            }}
            position={marker.center}
            label={{
              text: marker.area,
              fontSize: '16px'
            }}
            draggable={true}
            onDragEnd={onMarkerDrag(marker, i)}
            onClick={() => setActiveMarker({ ...marker, index: i })}
            onRightClick={() => props.onMarkerChange(null, i)}
          />
        </Fragment>
      ))}
      {activeMarker && 
        <InfoWindow 
          position={activeMarker.center}
          onCloseClick={() => setActiveMarker(null)}
        >
          <InfoWindowBodyMarker 
            area={activeMarker.area}
            onAreaChange={onAreaChange}
          />
        </InfoWindow>
      }
    </Fragment>
  );
};

export default CanvasManagerCircle;