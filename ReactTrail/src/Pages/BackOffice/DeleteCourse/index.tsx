import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {API_ROOT_URL} from "../../../main";

const DeleteCourse = () => {

    const [course, setCourse] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        fetch(API_ROOT_URL+`/api/courses/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => setCourse(response))
            .catch((error) => console.log(error));
    }, []);

    const handleClick = (courseId) => {
        fetch(API_ROOT_URL+`/api/courses/${courseId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("JWT")
            },
        }).then((response) => {
            console.log(response)
            location.replace("/admin/courses")
        }).catch((error) => console.log(error));
    }

  return (
      <div className="relative w-full h-screen bg-white flex items-center shadow dark:bg-gray-700">
          <div className="p-6 text-center grow">
              <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Êtes-vous sûr de vouloir supprimer la course "{course.nom}" ?
              </h3>
              <button onClick={e => handleClick(course.id)} type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                  Oui
              </button>
              <button onClick={e => { history.back() } } type="button"
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                  Annuler
              </button>
          </div>
      </div>
  )
}

export default DeleteCourse;