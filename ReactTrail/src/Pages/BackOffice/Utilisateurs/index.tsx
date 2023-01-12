// @ts-nocheck - may need to be at the start of file
import './style.css'
import Header from "../../../Components/Header";
import Footer from "../../../Components/footer";
import List from "../../../Components/evementsList"
import Navbar from '../../../Components/backOffice/navbar';
import UsersList from '../../../Components/backOffice/users';


const BackOfficeUtilisateurs = () => {
    return (
        <>
            <Header backgroundImage="/users.jpg"
                    namePage="Liste des utilisateurs"
                    description="Liste de tous les utilisateurs créés"
            />
            <div className={"container mx-auto py-28"}>
                <Navbar/>
                <UsersList/>
            </div>
            <Footer></Footer>

        </>
    )
}

export default BackOfficeUtilisateurs