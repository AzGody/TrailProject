// @ts-nocheck - may need to be at the start of file
import './style.css'
import Header from "../../Components/Header";
import Footer from "../../Components/footer";
import List from "../../Components/trailList"



const Courses = () => {
    return (
        <div className={"container mx-auto pt-28"}>
            <Header backgroundImage="/evenement.jpeg"
                namePage="Créer un évènement"
                description="Saisissiez le formulaire pour créer un évènement :"
            />
            <div className='flex items-center justify-center w-full text-2xl'>Voici la liste des évènements disponibles
            <a href='/createEvenement'>
                <button type="button" class="self-end text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none" href="http://127.0.0.1:5173/createEvenement">Créer un évènement</button>
            </a>
            </div>
            <List />
            <Footer></Footer>

        </div>
    )
}

export default Courses
