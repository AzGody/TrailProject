import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Courses from './Pages/courses'
import Evenements from './Pages/evenements'
import Auth from './Pages/Auth'
import List from './Components/trailList'
import Details from './Components/trailDetails'
import './index.css'
import CreateCourse from "./Pages/creationCourse";
import CreateEvenement from "./Pages/creationEvenement";
import CreateUser from "./Pages/CreateUser";
import Page404 from './Pages/404'
import EventDetails from './Components/eventDetails'
import BackOffice from "./Pages/BackOffice";
import BackOfficeEvenements from "./Pages/BackOffice/Evenement";
import BackOfficeCourses from "./Pages/BackOffice/Courses";
import BackOfficeUtilisateurs from "./Pages/BackOffice/Utilisateurs";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />
  },
  {
    path: "/evenements",
    element: <Evenements />,
  },
  {
    path: "/courses",
    element: <Courses />
  },
  {
    path: "/list",
    element: <List />
  },
  {
    path: "/auth",
    element: <Auth />
  },
  {
    path: "/createUser",
    element: <CreateUser />
  },
  {
    path: "/createCourse",
    element: <CreateCourse />
  },
  {
    path: "/createEvenement",
    element: <CreateEvenement />
  },
  {
    path: "/courses/:id",
    element: <Details/>
  },
  {
    path: "/evenement/:id",
    element: <EventDetails/>
  },
  {
    path: "/admin",
    element: <BackOffice/>
  },
  {
    path: "/admin/evenements",
    element: <BackOfficeEvenements/>
  },
  {
    path: "/admin/courses",
    element: <BackOfficeCourses/>
  },
  {
    path: "/admin/utilisateurs",
    element: <BackOfficeUtilisateurs/>
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} />
)

