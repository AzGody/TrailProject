import ReactDOM from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import App from './App'
import Courses from './Pages/courses'
import Evenements from './Pages/evenements'
import Auth from './Pages/Auth'
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
import PrivateRoutes from "./utils/PrivateRoutes";
import Calendrier from "./Components/calendrier";

export const API_ROOT_URL = "http://127.0.0.1:8000";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<App/>} path={"/"}></Route>
            <Route element={<Courses/>} path={"/courses"}></Route>
            <Route element={<Details/>} path={"/courses/:id"}></Route>
            <Route element={<Evenements/>} path={"/evenements"}></Route>
            <Route element={<EventDetails/>} path={"/evenements/:id"}></Route>
            <Route element={<Calendrier/>} path={"/mes-courses"}></Route>

            <Route element={<Auth/>} path={"/login"}></Route>
            <Route element={<CreateUser/>} path={"/register"}></Route>

            <Route element={<PrivateRoutes/>}>
                <Route element={<BackOffice/>} path={"/admin"}></Route>
                <Route element={<BackOfficeCourses/>} path={"/admin/courses"}></Route>
                <Route element={<BackOfficeEvenements/>} path={"/admin/evenements"}></Route>
                <Route element={<BackOfficeUtilisateurs/>} path={"/admin/utilisateurs"}></Route>
                <Route element={<CreateCourse/>} path={"/admin/courses/create"}></Route>
                <Route element={<CreateCourse/>} path={"/admin/courses/edit/:id"}></Route>
                <Route element={<CreateEvenement/>} path={"/admin/evenements/create"}></Route>
                <Route element={<CreateEvenement/>} path={"/admin/evenements/edit/:id"}></Route>
            </Route>

            <Route element={<Page404/>} path={"*"}></Route>
        </>
    )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router}/>
)

