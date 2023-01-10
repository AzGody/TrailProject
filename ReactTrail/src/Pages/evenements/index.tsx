import { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet'
import './style.css'

const Evenements = () => {
  const [lat, setLat] = useState(48.864716)
  const [lng, setLng] = useState(2.349014)

  function getCoordinates(cityName: string) {
    fetch(
      'https://nominatim.openstreetmap.org/search?format=json&q=' + cityName
    ).then((response) => {
      response.json().then((data) => {
        setLat(data[0].lat)
        setLng(data[0].lon)
      })
    })
  }

//   function handleSearch(input: string) {
//     fetch('/cities.json').then((response) =>
//       response.json().then((data) => {
//         document.querySelector('.results')?.classList.remove('hidden')
//         data.map((item: string, index: number) => {
//           if (Object.values(item)[4].toLowerCase().includes(input.toLowerCase())) {
//             let div = document.createElement("div")
//             div.classList.add("text-black", "align-left", "w-full", "hover:bg-slate-300", "pl-2")
//             div.innerHTML = data[index].name+" - " + data[index].department_code
//             document.querySelector('.results')?.append(div)
//           }
//         })
//       })
//     )
//   }
    // handleSearch("Bor")
  getCoordinates('Bordeaux')

  return (
    <div className="form-container flex items-center justify-around w-screen h-screen">
      <div className="h-full w-2/4 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold underline text-center mb-8">
          Créer un événement
        </h1>
        <div className="flex flex-col items-center justify-center w-full">
          <form
            action=""
            method="post"
            className="w-2/3 p-4 rounded-lg text-white"
          >
            <div className="flex flex-col items-start justify-center w-full">
              <label htmlFor="course-nom">Nom</label>
              <input
                type="text"
                id="course-nom"
                name="course-nom"
                placeholder="Entrez le nom de l'événement"
                className="border-black rounded-lg border-solid border p-2 h-10 w-full text-black"
              />
            </div>
            <div className="relative flex flex-col items-start justify-center w-full mt-4">
              <label htmlFor="course-localisation">Localisation</label>
              <input
                type="text"
                id="course-localisation"
                name="course-localisation"
                placeholder="Entrez le nom de la ville"
                className="border-black rounded-lg border-solid border p-2 w-full text-black"
                // onChange={(e) => handleSearch(e.currentTarget.value)}
              />
              <div className="results absolute flex flex-col items-center justify-center w-full rounded-lg border border-slate-500 bg-slate-200 hidden">
                
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-col items-start justify-center w-48">
                <label htmlFor="course-date-debut">Date de début</label>
                <input
                  type="date"
                  id="course-date-debut"
                  name="course-date-debut"
                  className="border-black rounded-lg border-solid border p-2 h-10 w-full text-slate-400"
                />
              </div>
              <div className="flex flex-col items-start justify-center w-48">
                <label htmlFor="course-date-fin">Date de fin</label>
                <input
                  type="date"
                  id="course-date-fin"
                  name="course-date-fin"
                  className="border-black rounded-lg border-solid border p-2 h-10 w-full text-slate-400"
                />
              </div>
            </div>
            <input
              type="submit"
              value="Créer"
              className="mt-4 mr-4 bg-slate-500 rounded-lg p-2 text-white w-24"
            />
            <input
              type="button"
              value="Annuler"
              className="mt-4 bg-red-400 rounded-lg p-2 text-white w-24"
            />
          </form>
        </div>
      </div>
      <div className="map h-2/4 w-96" id="map">
        <MapContainer
          center={{ lat: lat, lng: lng }}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default Evenements
