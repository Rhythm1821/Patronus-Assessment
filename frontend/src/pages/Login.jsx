import { Navigate } from "react-router-dom"
import CustomForm from "../components/CustomForm"

const Login = () => {
    const token = localStorage.getItem('access_token')

    if (token) {
        console.log('You are already logged in');
        return <Navigate to={'/'} />
    }
    
    return (
            
            <CustomForm
            route={'/accounts/login/'}
            method={'login'} />
    )
}

export default Login