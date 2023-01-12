// @ts-nocheck - may need to be at the start of file
import './style.css'
import { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/footer";
import Marker_ from '../creationEvenement/Marker_';


const CreationCourse = () => {

    const [inputs, setInputs] = useState({});
    const [lat, setLat] = useState(46.6024)
    const [lng, setLng] = useState(1.8752)
    const [latLngDepart, setLatLngDepart] = useState([])
    const [latLngArrive, setLatLngArrive] = useState([])
    const [nomDepart, setNomDepart] = useState()
    const [nomArrive, setNomArrive] = useState()
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState()

    const handleSubmit = (e: any) => {
        e.preventDefault();
        inputs.localisation = {
            nomDepart: nomDepart,
            latLngDepart: latLngDepart,
            nomArrive: nomArrive,
            latLngArrive: latLngArrive
        }; //TODO: supprimer
        inputs.utilisateurs = [];
        inputs.distance = +inputs.distance;
        console.log(event)
        event == undefined ? null : inputs.evenement = "/api/evenements/"+event
        inputs.denivelePositif = +inputs.denivelePositif;
        inputs.deniveleNegatif = +inputs.deniveleNegatif;
        // console.log(inputs)

        fetch('http://127.0.0.1:8000/api/courses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NzM1MTEyNjksImV4cCI6MTY3MzU5NzY2OSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InJvbWFpbkBnbWFpbC5jb20iLCJlbWFpbCI6InJvbWFpbkBnbWFpbC5jb20iLCJwc2V1ZG8iOiJSb21haW4ifQ.Vc3-LM9Y7BDnZdp8Ozv7y5atT3I5CjDCYzdIxBQdUqWtzi1ANg_EhOlYIeEDG4BIOba609bu2TZOqznrKwF05FI1bWydsGQvdFdM-yDyRZaSCwG4MioB6gjEq5znZZJ6XLLZnujcx331iasFQi0aRE768CtrKMAM0wcoHHoZlDBqEUyHFuDRhBP9QParREU3hNveLp_4q7XcVBiU7PsqNrotNouDKO1wrBT1En0x732sLCi0ibEg4z7DUR_htIAqYYhx5WQBR6dUV-omD6yV1jyctQK5p_2Z2P8gTUmJ3VTrxE8wlZIsmIBjBsFvokxHQ-kV7qWmjwQmcIIwZegzqg"
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
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSelectChange = (e) => {
        if(e.target.value == "none"){
            document.querySelector('.localisation').classList.remove('hidden')
            document.querySelector('.map')?.classList.remove('hidden')
        }
        else{
            document.querySelector('.localisation').classList.contains('hidden') ? null : document.querySelector('.localisation').classList.add('hidden')
            document.querySelector('.map')?.classList.add('hidden')
            setEvent(e.target.value)
        }
    }

    function handleSearchAdress(input: string, point: string) {
        document.querySelector('.results-adr-'+point).innerHTML = ''
        if (input == '') return
        fetch(
          'https://api-adresse.data.gouv.fr/search/?q='+input
        ).then((response) =>
          response.json().then((data) => {
            document.querySelector('.results-adr-'+point)?.classList.remove('hidden')
            data.features.map((item) => {
                console.log(item)
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
                div.innerHTML = item.properties.postcode + ' - ' + item.properties.name 
                div.onclick = (e) => {
                  document.querySelector('.'+point+'-input').value =
                    e.target.innerText.split(' - ')[1]
                    document.querySelector('.results-adr-'+point)?.classList.add('hidden')
                    if(point == "depart"){
                        setLatLngDepart([item.geometry.coordinates[1], item.geometry.coordinates[0]])
                        setNomDepart(item.properties.name)
                    }
                    else{
                        setLatLngArrive([item.geometry.coordinates[1], item.geometry.coordinates[0]])
                        setNomArrive(item.properties.name)
                    }
                    setLat(item.geometry.coordinates[1]), setLng(item.geometry.coordinates[0])
                }
                document.querySelector('.results-adr-'+point)?.append(div)
            })
          })
        )
      }
      function fetchEvents(){
        Array.prototype.slice.call(document.querySelectorAll('.opt')).map((item, index) => {
            index > 1 ? item.remove() : null
        })
        events.map((item, index) => {
            let opt = document.createElement('option')
            opt.value = item.id
            opt.innerHTML = item.nom
            opt.onclick = (e) => {
                console.log(e.target.value)
            }
            opt.classList.add('opt')
            document.querySelector('option[value="none"]')?.after(opt)
        })
      }
      useEffect(() => {
          fetch('http://127.0.0.1:8000/api/evenements', {
              method: 'GET',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NzM1MTEyNjksImV4cCI6MTY3MzU5NzY2OSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InJvbWFpbkBnbWFpbC5jb20iLCJlbWFpbCI6InJvbWFpbkBnbWFpbC5jb20iLCJwc2V1ZG8iOiJSb21haW4ifQ.Vc3-LM9Y7BDnZdp8Ozv7y5atT3I5CjDCYzdIxBQdUqWtzi1ANg_EhOlYIeEDG4BIOba609bu2TZOqznrKwF05FI1bWydsGQvdFdM-yDyRZaSCwG4MioB6gjEq5znZZJ6XLLZnujcx331iasFQi0aRE768CtrKMAM0wcoHHoZlDBqEUyHFuDRhBP9QParREU3hNveLp_4q7XcVBiU7PsqNrotNouDKO1wrBT1En0x732sLCi0ibEg4z7DUR_htIAqYYhx5WQBR6dUV-omD6yV1jyctQK5p_2Z2P8gTUmJ3VTrxE8wlZIsmIBjBsFvokxHQ-kV7qWmjwQmcIIwZegzqg"
            },
        })
          .then((response) => response.json())
          .then((response) => {setEvents(response)})
          .catch((error) => console.log(error));
        }, []);
        
        useEffect(() => {
            fetchEvents()
        }, events[0])
    return (
        <div>
            <Header backgroundImage="/course.png"
                namePage="Créer une course"
                description="Saisissiez le formulaire pour créer une course :"
            />
            <div className="form-container h-screen w-full flex items-center justify-around">
                <div className="flex flex-col items-center justify-center w-2/3">
                    <form
                        onSubmit={handleSubmit}
                        className="w-2/4 p-4 rounded-lg text-black"
                    >
                        <div className="name-date flex items-center justify-between ">
                            <div className="flex flex-col items-start justify-center w-48">
                                <label className={"text-white"} htmlFor="course-nom">Nom</label>
                                <input
                                    type="text"
                                    id="nom"
                                    name="nom"
                                    value={inputs.nom || ""}
                                    onChange={handleChange}
                                    placeholder="Entrez le nom de la course"
                                    className="border-black rounded-lg border-solid border p-2 h-10"
                                />
                            </div>
                            <div className="flex flex-col items-start justify-center w-48">
                                <label className={"text-white"} htmlFor="course-date">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={inputs.date || ""}
                                    onChange={handleChange}
                                    className="border-black rounded-lg border-solid border p-2 h-10 w-full text-slate-400"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-center w-full mt-4 ">
                            <label className={"text-white"} htmlFor="course-evenement">Evénement</label>
                            <select
                                type="text"
                                id="course-evenement"
                                name="course-evenement"
                                className="event-select border-black rounded-lg border-solid border p-2 w-full"
                                onChange={handleSelectChange}
                            >
                                <option className='opt opt-default' value="default" disabled selected>Choisissez l'événement associé à la course</option>
                                <option className='opt opt-none' value="none" >Aucun</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <div className="relative flex flex-col items-start justify-center w-full mt-4">
                                <label className={"text-white"} htmlFor="course-depart">Point de départ</label>
                                <input
                                    type="text"
                                    id="depart"
                                    name="depart"
                                    placeholder="Adresse de départ"
                                    className="depart-input border-black rounded-lg border-solid border p-2 w-full"
                                />
                                <div
                              className="search-adress absolute flex flex-col items-center justify-center w-1/3 text-xs cursor-pointer text-black"
                              onClick={() => {
                                let input = document.querySelector('#depart')
                                handleSearchAdress(input.value, "depart")
                              }}
                            >
                              Rechercher
                            </div>
                            <div className="results-adr-depart absolute flex flex-col items-center justify-center w-full rounded-lg border border-slate-500 bg-slate-200 hidden"></div>
                            </div>
                            <div className="relative flex flex-col items-start justify-center w-full mt-4">
                                <label className={"text-white"} htmlFor="course-arrive">Point d'arrivé</label>
                                <input
                                    type="text"
                                    id="arrive"
                                    name="arrive"
                                    placeholder="Adresse d'arrivé"
                                    className="arrive-input border-black rounded-lg border-solid border p-2 w-full"
                                />
                                <div
                              className="search-adress absolute flex flex-col items-center justify-center w-1/3 text-xs cursor-pointer text-black"
                              onClick={() => {
                                let input = document.querySelector('#arrive')
                                handleSearchAdress(input.value, "arrive")
                              }}
                            >
                              Rechercher
                            </div>
                            <div className="results-adr-arrive absolute flex flex-col items-center justify-center w-full rounded-lg border border-slate-500 bg-slate-200 hidden"></div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-center w-full mt-4">
                            <label className={"text-white"} htmlFor="course-distance">Distance</label>
                            <input
                                type="number"
                                id="distance"
                                name="distance"
                                value={inputs.distance || ""}
                                onChange={handleChange}
                                placeholder="Entrez la distance de la course en m"
                                className="border-black rounded-lg border-solid border p-2 w-full"
                            />
                        </div>
                        <div className="denivele flex items-center justify-between mt-4">
                            <div className="flex flex-col items-start justify-center  w-48">
                                <label className={"text-white"} htmlFor="course-denivele-max">Dénivelé maximum</label>
                                <input
                                    type="number"
                                    id="denivelePositif"
                                    name="denivelePositif"
                                    value={inputs.denivelePositif || ""}
                                    onChange={handleChange}
                                    placeholder="Dénivelé maximum en m"
                                    className="border-black rounded-lg border-solid border p-2"
                                />
                            </div>
                            <div className="flex flex-col items-start justify-center  w-48">
                                <label className={"text-white"} htmlFor="course-denivele-min">Dénivelé minimum</label>
                                <input
                                    type="number"
                                    id="deniveleNegatif"
                                    name="deniveleNegatif"
                                    value={inputs.deniveleNegatif || ""}
                                    onChange={handleChange}
                                    placeholder="Dénivelé minimum en m"
                                    className="border-black rounded-lg border-solid border p-2"
                                />
                            </div>
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
                <div className="map h-2/4 w-96" id="map">
                    <Marker_ coords={[lat, lng]} markerCoords={[latLngDepart, latLngArrive]}/>
                </div>
            </div>
            <Footer></Footer>

        </div>
    )
}

export default CreationCourse
