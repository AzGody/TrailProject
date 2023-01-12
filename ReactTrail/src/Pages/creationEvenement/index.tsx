// @ts-nocheck - may need to be at the start of file
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import './style.css'

import Header from '../../Components/Header'
import Footer from '../../Components/footer'
import Marker_ from './Marker_'
import { API_ROOT_URL } from '/src/main';
import { useParams } from 'react-router-dom';

const Evenements = () => {
  const [lat, setLat] = useState(47.5999976)
  const [lng, setLng] = useState(3.5333312)
  const [cityName, setCityName] = useState('')
  const { id } = useParams();
  const [evenement, setEvenement] = useState([]);
  
  // GET REQUEST TO GET VALUE BY ID
  if(id !== undefined){
    useEffect(() => {
      fetch(API_ROOT_URL+`/api/evenements/${id}`, {
          method: "GET",
          headers: {
              Accept: "application/json",
          },
      })
          .then((response) => response.json())
          .then((response) => setEvenement(response))
          .catch((error) => console.log(error));
    }, []);
  }

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
  const [inputs, setInputs] = useState({})

  const handleSubmit = (event: any) => {

    event.preventDefault()
    inputs.utilisateurs = []
    inputs.courses = []
    inputs.localisation = {
      name: cityName,
      lat: lat,
      lng: lng
    }
    
    if(id === undefined){
      fetch(API_ROOT_URL+'/api/evenements', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json', 
          Authorization: "Bearer " + sessionStorage.getItem("JWT")
        },
        body: JSON.stringify(inputs),
      })
        .then((response) => response.json())
        .then((response) => console.log(JSON.stringify(response)))
        .catch((error) => console.log(error))
    }else{
      // PUT REQUEST TO MODIFY EVENT
      fetch(API_ROOT_URL+`/api/evenements/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json', 
          Authorization: "Bearer " + sessionStorage.getItem("JWT")
        },
        body: JSON.stringify(inputs),
      })
        .then((response) => response.json())
        .then((response) => console.log(JSON.stringify(response)))
        .catch((error) => console.log(error))
    }
  }

  const handleChange = (event: any) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }

  function handleSearch(input: string) {
    document.querySelector('.results').innerHTML = ''
    if (input == '') return
    fetch(
      'https://geo.api.gouv.fr/communes?nom=' + input + '&fields=codesPostaux'
    ).then((response) =>
      response.json().then((data) => {
        document.querySelector('.results')?.classList.remove('hidden')
        data.map((item) => {
          let div = document.createElement('div')
          div.classList.add(
            'result',
            'text-black',
            'align-left',
            'w-full',
            'hover:bg-slate-300',
            'pl-2',
            'cursor-pointer'
          )
          div.innerHTML = item.nom + ' - ' + item.codesPostaux[0]
          div.onclick = (e) => {
            document.querySelector('.localisation').value =
              e.target.innerText.split(' - ')[0]
            document.querySelector('.results')?.classList.add('hidden')
            getCoordinates(e.target.innerText.split(' - ')[0])
            setCityName(e.target.innerText.split(' - ')[0])
          }
          document.querySelector('.results')?.append(div)
        })
      })
    )
  }

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }
 
  return (
    <div>
      <Header
        backgroundImage="/evenement.jpeg"
        namePage="Créer un évenement"
        description="Saisissiez le formulaire pour créer un évenement :"
      />
      <div className="form-container flex items-center justify-around w-full h-screen">
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
                  value={inputs.nom || evenement.nom}
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
                  className="localisation border-black rounded-lg border-solid border p-2 w-full text-black"
                />
                <div
                  className="search absolute flex flex-col items-center justify-center w-1/3 rounded-lg cursor-pointer text-black"
                  onClick={() => {
                    let input = document.querySelector('.localisation')
                    handleSearch(input.value)
                  }}
                >
                  Rechercher
                </div>
                <div className="results absolute flex flex-col items-center justify-center w-full rounded-lg border border-slate-500 bg-slate-200 hidden"></div>
              </div>
              <div className="date flex items-center justify-between mt-4">
                <div className="flex flex-col items-start justify-center w-48">
                  <label htmlFor="date-debut">Date de début</label>
                  <input
                    type="date"
                    id="date-debut"
                    name="dateDebut"
                    className="border-black rounded-lg border-solid border p-2 h-10 w-full text-slate-400"
                    value={inputs.dateDebut || formatDate(evenement.dateDebut)}
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
                    value={inputs.dateFin || formatDate(evenement.dateFin)}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-center w-full">
                <label className={'text-white'} htmlFor="description">
                  Description
                </label>
                <input
                  type="textarea"
                  id="description"
                  name="description"
                  value={inputs.description || evenement.description}
                  onChange={handleChange}
                  placeholder="description"
                  className="border-black rounded-lg border-solid border p-2 w-full text-black"
                />
              </div>
              <input
                type="submit"
                value="Créer"
                className="mt-4 mr-4 bg-slate-500 rounded-lg p-2 text-white w-24 hover:bg-slate-600 cursor-pointer"
              />
              <button
                  type="button"
                  onClick={e => { history.back() } }
                  className="mt-4 bg-red-400 rounded-lg p-2 text-white w-24 hover:bg-red-500 cursor-pointer"
              >Annuler</button>
            </form>
          </div>
        </div>
        <div className="map h-96 w-96" id="map">
            <Marker_ coords={[lat, lng]} markerCoords={[[lat, lng]]}/>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Evenements
