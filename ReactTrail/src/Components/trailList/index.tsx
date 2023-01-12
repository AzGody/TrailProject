// @ts-nocheck - may need to be at the start of file
import "./index.css";
import { list } from "postcss";
import { useEffect, useState } from "react";
import { API_ROOT_URL } from "/src/main";
// @ts-nocheck - may need to be at the start of file
import { isConnectedUser } from "/src/utils/isConnectedUser.tsx";
const List = () => {
  const [courses, setCourses] = useState([]);
  var params;
  var paramsQuery = []
  var apiQuery;

  if (window.location.href.includes('?')) {
    params = window.location.search.split('?')[1].split('&')
    params.forEach(element => {
      paramsQuery.push(element.split('=')[1])
    });
    apiQuery = API_ROOT_URL+'/api/courses?page=1' + (paramsQuery[1] != '' ? ('&date[before]=' + paramsQuery[1]) : '') + (paramsQuery[0] != '' ? ('&date[after]=' + paramsQuery[0]) : '') + (paramsQuery[2] != '' && paramsQuery[3] != '' ? ('&distance[between]=' + paramsQuery[2] + '..' + paramsQuery[3]) : '') + (paramsQuery[4] != '' ? '&nom=' + paramsQuery[4] : '')
  } else {
    
    apiQuery = API_ROOT_URL+'/api/courses'
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

  const truncate = (str, max, len) => {
    return str.length > max ? str.substring(0, len) + "..." : str;
  }

  function AllCourses() {
    if (courses.length != 0) {
      return <div className="list">
        <div className="list-container">
          {courses.map(course =>
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
                <div className="distance">{course.distance} m</div>
                {
                  isConnectedUser() ?
                  <div>
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg> 
                  <svg width="24" height="24" fill='red' stroke='red'  xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z"/></svg>
                  </div>
                  : null
                }
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
