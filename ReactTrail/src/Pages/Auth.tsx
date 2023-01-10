import {useState} from 'react'
import Header from "../Components/Header";
import Footer from "../Components/footer";
import TrailList from '../Components/trailList';
import FormAuth from "../Components/FormAuth";


// import './App.css'

function Auth() {
    const [count, setCount] = useState(0)

    return (
        <div className={"container mx-auto pt-28"}>
            <Header backgroundImage="/home.webp"
                    namePage="Connexion"
                    description="Connectez vous a votre compte ! "
            />

            <FormAuth></FormAuth>
            <Footer></Footer>

        </div>
    )
}

export default Auth
