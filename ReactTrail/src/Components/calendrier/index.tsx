// @ts-nocheck - may need to be at the start of file
import Header from "../Header";
import Footer from "../footer";
import "./index.css";

import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import { API_ROOT_URL } from "/src/main";
import jwtDecode from "jwt-decode";
import {an} from "@fullcalendar/core/internal-common";

const Calendrier = () => {

    const [courses, setCourses] = useState([]);
    const [customCourse, setCustomCourse] = useState([]);

    const token = sessionStorage.getItem("JWT");

    useEffect(() => {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        fetch(API_ROOT_URL+`/api/utilisateurs/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer "+sessionStorage.getItem("JWT"),
            },
        })
        .then((response) => response.json())
        .then((user) => {
            setCourses(user.course)
        })
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        const array = [];

        courses.forEach((course) => {
            array.push({...course, title: "Course : " + course.nom, date: course.date.split("T")[0]})
        })
        setCustomCourse(array)
    }, [courses])

    return (
        <div>
            <Header backgroundImage="/course.png"
                namePage={"Mes courses"}
                description={"Les courses auxquelles vous participez"}
            />
            <div className={"w-4/5 m-auto"}>
                <div className={"w-full p-12"}>
                    <FullCalendar
                        plugins={[ dayGridPlugin ]}
                        initialView="dayGridMonth"
                        events={customCourse}
                        eventClick={((arg) => {
                            let id = arg.event.id;
                            window.open(`http://localhost:5173/courses/${id}`);
                        })}
                        locale={"fr-fr"}
                        buttonText={ {today: "Aujourd'hui"} }
                    />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Calendrier;
