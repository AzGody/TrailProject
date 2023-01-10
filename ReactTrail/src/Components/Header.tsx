import * as React from "react"
import Navbar from "./Navbar";

export interface HeaderProps {

}

export default function Header(props: any) {

    return (

        <>
            <header className="relative">

                <a href={"/"}>
                    <img
                        className={"rounded-full absolute cursor-pointer top-0 left-1/2 z-10 drop-shadow transform -translate-x-1/2 -translate-y-1/2 transition duration-1000 ease-in-out  hover:scale-105"}
                        src="/logoFond.png" width={200} height={200} alt={"logo"}></img>
                </a>


                <div className={"bg-cover bg-center bg-no-repeat h-96"}
                     style={{backgroundImage: `url(${props.backgroundImage})`}}>


                    <div className=" p-9 z-10 text-center">

                        <p className="font-header text-[86px]  pt-24 leading-[60px] drop-shadow text-stone-50 text-4xl lg:text-7xl"> {props.namePage}</p>

                        <p className="font-bold mt-4 text-stone-50 text-lg"> {props.description}</p>

                        <p className="drop-shadow text-stone-50 ">{props.description2}</p>

                        <p className=" drop-shadow  text-stone-50"><span
                            className="text-2xl font-bold   drop-shadow">{props.nbCourses} </span> {props.description3}
                        </p>

                    </div>

                </div>
                <Navbar></Navbar>
            </header>

        </>
    )
}