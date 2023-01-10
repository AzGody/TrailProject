// @ts-nocheck - may need to be at the start of file
import { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet'
import './style.css'

import Header from '../../Components/Header'
import Footer from '../../Components/footer'

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
  const [inputs, setInputs] = useState({});

  const handleSubmit = (event: any) => {
      event.preventDefault();
      inputs.localisation = {lat: 45, lng: 6}; //TODO: supprimer
      inputs.utilisateurs = [];
      inputs.courses = [];

      console.log(inputs);

      fetch('http://127.0.0.1:8000/api/courses', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(inputs)
      })
          .then(response => response.json())
          .then(response => console.log(JSON.stringify(response)))
          .catch(error => console.log(error))
  }

  const handleChange = (event: any) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
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
    <div className={"container mx-auto pt-28"}>
    <Header
      backgroundImage="/evenement.jpeg"
      namePage="Créer un évenement"
      description="Saisissiez le formulaire pour créer un évenement :"
    />
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
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-start justify-center w-full">
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="Entrez le nom de l'événement"
                className="border-black rounded-lg border-solid border p-2 h-10 w-full text-black"
                value={inputs.nom || ""}
                onChange={handleChange}
              />
            </div>
            <div className="relative flex flex-col items-start justify-center w-full mt-4">
              <label htmlFor="localisation">Localisation</label>
              <input
                type="text"
                id="localisation"
                name="localisation"
                placeholder="Entrez le nom de la ville"
                className="border-black rounded-lg border-solid border p-2 w-full text-black"
                value={inputs.localisation || ""}
                onChange={handleChange}
                // onChange={(e) => handleSearch(e.currentTarget.value)}
              />
              <div className="results absolute flex flex-col items-center justify-center w-full rounded-lg border border-slate-500 bg-slate-200 hidden">
                
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-col items-start justify-center w-48">
                <label htmlFor="date-debut">Date de début</label>
                <input
                  type="date"
                  id="date-debut"
                  name="dateDebut"
                  className="border-black rounded-lg border-solid border p-2 h-10 w-full text-slate-400"
                  value={inputs.dateDebut || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col items-start justify-center w-48">
                <label htmlFor="date-fin">Date de fin</label>
                <input
                  type="date"
                  id="date-fin"
                  name="dateFin"
                  className="border-black rounded-lg border-solid border p-2 h-10 w-full text-slate-400"
                  value={inputs.dateFin || ""}
                  onChange={handleChange}
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
      <Footer></Footer>
    </div>
  )
}

export default Evenements
