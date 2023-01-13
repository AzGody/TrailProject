// @ts-nocheck - may need to be at the start of file
import './index.css'
import Header from "../Header";
import Footer from "../footer";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { API_ROOT_URL } from "/src/main";
import {convertMeterToKilometer} from "../../utils/convertMeterToKilometer";

const Details = (props: any) => {
    const [course, setCourse] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        fetch(API_ROOT_URL+`/api/courses/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => setCourse(response))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <Header backgroundImage="https://www.belambra.fr/les-echappees/wp-inside/uploads/2019/12/perdu-randonnee-reflexes.jpg"
                namePage={course.nom}
                description={course.distance + " m"}
            />
            <div className={"container mx-auto py-10"}>
                <div className="details">
                    <div className="container">
                        <div className="header">
                            <div className="title font-dancing-script">
                                {course.nom}
                            </div>
                            <div className="distanceDetails font-dancing-script">
                                {convertMeterToKilometer(course.distance)} km
                            </div>
                        </div>
                        <div className="track">
                            <div className="start">
                                <img src="/src/assets/start.png" alt="Start"></img>
                                <div className="font-dancing-script">
                                    {course?.localisation?.nomDepart}
                                </div>
                            </div>
                            <div className="middle-track">
                                <img className="arrow-top" src="/src/assets/arrow.png" alt="positive elevation"></img>
                                <div className="elevation font-dancing-script">
                                    <div className="elevation font-dancing-script">
                                        {course.denivelePositif}m
                                    </div>
                                </div>
                                <div className="join">
                                    <div className="circle"></div>
                                    <div className="line"></div>
                                    <div className="circle"></div>
                                </div>
                                <div className="elevation font-dancing-script">
                                    {course.deniveleNegatif}m
                                </div>
                                <img className="arrow-bottom" src="/src/assets/arrow.png" alt="nagative elevation"></img>
                            </div>
                            <div className="arrival">
                                <img src="/src/assets/arrival.png" alt="Start"></img>
                                <div className="font-dancing-script">
                                    {course?.localisation?.nomArrive}
                                </div>
                            </div>
                        </div>
                        <div className="description">
                            <div className="title font-dancing-script">
                                Description
                            </div>
                            <div className="content">
                                {course.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Details
