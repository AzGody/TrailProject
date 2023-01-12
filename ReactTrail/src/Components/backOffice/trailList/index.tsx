// @ts-nocheck - may need to be at the start of file
import "./index.css";
import { list } from "postcss";
import { useEffect, useState } from "react";

const BOList = () => {
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

  const deleteCourse = (id) => {
    fetch(`http://127.0.0.1:8000/api/courses/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("JWT")
        },
    }).then((response) => response.json())
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
}

  function AllCourses() {
    if (courses.length != 0) {
      return <div className="admin-list grow flex items-center justify-center">
        <div className="admin-list-container">                
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                              ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nom
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Localisation
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Distance
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Dénivelé P
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Dénivelé N
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Evenement
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {courses.map(course =>
                      (
                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {course.id}
                            </th>
                            <td className="px-6 py-4">
                              {course.nom}
                            </td>
                            <td className="px-6 py-4">
                              {course.date}
                            </td>
                            <td className="px-6 py-4">
                              {course?.localisation?.nom}
                            </td>
                            <td className="px-6 py-4">
                              {course.distance}
                            </td>
                            <td className="px-6 py-4">
                              {course.denivelePositif}
                            </td>
                            <td className="px-6 py-4">
                              {course.deniveleNegatif}
                            </td>
                            <td className="px-6 py-4">
                              {/* {course?.evenement?.nom} */}
                            </td>
                            <td className="px-6 py-4 flex">
                              <a href={"/admin/courses/" + course.id}
                                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                                  </svg>
                              </a>
                              <button type="button"
                                      onClick={e => deleteCourse(course.id)}
                                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                  </svg>
                              </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>;
    }
    else {
      return (
        <div className="admin-list">
          <div className="admin-list-container">
            Aucune course n'est disponibe pour le moment
          </div>
        </div>
      )
    }
  }
 return (<AllCourses></AllCourses>)
};

export default BOList;
