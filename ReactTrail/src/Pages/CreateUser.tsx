import {useState} from 'react'
import Header from "../Components/Header";
import Footer from "../Components/footer";
import TrailList from '../Components/trailList';
import FormAuth from "../Components/FormAuth";
import FormCreateUser from '../Components/FormCreateUser';


// import './App.css'

function CreateUser() {
    const [count, setCount] = useState(0)

    return (
        <div className={"container mx-auto pt-28"}>
            <Header backgroundImage="/home.webp"
                    namePage="Création de compte"
                    description="Créez votre compte ! "
            />

            <FormCreateUser></FormCreateUser>
            <Footer></Footer>

        </div>
    )
}

export default CreateUser
