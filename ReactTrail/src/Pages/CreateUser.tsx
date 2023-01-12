import { useState } from 'react'
import Header from "../Components/Header";
import Footer from "../Components/footer";
import TrailList from '../Components/trailList';
import FormAuth from "../Components/FormAuth";
import FormCreateUser from '../Components/FormCreateUser';


// import './App.css'

function CreateUser() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <Header backgroundImage="/home.webp"
                namePage="Création de compte"
                description="Créez votre compte ! "
            />
            <div className={"container mx-auto py-10"}>

                <FormCreateUser></FormCreateUser>
            </div>
            <Footer></Footer>

        </div>
    )
}

export default CreateUser
