import { Outlet, Navigate } from 'react-router-dom'
import { isAdmin } from "./isAdmin";

const PrivateRoutes = () => {
    return(
        isAdmin() ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes