import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../../services/authProvider"

export default () => {
    const { user } = useAuth()
    if (user == null) return <Navigate to="/auth" />
    return user.loading ? <div>
        <span>Loading...</span>
    </div> : <Outlet />
}