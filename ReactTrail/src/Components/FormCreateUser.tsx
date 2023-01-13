// @ts-nocheck - may need to be at the start of file
import React, {useState} from "react";
import { API_ROOT_URL } from "/src/main";

function FormCreateUser() {
    const [inputs, setInputs] = useState({});

    const [hidden, setHidden] = useState("hidden");


    const [message, setMessage] = useState("");

    const handleSubmit = (event: any) => {
        event.preventDefault();

        fetch(API_ROOT_URL+'/api/utilisateurs', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
            .then(response => response.json())
            .then(response => {
            if(response.detail === "email: This value is already used.")
            {
                setMessage("L'email est déjà utilisé !")
                setHidden("block mb-4 rounded-lg")
            }
            else{
                location.replace("/login")
            }
        })
            .catch(error => console.log(error))
    }

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    return (
        <div className="flex justify-center  lg:px-0 px-3">
            <form onSubmit={handleSubmit} className="bg-white w-2/5 rounded">
                <div  className={"bg-red-200 text-red-700 font-bold p-4" + " " + hidden}>
                    {message}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Identifiant
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="username" name={"pseudo"} type="text" placeholder="antoine_zebulon" required  minLength={3} maxLength={30}
                        value={inputs.pseudo || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="email" name={"email"} type="email" placeholder="antoine.zebulon@reactive-trail.fr" required
                        value={inputs.email || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="plainPassword">
                        Mot de passe
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="plainPassword" name={"plainPassword"} type="password" placeholder="******************" required minLength={8} maxLength={255}
                        value={inputs.plainPassword || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-center">
                    <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" type="submit" value="Créer un compte"/>
                </div>
            </form>
        </div>
    );
}

export default FormCreateUser;
