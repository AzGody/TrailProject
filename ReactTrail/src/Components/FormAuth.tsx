// @ts-nocheck - may need to be at the start of file
import React, {useState} from "react";

function FormAuth() {

    const [inputs, setInputs] = useState({});


    const [hidden, setHidden] = useState("hidden");


    const [message, setMessage] = useState("");

    const handleSubmit = (event: any) => {
        event.preventDefault();

        console.log(inputs)

        fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
            .then(response => response.json())
            .then(response => {
                if(response.code === 401)
                {
                    setMessage(response.message)
                    setHidden("block mb-4 rounded-lg")
                }
                else{
                    console.log(response)
                    sessionStorage.setItem("JWT", response.token)
                    location.replace("/")
                }
            })
            .catch(error => console.log(error))

    }

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    return (
        <div className="flex justify-center lg:px-0 px-3">
            <form onSubmit={handleSubmit} className="bg-white  rounded">
                <div  className={"bg-red-200 text-red-700 font-bold p-4" + " " + hidden}>
                    {message}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="email" name="email" type="email" placeholder="antoine.zebulon@reactive-trail.fr"
                        value={inputs.email || ""}
                        onChange={handleChange} required/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Mot de passe
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="password" name="password" type="password" placeholder="******************"
                        value={inputs.password || ""}
                        onChange={handleChange} required/>

                </div>
                <div className="flex items-center justify-between">
                    <input
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                        type="submit" value="Connexion"/>
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
