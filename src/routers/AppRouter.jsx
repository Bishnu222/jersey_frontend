import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Login from '../pages/Login'
import MainLayout from '../layouts/MainLayout'
import StateManage from '../pages/StateManage'
import LoginTest from '../pages/StateeManage'
import Register from '../pages/Register'
import GuestRoute from './GuestRoute'
import NormalUserRoute from './NormalUserRoute'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/state-test' element={<StateManage />}></Route>
            
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Homepage />}></Route>
                    <Route element={<GuestRoute />}>
                    <Route path="/login" element={<Login />}></Route>


                    <Route path="/register" element={<Register />}></Route>

                    </Route>

                   
                </Route>

                
                    <Route path='/normal/*' element={<NormalUserRoute />}> 

                        <Route path = 'order' element={<>My Order</>}></Route>
                        <Route path = 'cart' element={<>My Cart</>}></Route>
                        <Route path = '*' element={<>404 Not Found</>}></Route>
                    </Route>

                   <Route path='/admin/*'>
                         <Route element={<MainLayout/>}>
                         <Route path="dashboard" element= {<>Admin Dashboard</>}></Route>
                        <Route path="users" element= {<>Admin Users</>}></Route>
                        <Route path="category" element= {<>Admin Category</>}></Route>
                          <Route path="product" element= {<>Admin Product</>}></Route>
                    </Route>
                </Route>
                    
                    

            </Routes>


        </BrowserRouter>
    )
}

// task
//in login page
// make 2 link
// go back- routes to homepage
//register 