import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import {Link} from "react-router-dom";

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
      zoom={6}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {
        courses.map((course: object) =>
            <Marker key={course.id} position={course.localisation.latLngDepart}>
              <Popup position={course.localisation.latLngDepart}>
                <div className={"popup"}>
                  <div className={"flex justify-center items-center text-black mb-4"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <h2 className={"text-2xl"}>{course.nom}</h2>
                  </div>
                  <div className={"flex justify-center mb-2"}>
                    <Link to={"/courses/" + course.id} className={"linkToCourse text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center "}>
                      Détails de la course
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>)
      }


    </MapContainer>
  )
}
