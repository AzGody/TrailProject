// @ts-nocheck - may need to be at the start of file
import './style.css'
import { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/footer";
import Marker_ from '../creationEvenement/Marker_';


const CreationCourse = () => {

    const [inputs, setInputs] = useState({});
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

    const handleSubmit = (event: any) => {
        event.preventDefault();
        inputs.localisation = { lat: 45, lng: 6 }; //TODO: supprimer
        inputs.utilisateurs = [];
        inputs.distance = +inputs.distance;
        inputs.denivelePositif = +inputs.denivelePositif;
        inputs.deniveleNegatif = +inputs.deniveleNegatif;
        //console.log(inputs)

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
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSelectChange = (e) => {
        console.log(e.target.value)
        if(e.target.value == "none"){
            document.querySelector('.localisation').classList.remove('hidden')
            document.querySelector('.map')?.classList.remove('hidden')
        }
        else{
            document.querySelector('.localisation').classList.contains('hidden') ? null : document.querySelector('.localisation').classList.add('hidden')
            document.querySelector('.map')?.classList.add('hidden')
        }
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
                document.querySelector('.localisation-input').value =
                  e.target.innerText.split(' - ')[0]
                document.querySelector('.results')?.classList.add('hidden')
                getCoordinates(e.target.innerText.split(' - ')[0])
              }
              document.querySelector('.results')?.append(div)
            })
          })
        )
      }

    return (
        <div className={"container mx-auto pt-28"}>
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
                        <div className="flex items-center justify-between ">
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
                                className="border-black rounded-lg border-solid border p-2 w-full"
                                onChange={handleSelectChange}
                            >
                                <option value="default" disabled selected>Choisissez l'événement associé à la course</option>
                                <option value="none" >Aucun</option>
                                <option value="event1" >Event 1</option>
                                <option value="event2" >Event 2</option>
                                <option value="event3" >Event 3</option>
                            </select>
                        </div>
                        <div className="localisation relative flex flex-col items-start justify-center w-full mt-4 hidden">
                            <label htmlFor="localisation" className="text-white">Localisation</label>
                            <input
                              type="text"
                              id="localisation"
                              name="localisation"
                              placeholder="Entrez le nom de la ville"
                              className="localisation-input border-black rounded-lg border-solid border p-2 w-full text-black"
                            />
                            <div
                              className="search absolute flex flex-col items-center justify-center w-1/3 rounded-lg cursor-pointer text-black"
                              onClick={() => {
                                let input = document.querySelector('.localisation-input')
                                console.log(input.value)
                                handleSearch(input.value)
                              }}
                            >
                              Rechercher
                            </div>
                            <div className="results absolute flex flex-col items-center justify-center w-full rounded-lg border border-slate-500 bg-slate-200 hidden"></div>
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
                        <div className="flex items-center justify-between mt-4">
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
                        <input
                            type="button"
                            value="Annuler"
                            className="mt-4 bg-red-400 rounded-lg p-2 text-white w-24 hover:bg-red-500 cursor-pointer"
                        />
                    </form>
                </div>
                <div className="map h-2/4 w-96 hidden" id="map">
                    <Marker_ coords={[lat, lng]}/>
                </div>
            </div>
            <Footer></Footer>

        </div>
    )
}

export default CreationCourse