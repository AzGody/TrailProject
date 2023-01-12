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

  // const deleteCourse = () => {
  //   fetch(`http://127.0.0.1:8000/api/courses/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       Accept: "application/json",
  //       Autorization: "Bearer"
  //     },
  // })

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
                            <td className="px-6 py-4 text-center">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Modifier</a>
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Supprimer</a>
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
