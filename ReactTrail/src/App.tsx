import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/footer";
import TrailDetails from "./Components/trailDetails";
import TrailList from "./Components/trailList";
import EvenementList from "./Components/evementsList";
import Marker_c from "./Pages/listCourses/Marker_";
import Marker_e from "./Pages/listEvenements/Marker_";
import { useEffect } from "react";

// import './App.css'

function App() {
  const [courses, setCourses] = useState([]);
  const [evenements, setEvenements] = useState([]);
  const [courseSelected, setCourseSelected] = useState(true);

  const onChangeSelect = () => {
    setCourseSelected(!courseSelected);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/courses", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setCourses(response);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/evenements", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setEvenements(response);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Header
        backgroundImage="/home.webp"
        namePage="Reactive Trail"
        description="Bienvenue sur notre site de trail ! "
        // description3="courses vous attendent ! Bonne visite !"
        // nbCourses={"56"}
      />
      <div className={"container mx-auto py-10"}>
        <p className={"lg:pt-2 px-4 lg:px-0"}>
          Bienvenue sur notre site de trail ! Nous sommes passionnés de course à pied en nature et avons créé ce site
          pour partager notre amour du trail avec vous. Vous trouverez ici tout ce dont vous avez besoin pour découvrir
          et pratiquer ce sport fascinant : conseils de préparation, itinéraires de courses, tests de matériel, etc. Que
          vous soyez débutant ou expérimenté, nous espérons que vous trouverez ici de quoi satisfaire votre soif de
          découverte et de performance. Rejoignez notre communauté en ligne et partagez vos expériences de trail avec
          nous !
        </p>
        <p className="lg:pt-2 px-4 lg:px-0 text-xl font-semibold">Liste des courses les plus populaires :</p>
        <TrailList></TrailList>
        <p className="lg:pt-2 px-4 lg:px-0 text-xl font-semibold">Liste des évènements les plus populaires :</p>
        <EvenementList></EvenementList>
        <div className="flex-column center w-auto ">
          <div className="inline-flex mx-auto w-30 center  ">
            <label htmlFor="activites" className="mr-4">Afficher les :  </label>
            <div>
              <select name="activite" id="activites" onChange={onChangeSelect} className="p-0">
                <option value="course">courses</option>
                <option value="evenement">evenement</option>
              </select>
            </div>
          </div>
          <div className="map  h-[600px] " id="map">
            {courseSelected ? <Marker_c courses={courses} /> : <Marker_e evenements={evenements} />}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
