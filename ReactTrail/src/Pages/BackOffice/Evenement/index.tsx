// @ts-nocheck - may need to be at the start of file
import './style.css'
import Header from "../../../Components/Header";
import Footer from "../../../Components/footer";
import List from "../../../Components/evementsList"
import Navbar from '../../../Components/backOffice/navbar';
import BOEvent from '../../../Components/backOffice/evenementsList';



const BackOfficeEvenements = () => {
    return (
        <div className={"container mx-auto pt-28"}>
            <Header backgroundImage="/evenement.jpeg"
                namePage="Liste des évènements"
                description="Liste de tous les événements créés :"
            />
            <Navbar/>
            <BOEvent/>
            <Footer></Footer>

        </div>
    )
}

export default BackOfficeEvenements
