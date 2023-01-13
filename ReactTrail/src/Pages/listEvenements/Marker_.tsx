import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

export default function Marker_({evenements}:any) {
  
  
/*const MyMarkers = ({ data }:any) => {
  return data.map((datas:any, index:any) => (
    <Marker
      key={index}
      position={datas}
    >
    </Marker>
  ));
}*/

  return (
    <MapContainer
      className="map"
      center={[46.71109, 1.7191036]}
      zoom={6}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {
        evenements.map((evenement: object) => <Marker key={evenement.id} position={[evenement.localisation.position.lat, evenement.localisation.position.lng]}></Marker>)
      }

    </MapContainer>
  )
}
