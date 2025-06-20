import {Navigate, Outlet} from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";

import React from 'react'

export default function AdminUserRoute() {
    const { admin, loading} = useContext(AuthContext)

    if(loading) return <>Loading</>

    if(!admin) return <Navigate to ="/login" replace />

    // replace will note save history

    if(admin.role !=="normal") return <Navigate to ="/" replace />

    return <Outlet />



  return (
    <div>AdminUserRoute</div>
  )
}
