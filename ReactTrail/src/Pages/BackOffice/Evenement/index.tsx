// @ts-nocheck - may need to be at the start of file
import './style.css'
import Header from "../../../Components/Header";
import Footer from "../../../Components/footer";
import List from "../../../Components/evementsList"
import Navbar from '../../../Components/backOffice/navbar';
import BOEvent from '../../../Components/backOffice/evenementsList';


const BackOfficeEvenements = () => {
    return (
        <>
            <Header backgroundImage="/evenement.jpeg"
                    namePage="Liste des évènements"
                    description="Liste de tous les événements créés"
            />
            <div className={"container mx-auto py-28"}>
                <Navbar/>
                <BOEvent/>
            </div>
            <Footer></Footer>

        </>
    )
}

export default BackOfficeEvenements
