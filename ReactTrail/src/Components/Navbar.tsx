import * as React from 'react'


export interface HeadermenuProps {

}

export default function HeaderMenu({ }: HeadermenuProps) {
    return (
        <div className={"bg-black p-2 "}>
            <ul className="flex text-center align-center">
                <li className="mr-6">
                    <a className="text-blue-500 hover:text-red-500" href="/">Accueil</a>
                </li>
                <li className="mr-6">
                    <a className="text-blue-500 hover:text-red-500" href="/courses">Courses</a>
                </li>
                <li className="mr-6">
                    <a className="text-blue-500 hover:text-red-500" href="/evenements">Evenements</a>
                </li>
                <li className="mr-6">
                    <a className="text-blue-500 hover:text-red-500" href="#">Connexion</a>
                </li>
            </ul>
        </div>



    )
}