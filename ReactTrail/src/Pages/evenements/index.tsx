import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import './style.css'
import Header from "../../Components/Header";
import Footer from "../../Components/footer";

const Evenements = () => {
    return (
        <div className={"container mx-auto pt-28"}>
            <Header backgroundImage="/evenement.jpeg"
                    namePage="Créer un événement"
                    description="Saisissiez le formulaire pour créer un événement :"
            />
            <div className='form-container flex items-center justify-around w-screen h-screen'>
                <div className="h-full w-2/4 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center w-full">
                        <form
                            action=""
                            method="post"
                            className="w-1/3 p-4 rounded-lg text-white"
                        >
                            <div className="flex flex-col items-start justify-center w-full">
                                <label htmlFor="course-nom">Nom</label>
                                <input
                                    type="text"
                                    id="course-nom"
                                    name="course-nom"
                                    placeholder="Entrez le nom de l'événement"
                                    className="border-black rounded-lg border-solid border p-2 h-10 w-full"
                                />
                            </div>
                            <div className="flex flex-col items-start justify-center w-full mt-4">
                                <label htmlFor="course-localisation">Localisation</label>
                                <input
                                    type="text"
                                    id="course-localisation"
                                    name="course-localisation"
                                    placeholder="Entrez la distance de la course en km"
                                    className="border-black rounded-lg border-solid border p-2 w-full"
                                />
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
                <div className="map h-2/4 w-1/3" id="map">
                    <MapContainer
                        center={[51.505, -0.09]}
                        zoom={13}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[51.505, -0.09]}>
                            <Popup>
                                A pretty CSS3 popup. <br/> Easily customizable.
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
