import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Courses from './Pages/courses'
import Evenements from './Pages/evenements'
import Footer from './Components/trailList'
// import './index.css'

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
    element: <Footer />
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)

