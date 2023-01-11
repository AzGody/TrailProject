// @ts-nocheck - may need to be at the start of file
import './style.css'
import Header from "../../../Components/Header";
import Footer from "../../../Components/footer";
import List from "../../../Components/evementsList"
import Navbar from '../../../Components/backOffice/navbar';
import UsersList from '../../../Components/backOffice/users';



const BackOfficeUtilisateurs = () => {
    return (
        <div className={"container mx-auto pt-28"}>
            <Header backgroundImage="/evenement.jpeg"
                namePage="Créer un évènement"
                description="Saisissiez le formulaire pour créer un évènement :"
            />
            <Navbar/>
            <UsersList />
            <Footer></Footer>

        </div>
    )
}

export default BackOfficeUtilisateurs