import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

export default function Marker_({ coords, markerCoords }: any) {
  function SetViewOnClick({ coords }: any) {
    const map = useMap()
    map.setView(coords, map.getZoom())
    if(markerCoords[0].length == 0) {
      return
    }
    return (
      markerCoords.map((item: any, index: any) => {
        return(
          (item[0] != undefined && item[1] != undefined) ?
          <Marker key={index+JSON.stringify(item)} position={[item[0], item[1]]}></Marker> : null
        )
      })
    )
  }
  return (
    <MapContainer
      className="map"
      center={coords}
      zoom={10}
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
