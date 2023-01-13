// @ts-nocheck - may need to be at the start of file
import './style.css'
import Header from "../../Components/Header";
import Footer from "../../Components/footer";
import List from "../../Components/evementsList"

const Courses = () => {
    return (
        <div>
            <Header backgroundImage="/evenement.jpeg"
                    namePage="Evénements"
                    description=""
            />
            <div className={"container mx-auto py-10"}>
                <div className='flex items-center justify-center w-full text-2xl'>Voici la liste des évènements
                    disponibles
                </div>
                <List/>
            </div>
            <Footer></Footer>

        </div>
    )
}

export default Courses
