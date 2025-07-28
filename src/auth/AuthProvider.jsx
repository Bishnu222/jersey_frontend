import { createContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext=createContext()

const AuthContextProvider=({children}) =>{
    const [user,setUser]=useState(null)
    const [ loading, setLoading ] = useState(true)

    const login=(userData,token) =>{
        localStorage.setItem("token",token)
        localStorage.setItem("user",JSON.stringify(userData))
        setUser(userData)
        setLoading(false) // Ensure loading is set to false after login
    }
    const logout=(navigate) =>{
        setLoading(true)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
        // Navigate to home page after logout if navigate function is provided
        if (navigate) {
            navigate("/")
        }
    }
    useEffect(() =>{
        const token =localStorage.getItem("token")
        const storedUser=localStorage.getItem("user")
        if(token && storedUser){
            setUser(JSON.parse(storedUser))
        }else{
            logout()
        }
        setLoading(false)
    },[]
)
 return (
    <AuthContext.Provider
    value={{user,login,loading,logout,isAuthenticated: user !==null}}
    >
        {children}
    </AuthContext.Provider>
 )
}
export default AuthContextProvider