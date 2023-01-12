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

    console.log(courses);

    return (
        <div>
            <Header backgroundImage="/evenement.jpeg"
                namePage={props.title}
                description={props.trailNumber + " courses"}
            />
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={[
                    { title: 'event 1', date: '2023-01-12', id: '1' },
                    { title: 'event 2', date: '2023-01-14', id: '2' },
                    { title: 'course 1', date: '2023-01-14', id: '2' },
                    { title: 'course 2', date: '2023-01-14', id: '2' },
                    { title: 'course 3', date: '2023-01-14', id: '2' },
                ]}
                eventClick={((arg) => {
                    let id = arg.event.id;
                    window.open(`http://localhost:5173/evenements/evenements/${id}`);
                })}

            />
            <Footer />
        </div>
    )
}

export default Calendrier;
