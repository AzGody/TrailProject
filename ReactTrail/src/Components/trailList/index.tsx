// @ts-nocheck - may need to be at the start of file
import "./index.css";
import { list } from "postcss";
import { useEffect, useState } from "react";
import { API_ROOT_URL } from "/src/main";
import jwt_decode from "jwt-decode";
// @ts-nocheck - may need to be at the start of file
import { isConnectedUser } from "/src/utils/isConnectedUser.tsx";

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
    apiQuery = API_ROOT_URL + '/api/courses?page=1' + (paramsQuery[1] != '' ? ('&date[before]=' + paramsQuery[1]) : '') + (paramsQuery[0] != '' ? ('&date[after]=' + paramsQuery[0]) : '') + (paramsQuery[2] != '' && paramsQuery[3] != '' ? ('&distance[between]=' + paramsQuery[2] + '..' + paramsQuery[3]) : '') + (paramsQuery[4] != '' ? '&nom=' + paramsQuery[4] : '')
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
      // .then((response) => console.log(response))
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

  const heart = (bool) => {
    if (bool == true) {
      return (
        <svg width="24" height="24" fill='red' stroke='red' xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" /></svg>
      )
    } else {
      return (
        <svg width="24" height="24" fill='grey' stroke='grey' xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" /></svg>
      )
    }
  }

  const truncate = (str, max, len) => {
    return str.length > max ? str.substring(0, len) + "..." : str;
  }

  function test() {
    console.log("ok");

  }
  function AllCourses() {

    if (courses.length != 0) {
      return <div className="list">
        <div className="list-container">
          {courses.map(course =>
          (

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
                <div className="distance">{course.distance} m</div>
                <div className="flex mt-3">
                  {
                    isConnectedUser() && course.utilisateurs.length != 0 ?
                      <div>
                        {course.utilisateurs.map(courseUser =>
                        (<div onClick={test} className="testClick">
                          {courseUser.id == 3 ?
                            heart(true)
                            : null}
                        </div>
                        )
                        )}
                      </div> : <div onClick={test}> {heart(false)}</div>

                  }
                  <a key={course.id} href={`/courses/${course.id}`}>
                    <button onClick={(event) => {
                      // event.preventDefault()
                      // setVisible(!visible)
                    }} type="button" className="self-end text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">Voir plus</button>
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
                  <div className="distance">{course.distance} m</div>
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
