// @ts-nocheck - may need to be at the start of file
import React, {useState} from "react";

function FormCreateUser() {
    const [inputs, setInputs] = useState({});

    const handleSubmit = (event: any) => {
        event.preventDefault();

        fetch('http://127.0.0.1:8000/api/utilisateurs', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
            .then(response => response.json())
            .then(response => console.log(JSON.stringify(response)))
            .catch(error => console.log(error))
    }

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    return (
        <div className="w-full lg:px-0 px-3">
            <form onSubmit={handleSubmit} className="bg-white  rounded">
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
                <div className="flex items-center justify-between">
                    <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" type="submit" value="Connexion"/>
                </div>
            </form>
        </div>
    );
}

export default FormCreateUser;
