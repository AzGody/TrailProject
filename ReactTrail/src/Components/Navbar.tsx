// @ts-nocheck - may need to be at the start of file
import React, {useEffect, useState} from "react";
import {Transition} from "@headlessui/react";
import jwt_decode from "jwt-decode";
import {redirect} from "react-router-dom";
import {isAdmin} from "../utils/isAdmin";

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    const token = sessionStorage.getItem("JWT")

    useEffect(() => {
        if (token !== null) {
            const decoded = jwt_decode(token);

            setMessage(decoded.pseudo + " est connecté")
        }
    }, [message])

    const logOutUser = () => {
        sessionStorage.removeItem("JWT")
        location.replace("/")
    }

    const goCourseFavorites = () => {
        location.replace("/goCourseFavorites")
    }


    return (
        <div>
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="hidden md:block">
                                <div className="ml-10">
                                    <a
                                        href="/"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Accueil
                                    </a>

                                    <a
                                        href="/courses"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Courses
                                    </a>

                                    <a
                                        href="/evenements"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Evenements
                                    </a>
                                    {
                                        isAdmin() ?
                                            <a
                                                href="/admin"
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                Dashboard
                                            </a> : null
                                    }
                                </div>
                            </div>


                            {token === null ?
                                <a
                                    href={"/login"}
                                    className="text-green-600 hover:bg-green-200 hover:text-green-900 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Connexion
                                </a> :
                                <>
                                    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            type="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                        {message}
                                        <svg className="w-4 h-4 ml-2"
                                             aria-hidden="true"
                                             fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>

                                    <div id="dropdown"
                                         className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="dropdownDefaultButton">
                                            <button
                                                className="mb-2 w-full text-gray-300 hover:bg-gray-700 hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium"
                                                onClick={goCourseFavorites}>Courses favorites
                                            </button>
                                            <button
                                                className="w-full text-red-600 hover:bg-red-200 hover:text-red-900 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                                                onClick={logOutUser}>Déconnexion
                                            </button>

                                        </ul>
                                    </div>
                                </>

                            }
                        </div>
                        <div className="justify-end flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {(ref) => (
                        <div className="md:hidden" id="mobile-menu">
                            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <a
                                    href="/"
                                    className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Accueil
                                </a>

                                <a
                                    href="/courses"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Courses
                                </a>

                                <a
                                    href="/evenements"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Evenements
                                </a>

                                <a
                                    href="/login"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Connexion
                                </a>
                            </div>
                        </div>
                    )}
                </Transition>
            </nav>
        </div>
    );
}

export default Nav;
