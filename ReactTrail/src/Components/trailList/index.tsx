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

  return (
    <div className="list">
      <div className="list-container">
        {courses.map(course=>
            (<a href={"/details"}>
            <div className="card">
              <div className="card-header">
                <img
                  src="https://www.belambra.fr/les-echappees/wp-inside/uploads/2019/12/perdu-randonnee-reflexes.jpg"
                  alt="rover"
                />
              </div>
              <div className="card-body">
                <h1>{course.nom}</h1>
                <h4>{new Date(course.date).toLocaleDateString('Fr-fr')}</h4>
                <h3>{course.localisation.nom}</h3>
               
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
