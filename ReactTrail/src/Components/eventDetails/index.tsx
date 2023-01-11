import './index.css'
import Header from "../Header";
import Footer from "../footer";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = (props: any) => {

    const [evenement, setEvenement] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/evenements/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    }, []);

    function goToTrailDetails() {
        window.location.href = "#";
    }

    return (
        <div>
            <Header backgroundImage="/evenement.jpeg"
                namePage={props.title}
                description={props.trailNumber + " courses"}
            />
            <div className={"container mx-auto py-10"}>
                <div className="details">
                    <div className="container">
                        <div className="header">
                            <div className="title font-dancing-script">
                                {props.title}
                            </div>
                            <div className="distanceDetails font-dancing-script">
                                {props.trailNumber} courses
                            </div>
                        </div>
                        <div className="eventTrailList">
                            {/* start foreach ici */}
                            <div className="eventTrailItem" onClick={goToTrailDetails}>
                                <div className="imageAndText">
                                    <img src="/course.png"></img>
                                    <div className="eventTrailItemText">
                                        <div className="title font-dancing-script">
                                            Trail en montagne à Saint-Étienne-de-Baïgorry
                                        </div>
                                        <div>
                                            <span className="date">Lundi 10 janvier 2023</span>
                                            <span> à </span>
                                            <span className="city">Saint-Étienne-de-Baïgorry</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="distanceDetails font-dancing-script">
                                    25 km
                                </div>
                            </div>
                            <div className="eventTrailItem" onClick={goToTrailDetails}>
                                <div className="imageAndText">
                                    <img src="/course.png"></img>
                                    <div className="eventTrailItemText">
                                        <div className="title font-dancing-script">
                                            Trail en montagne à Saint-Étienne-de-Baïgorry
                                        </div>
                                        <div>
                                            <span className="date">Lundi 10 janvier 2023</span>
                                            <span> à </span>
                                            <span className="city">Saint-Étienne-de-Baïgorry</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="distanceDetails font-dancing-script">
                                    25 km
                                </div>
                            </div>
                            <div className="eventTrailItem" onClick={goToTrailDetails}>
                                <div className="imageAndText">
                                    <img src="/course.png"></img>
                                    <div className="eventTrailItemText">
                                        <div className="title font-dancing-script">
                                            Trail en montagne à Saint-Étienne-de-Baïgorry
                                        </div>
                                        <div>
                                            <span className="date">Lundi 10 janvier 2023</span>
                                            <span> à </span>
                                            <span className="city">Saint-Étienne-de-Baïgorry</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="distanceDetails font-dancing-script">
                                    25 km
                                </div>
                            </div>
                            {/* end foreach ici */}
                        </div>
                        <div className="description">
                            <div className="title font-dancing-script">
                                Description
                            </div>
                            <div className="content">
                                {props.description}
                                Le trail en montagne à Saint-Étienne-de-Baïgorry est une course à pied en nature qui se
                                déroule sur des sentiers et chemins de montagne. Ce parcours de montagne offre de
                                magnifiques panoramas sur les paysages environnants. Vous pourrez découvrir la région et ses
                                richesses naturelles tout en vous dépassant physiquement. Le trail en montagne est une
                                activité idéale pour les amateurs de plein air et de grands espaces. Si vous cherchez un
                                défi physique et un moment de détente en pleine nature, le trail en montagne à
                                Saint-Étienne-de-Baïgorry est fait pour vous.
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
