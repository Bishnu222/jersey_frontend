import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import { AuthContext } from '../auth/AuthProvider'

export default function Login() {
    const { user } = useContext(AuthContext)
    let navigate = useNavigate()

    const returnToHome = (event) => {
        event.preventDefault()
        navigate("/")
    }

    if (user) {
        return (
            <div className="already-logged-in">
                <p>You are already logged in.</p>
                <button onClick={returnToHome}>Return to Home</button>
            </div>
        )
    }
       return (
            <div className="login-page">
                <NavLink to="/">Go back</NavLink> | <Link to="/register">Register</Link>
    
                <LoginForm />
            </div>
        )

   
}
