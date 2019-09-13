import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { GMAP_API_KEY } from "../config";

const AgroMap = () => (
  <LoadScript
    id="script-loader"
    googleMapsApiKey={GMAP_API_KEY}
    libraries={['geometry', 'drawing']}
  >
    <GoogleMap
      id="agro-platform-map"
      mapContainerStyle={{
        height: "100%",
        width: "100%"
      }}
      zoom={6}
      center={{
        lat: 53.768,
        lng: 27.592
      }}
    >
    </GoogleMap>
  </LoadScript>
);

export default AgroMap