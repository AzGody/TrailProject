// @ts-nocheck - may need to be at the start of file
import "./index.css";
import { list } from "postcss";
import { useEffect, useState } from "react";
import { API_ROOT_URL } from "/src/main";

const UsersList = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);

  useEffect(() => {
    fetch(API_ROOT_URL+"/api/utilisateurs", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("JWT")
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
  //   fetch(API_ROOT_URL+`/api/courses/${id}`, {
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
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Pseudo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {utilisateurs.map(utilisateur =>
                      (
                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {utilisateur.id}
                            </th>
                            <td className="px-6 py-4">
                              {utilisateur.pseudo}
                            </td>
                            <td className="px-6 py-4">
                              {utilisateur.email}
                            </td>  
                            <td className="px-6 py-4">
                              {utilisateur.roles.map(role => <div>{role}</div>)}
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
