import React, {useState} from "react";
import {Transition} from "@headlessui/react";

function FormAuth() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="w-full lg:px-0 px-3">
            <form className="bg-white  rounded">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Identifiant
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="username" type="email" placeholder="antoine.zebulon@reactive-trail.fr" required/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Mot de passe
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="password" type="password" placeholder="******************" required/>

                </div>
                <div className="flex items-center justify-between">
                    <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Connexion"/>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                       href="/createUser">
                        Pas de compte ?
                    </a>
                </div>
            </form>

        </div>
    );
}

export default FormAuth;
