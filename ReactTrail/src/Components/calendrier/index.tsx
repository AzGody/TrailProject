// @ts-nocheck - may need to be at the start of file
import Header from "../Header";
import Footer from "../footer";

import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import { API_ROOT_URL } from "/src/main";
import jwtDecode from "jwt-decode";

const Calendrier = (props: any) => {

    const [courses, setCourses] = useState([]);

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
            console.log(user)
        })
        .catch((error) => console.log(error));
    }, []);

    console.log("toto" , courses);

    const formatDate = (date) => {
        return date.split("T")[0];
    }

    return (
        <div>
            <Header backgroundImage="/course.png"
                namePage={"Mes courses"}
                description={"Les courses auxquelles vous participez"}
            />
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={[
                    { title: courses.nom, date: formatDate(courses.date), id: courses.id },
                ]}
                eventClick={((arg) => {
                    let id = arg.event.id;
                    window.open(`http://localhost:5173/courses/${id}`);
                })}

            />
            <Footer />
        </div>
    )
}

export default Calendrier;
