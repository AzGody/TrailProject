import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

export default function Marker_({ courses }: any) {
  
  
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
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {
        courses.map((course: object) => <Marker key={course.id} position={course.localisation.latLngDepart}></Marker>)
      }


    </MapContainer>
  )
}
