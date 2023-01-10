// @ts-nocheck - may need to be at the start of file
import "./index.css";
import { list } from "postcss";
import { useEffect, useState } from "react";

const List = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/courses", {
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

  return (
    <div className="list">
      <div className="list-container">
        {courses.map(course=>
            (<a key={course.id} href={"/details"}>
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
                <p>{truncate(String(course.description), 0, 80)}</p>
                <div className="flex">
                  <div className="distance">{course.distance} m</div>
                </div>
              </div>
            </div>
          </a>))}

    
      </div>
    </div>
  );
};

export default List;
