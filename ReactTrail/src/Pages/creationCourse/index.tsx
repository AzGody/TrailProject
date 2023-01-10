// @ts-nocheck - may need to be at the start of file
// import './style.css'
import { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/footer";


const CreationCourse = () => {

    const [inputs, setInputs] = useState({});

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

    return (
        <div className={"container mx-auto pt-28"}>
            <Header backgroundImage="/course.png"
                namePage="Créer une course"
                description="Saisissiez le formulaire pour créer une course :"
            />
            <div className="form-container h-screen flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center w-full">
                    <form
                        onSubmit={handleSubmit}
                        className="w-1/3 p-4 rounded-lg text-black"
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
                        <div className="flex flex-col items-start justify-center w-full mt-4 hidden">
                            <label className={"text-white"} htmlFor="course-localisation">Localisation</label>
                            <input
                                type="text"
                                id="course-localisation"
                                name="course-localisation"
                                placeholder="Entrez la distance de la course en km"
                                className="border-black rounded-lg border-solid border p-2 w-full"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-center w-full mt-4">
                            <label className={"text-white"} htmlFor="course-distance">Distance</label>
                            <input
                                type="number"
                                id="distance"
                                name="distance"
                                value={inputs.distance || ""}
                                onChange={handleChange}
                                placeholder="Entrez la distance de la course en km"
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
                            className="mt-4 mr-4 bg-slate-500 rounded-lg p-2 text-white w-24 cursor-pointer"
                        />
                        <input
                            type="button"
                            value="Annuler"
                            className="mt-4 bg-red-400 rounded-lg p-2 text-white w-24 cursor-pointer"
                        />
                    </form>
                </div>
            </div>
            <Footer></Footer>

        </div>
    )
}

export default CreationCourse
