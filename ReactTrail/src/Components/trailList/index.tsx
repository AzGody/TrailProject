// @ts-nocheck - may need to be at the start of file
import "./index.css";
import { list } from "postcss";
import { useEffect, useState } from "react";
import { API_ROOT_URL } from "/src/main";
import jwt_decode from "jwt-decode";
// @ts-nocheck - may need to be at the start of file
import { isConnectedUser } from "/src/utils/isConnectedUser.tsx";
import {convertMeterToKilometer} from "../../utils/convertMeterToKilometer";
import {co} from "@fullcalendar/core/internal-common";

const List = () => {
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState("");

  var params;
  var paramsQuery = []
  var apiQuery;

  if (window.location.href.includes('?')) {
    params = window.location.search.split('?')[1].split('&')
    params.forEach(element => {
      paramsQuery.push(element.split('=')[1])
    });
    apiQuery = API_ROOT_URL + '/api/courses?page=1' + (paramsQuery[1] != '' ? ('&date[before]=' + paramsQuery[1]) : '') + (paramsQuery[0] != '' ? ('&date[after]=' + paramsQuery[0]) : '') + (paramsQuery[2] != '' && paramsQuery[3] != '' ? ('&distance[between]=' + paramsQuery[2]*1000 + '..' + paramsQuery[3]*1000) : '') + (paramsQuery[4] != '' ? '&nom=' + paramsQuery[4] : '')
  } else {

    apiQuery = API_ROOT_URL + '/api/courses'
  }

  useEffect(() => {
    fetch(apiQuery, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setCourses(response))
      .catch((error) => console.log(error));
  }, []);

  const token = sessionStorage.getItem("JWT")
  useEffect(() => {
    if (token !== null) {
      const decoded = jwt_decode(token);

      setUserId(decoded.id)
    }
  }, [userId])

  const handleHearthClick = (event, course) => {
    if (event.target.tagName !== "svg") {
      event.target.parentElement.classList.replace("text-gray-400", "text-red-400")
      event.target.parentElement.classList.add("pointer-events-none")
    } else {
      event.target.classList.replace("text-gray-400", "text-red-400")
      event.target.classList.add("pointer-events-none")
    }

    const users = [];
    users.push(...course.utilisateurs, "/api/utilisateurs/"+userId)

    fetch(API_ROOT_URL+"/api/courses/"+course.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({"utilisateurs": users })
    }).then((response) => {
      console.log(response)
    }).catch((error) => console.log(error));
  }

  const truncate = (str, max, len) => {
    return str.length > max ? str.substring(0, len) + "..." : str;
  }

  function AllCourses() {

    if (courses.length != 0) {
      return <div className="list">
        <div className="list-container">
          {courses.map(course =>
          (

            <div key={course.id} className="card">
              <div className="card-header">
                <img
                  src="https://www.belambra.fr/les-echappees/wp-inside/uploads/2019/12/perdu-randonnee-reflexes.jpg"
                  alt="rover"
                />
              </div>
              <div className="card-body">
                <h3>{new Date(course.date).toLocaleDateString('Fr-fr')}</h3>
                <h1>{course.nom}</h1>
                <h2>{course.localisation.nom}</h2>
                <p>{truncate(String(course.description), 0, 150)}</p>
                <div className="distance">{convertMeterToKilometer(course.distance)} km</div>
                <div className={isConnectedUser() ? "flex mt-3 items-center justify-between" : "flex mt-3 items-center justify-center"}>
                  {
                    isConnectedUser() ?
                        (course.utilisateurs.length > 0) ?
                            (course.utilisateurs.includes("/api/utilisateurs/"+userId)) ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-400">
                                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                </svg> :
                                <svg onClick={event => handleHearthClick(event, course)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer text-gray-400 hover:scale-125 transition-all">
                                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                </svg> :
                        <svg onClick={event => handleHearthClick(event, course)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer text-gray-400 hover:scale-125 transition-all">
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg> : null
                  }
                  <a key={course.id} className={"linkToCourse"} href={`/courses/${course.id}`}>
                    <button onClick={(event) => {
                      // event.preventDefault()
                      // setVisible(!visible)
                    }} type="button" className="self-end text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">Voir plus</button>
                  </a></div>
              </div>
            </div>
          ))}
        </div>
      </div>;
    }
    else {
      return (
        <div className="list">
          <div className="list-container">
            Aucune course n'est disponibe pour le moment
          </div>
        </div>
      )
    }
  }

  function SliceCourses() {
    if (courses.length != 0) {
      return <div className="list">
        <div className="list-container">
          {courses.slice(0, 4).map(course =>
          (<a key={course.id} href={`/courses/${course.id}`}>
            <div className="card">
              <div className="card-header">
                <img
                  src="https://www.belambra.fr/les-echappees/wp-inside/uploads/2019/12/perdu-randonnee-reflexes.jpg"
                  alt="rover"
                />
              </div>
              <div className="card-body">
                <h3>{new Date(course.date).toLocaleDateString('Fr-fr')}</h3>
                <h1>{course.nom}</h1>
                <h2>{course.localisation.nom}</h2>
                <p>{truncate(String(course.description), 0, 150)}</p>
                <div className="flex">
                  <div className="distance">{convertMeterToKilometer(course.distance)} m</div>
                </div>
              </div>
            </div>

          </a>))}

        </div>
      </div>;
    }
    else {
      return (
        <div className="list">
          <div className="list-container">
            Aucune course n'est disponibe pour le moment
          </div>
        </div>
      )
    }
  }
  if (window.location.pathname == '/') {
    return (<SliceCourses></SliceCourses>)
  }
  else { return (<AllCourses></AllCourses>) }
};

export default List;
