// @ts-nocheck - may need to be at the start of file
import "./index.css";
import { list } from "postcss";
import { useEffect, useState } from "react";

const UsersList = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/utilisateurs", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setUtilisateurs(response))
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
    if (utilisateurs.length != 0) {
      return <div className="admin-list grow flex items-center justify-center">
        <div className="admin-list-container">                
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Pseudo
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {utilisateurs.map(utilisateur =>
                      (
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {utilisateur.id}
                            </th>
                            <td class="px-6 py-4">
                              {utilisateur.pseudo}
                            </td>
                            <td class="px-6 py-4">
                              {utilisateur.email}
                            </td>  
                            <td class="px-6 py-4">
                              {utilisateur?.roles}
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

export default UsersList;
