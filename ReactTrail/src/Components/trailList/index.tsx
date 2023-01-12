// @ts-nocheck - may need to be at the start of file
import "./index.css";
import { list } from "postcss";
import { useEffect, useState } from "react";

const List = () => {
  const [courses, setCourses] = useState([]);
  // var params = window.location.search.split('?')[1].split('&');
  var params = window.location.search.split('?')[1].split('&')
  var paramsQuery = []
  params.forEach(element => {
    paramsQuery.push(element.split('=')[1])
  });
  // console.log(paramsQuery)
  // console.log('http://127.0.0.1:8000/api/courses?page=1' + (paramsQuery[1] != '' ? ('&date[before]=' + paramsQuery[1]) : '') + (paramsQuery[0] != '' ? ('&date[after]=' + paramsQuery[0]) : '') + (paramsQuery[2] != '' && paramsQuery[3] != '' ? ('&distance[between]=' + paramsQuery[2] + '..' + paramsQuery[3]) : '') + (paramsQuery[4] != '' ? '&nom=' + paramsQuery[4] : ''))

  useEffect(() => {
    // fetch('http://127.0.0.1:8000/api/courses?page=1&date[before]=2023-11-15&date[after]=2021-11-15&distance[between]=0..1000&nom=str', {
    fetch('http://127.0.0.1:8000/api/courses?page=1' + (paramsQuery[1] != '' ? ('&date[before]=' + paramsQuery[1]) : '') + (paramsQuery[0] != '' ? ('&date[after]=' + paramsQuery[0]) : '') + (paramsQuery[2] != '' && paramsQuery[3] != '' ? ('&distance[between]=' + paramsQuery[2] + '..' + paramsQuery[3]) : '') + (paramsQuery[4] != '' ? '&nom=' + paramsQuery[4] : ''), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
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
