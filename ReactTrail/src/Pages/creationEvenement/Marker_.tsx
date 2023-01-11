import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

export default function Marker_({ coords }: any) {
  function SetViewOnClick({ coords }: any) {
    const map = useMap()
    map.setView(coords, map.getZoom())

    return (
      <Marker position={coords}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    )
  }
  return (
    <MapContainer
      className="map"
      center={coords}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetViewOnClick coords={coords} />
    </MapContainer>
  )
}
