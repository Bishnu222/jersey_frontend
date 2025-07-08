import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import GuestRoute from './GuestRoute'
import NormalUserRoute from './NormalUserRoute'
import ProductManagement from '../pages/admin/ProductManagement'
import AdminLayout from '../layouts/AdminLayout.jsx'
import MainLayout from '../layouts/MainLayout'
import CreateCategory from '../pages/admin/CreateCategory'
import CategoryManagement from '../pages/admin/CategoryManagement'
import ViewCategory from '../pages/admin/ViewCategory'
import UpdateCategory from '../pages/admin/UpdateCategory'
import CreateUserForm from '../pages/admin/CreateUser.jsx'
import AddProducts from '../pages/admin/AddProduct'
import UserManagement from '../pages/admin/UserManagement'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/state-test' element={<StateManage />} />

        <Route element={<MainLayout />}>
          <Route path='/' element={<Homepage />} />
          <Route element={<GuestRoute />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Route>

        <Route path='/normal/*' element={<NormalUserRoute />}>
          <Route path='order' element={<>My Order</>} />
          <Route path='cart' element={<>My Cart</>} />
          <Route path='*' element={<>404 Not Found</>} />
        </Route>

        <Route path='/admin' element={<AdminLayout />}>
          <Route path='products' element={<ProductManagement />} />
          <Route path="addproduct" element={<AddProducts />} />
          <Route path='category' element={<CategoryManagement />} />
          <Route path='category/create' element={<CreateCategory />} />
          <Route path='category/:id' element={<ViewCategory />} />
          <Route path="user/create" element={<CreateUserForm />} />
          <Route path="user" element={<UserManagement />} />
          <Route path='category/:id/edit' element={<UpdateCategory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
