// @ts-nocheck - may need to be at the start of file
import './style.css'
import Header from '../../Components/Header'
import Footer from '../../Components/footer'
import List from '../../Components/trailList'
import { useEffect, useState } from 'react'
import { Collapse } from 'react-collapse'

const Courses = () => {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <Header
        backgroundImage="/course.png"
        namePage="Créer une course"
        description="Saisissiez le formulaire pour créer une course :"
      />
      <div className={'container mx-auto py-10'}>
        <div className="flex items-center justify-center w-full text-2xl">
          Voici la liste des courses disponibles
          <button
            onClick={(event) => {
              event.preventDefault()
              setVisible(!visible)
            }}
            type="button"
            className="self-end text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 ml-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
          >
            Filtrer
          </button>
        </div>
        <Collapse isOpened={visible}>
          <div className="border-2 p-7 rounded-lg">
            <form>
              <div className="text-xl my-1.5">
                Filtrage par fourchette de dates :
              </div>
              <div className="flex my-1.5">
                <div>Début</div>
                <input name="dateMin" type="date"></input>
                <div>Fin</div>
                <input name="dateMax" type="date"></input>
              </div>
              <div className="text-xl">
                Filtrage par fourchette de distances en km :
              </div>
              <div className="flex my-1.5">
                <div>Minimum :</div>
                <input
                  name="distMin"
                  type="number"
                  className='w-2/12 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
                ></input>
                <div>Maximum :</div>
                <input
                  name="distMax"
                  type="number"
                  className='w-2/12 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
                ></input>
              </div>
              <div className="text-xl my-1.5">Rechercher un nom :</div>
              <input
                type="text"
                name="query"
                className='my-1.5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
              ></input>
              <div className="flex content-between">
                <div></div>
                <button
                  type="submit"
                  value="Envoyer"
                  className="my-1.5 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                  href="http://127.0.0.1:5173/createCourse"
                >
                  Appliquer
                </button>
              </div>
            </form>
          </div>
        </Collapse>
        <List />
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Courses
