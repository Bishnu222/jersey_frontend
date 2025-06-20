import {Navigate, Outlet} from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";

import React from 'react'

export default function AdminRoute() {

    const {admin, loading} = useContext(AuthContext)
    
    if(loading) return <>Loading</>

    if (admin) return <Navigate to="/" />


  return <Outlet />
  
}
