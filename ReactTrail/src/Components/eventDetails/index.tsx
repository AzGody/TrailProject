import './index.css'
import Header from "../Header";
import Footer from "../footer";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_ROOT_URL } from "../../main";
import {convertMeterToKilometer} from "../../utils/convertMeterToKilometer";

const EventDetails = () => {

    const [evenement, setEvenement] = useState([]);
    const [dataLoad, setDataLoad] = useState(false)
    const { id } = useParams();

    useEffect(() => {
        fetch(API_ROOT_URL+`/api/evenements/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                setEvenement(response)
                setDataLoad(true)
            })
            .catch((error) => console.log(error));
    }, [id]);

    function goToTrailDetails(trailId) {
        window.location.href = "/courses/" + trailId;
    }

    return (
        <div>
            <Header backgroundImage="/evenement.jpeg"
                namePage={evenement.nom}
                description={dataLoad ? evenement.course.length + " courses" : ""}
            />
            <div className={"container mx-auto py-10"}>
                <div className="details">
                    <div className="container">
                        <div className="header">
                            <div className="title font-dancing-script">
                                {evenement.nom}
                            </div>
                            {
                                dataLoad ?
                                    <div className="distanceDetails font-dancing-script">
                                        {evenement.course.length} courses
                                    </div> : "Loading..."
                            }
                        </div>
                        <div className="eventTrailList">
                            {
                                dataLoad ?
                                    (evenement.course.length > 0) ? evenement.course.map((course) => (
                                        <div key={course.id} className="eventTrailItem" onClick={e => goToTrailDetails(course.id)}>
                                            <div className="imageAndText">
                                                <img src="/course.png"></img>
                                                <div className="eventTrailItemText">
                                                    <div className="title font-dancing-script">
                                                        Trail {course.nom}
                                                    </div>
                                                    <div>
                                                        <span className="date">{new Date(course.date).toLocaleDateString()} {new Date(course.date).toLocaleTimeString()}</span>
                                                        {
                                                            course.localisation.nom ? <span className="city"> à {course.localisation.nom}</span> : null
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="distanceDetails font-dancing-script">
                                                {convertMeterToKilometer(course.distance)} km
                                            </div>
                                        </div>
                                    )) : <div className={"p-4 text-center text-gray-600"}>Pas de courses</div>
                                    : "Loading..."
                            }
                        </div>
                        <div className="description">
                            <div className="title font-dancing-script">
                                Description
                            </div>
                            <div className="content">
                                {evenement.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default EventDetails
