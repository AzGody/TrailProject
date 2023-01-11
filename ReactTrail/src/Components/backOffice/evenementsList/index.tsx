// @ts-nocheck - may need to be at the start of file
import "./index.css";
import { list } from "postcss";
import { useEffect, useState } from "react";

const BOEvent = () => {
  const [evenements, setEvenements] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/evenements", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setEvenements(response))
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
    if (evenements.length != 0) {
      return <div className="admin-list grow flex items-center justify-center">
        <div className="admin-list-container">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                        ID
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Nom
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Localisation
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Date début
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Date fin
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Courses
                      </th>
                      <th scope="col" class="px-6 py-3 text-center">
                          Actions
                      </th>
                  </tr>
              </thead>
              <tbody>
              {evenements.map(evenement =>
                (
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {evenement.id}
                      </th>
                      <td class="px-6 py-4">
                        {evenement.nom}
                      </td>
                      <td class="px-6 py-4">
                        {evenement?.localisation?.nom}
                      </td>
                      <td class="px-6 py-4">
                        {evenement.dateDebut}
                      </td>
                      <td class="px-6 py-4">
                        {evenement.dateFin}
                      </td>
                      <td class="px-6 py-4">
                        {evenement?.courses?.nom}
                      </td>
                      <td class="px-6 py-4 text-center">
                          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Modifier</a>
                          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Supprimer</a>
                      </td>
                  </tr>
                ))}
              </tbody>
          </table>
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

export default BOEvent;
