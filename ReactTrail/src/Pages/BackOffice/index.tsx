// @ts-nocheck - may need to be at the start of file
import './style.css'
import Header from "../../Components/Header";
import Footer from "../../Components/footer";
import List from "../../Components/trailList";
import Navbar from "../../Components/backOffice/navbar";


const BackOffice = () => {
    return (
        <>
            <Header backgroundImage="/admin.jpg"
                    namePage="DashBoard BackOffice"
                    description="Interface administrateur"
            />
            <div className={"container mx-auto py-28"}>
                <div class="bo-dashboard">
                    <Navbar/>
                    <div class="bo-dash-content">
                        <h1>
                            DASHBOARD
                        </h1>
                        <p class="mt-6">Bienvenu(e) dans votre DashBoard Reactive Trail.</p>
                        <div class="flex justify-center items-center mt-6">
                            <p>Vous pouvez ajouter des courses :</p>
                            <a href='/courses/create'>
                                <button type="button"
                                        class="self-end text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                                        href="http://127.0.0.1:5173/createCourse">Créer une course
                                </button>
                            </a>
                        </div>
                        <div class="flex justify-center items-center mt-6">
                            <p>Vous pouvez ajouter des événements :</p>
                            <a href='/evenements/create'>
                                <button type="button"
                                        class="self-end text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                                        href="http://127.0.0.1:5173/createEvenement">Créer un évènement
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer></Footer>


        </>
    )
}

export default BackOffice
