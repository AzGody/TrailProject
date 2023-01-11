import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Courses from './Pages/courses'
import Evenements from './Pages/evenements'
import Auth from './Pages/Auth'
import List from './Components/trailList'
import Details from './Components/trailDetails'
import './index.css'
import Footer from "./Components/footer";
import CreateUser from "./Pages/CreateUser";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
    path: "/details",
    element: <Details
        title="Trail en montagne à Saint-Étienne-de-Baïgorry"
        distance="25"
        startCity="Saint-Étienne-de-Baïgorry"
        arrivalCity="Saint-Étienne-de-Baïgorry"
        negativeElevation="200"
        positiveElevation="130"
        description="Le trail en montagne à Saint-Étienne-de-Baïgorry est une course à pied en nature qui se déroule sur des sentiers et chemins de montagne. Ce parcours de montagne offre de magnifiques panoramas sur les paysages environnants. Vous pourrez découvrir la région et ses richesses naturelles tout en vous dépassant physiquement. Le trail en montagne est une activité idéale pour les amateurs de plein air et de grands espaces. Si vous cherchez un défi physique et un moment de détente en pleine nature, le trail en montagne à Saint-Étienne-de-Baïgorry est fait pour vous."
    />
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} />
)

