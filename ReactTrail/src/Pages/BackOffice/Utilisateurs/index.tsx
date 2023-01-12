// @ts-nocheck - may need to be at the start of file
import './style.css'
import Header from "../../../Components/Header";
import Footer from "../../../Components/footer";
import List from "../../../Components/evementsList"
import Navbar from '../../../Components/backOffice/navbar';
import UsersList from '../../../Components/backOffice/users';



const BackOfficeUtilisateurs = () => {
    return (
        <div>
            <Header backgroundImage="/evenement.jpeg"
                namePage="Créer un évènement"
                description="Saisissiez le formulaire pour créer un évènement :"
            />
            <div className={"container mx-auto py-10"}>
            <Navbar/>
            <UsersList />
            </div>
            <Footer></Footer>
            </div>
            )
}

export default BackOfficeUtilisateurs