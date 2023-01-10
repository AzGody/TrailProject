import {useState} from 'react'
import reactLogo from './assets/react.svg'
import {Outlet} from "react-router-dom"
import Header from "./Components/Header";
import Footer from './Components/footer';
import TrailDetails from "./Components/trailDetails";
import TrailList from "./Components/trailList";

// import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className={"container mx-auto pt-28"}>
            <Header backgroundImage="/home.webp"
                    namePage="Reactive Trail"
                    description="Bienvenue sur notre site de trail ! "
                    description3="courses vous attendent ! Bonne visite !"
                    nbCourses={"56"}
            />

            <p className={"pt-2"}>
                Bienvenue sur notre site de trail ! Nous sommes passionnés de course à pied en nature et avons créé ce
                site pour partager notre amour du trail avec vous. Vous trouverez ici tout ce dont vous avez besoin pour
                découvrir et pratiquer ce sport fascinant : conseils de préparation, itinéraires de courses, tests de
                matériel, etc. Que vous soyez débutant ou expérimenté, nous espérons que vous trouverez ici de quoi
                satisfaire votre soif de découverte et de performance. Rejoignez notre communauté en ligne et partagez
                vos expériences de trail avec nous !
            </p>

            <TrailList></TrailList>
            <Footer></Footer>

        </div>
    )
}

export default App
