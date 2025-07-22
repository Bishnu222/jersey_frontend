import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import GuestRoute from './GuestRoute';
import NormalUserRoute from './NormalUserRoute';
import ProductManagement from '../pages/admin/ProductManagement';
import AdminLayout from '../layouts/AdminLayout.jsx';
import MainLayout from '../layouts/MainLayout';
import CreateCategory from '../pages/admin/CreateCategory';
import CategoryManagement from '../pages/admin/CategoryManagement';
import ViewCategory from '../pages/admin/ViewCategory';
import UpdateCategory from '../pages/admin/UpdateCategory';
import CreateUserForm from '../pages/admin/CreateUser.jsx';
import AddProducts from '../pages/admin/AddProduct';
import Notifications from "../pages/Notification";
import UserManagement from '../pages/admin/UserManagement';
import Order from '../pages/Order';
import AdminOrdersPage from '../pages/admin/AdminOrdersPage';
import UserDashboard from '../pages/UserDashboard';
import Products from '../pages/Products';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Homepage />} />
          <Route path='/products' element={<Products />} />
          <Route element={<GuestRoute />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Route>

        <Route path='/normal/*' element={<NormalUserRoute />}>
          <Route path='dashboard' element={<UserDashboard />} />
          <Route path='order' element={<Order />} />
          <Route path="notification" element={<Notifications />} />
          <Route path='*' element={<>404 Not Found</>} />
        </Route>

        <Route path='/admin' element={<AdminLayout />}>
          <Route path='product' element={<ProductManagement />} />
          <Route path='addproduct' element={<AddProducts />} />
          <Route path='category' element={<CategoryManagement />} />
          <Route path='category/create' element={<CreateCategory />} />
          <Route path='category/:id' element={<ViewCategory />} />
          <Route path='category/:id/edit' element={<UpdateCategory />} />
          <Route path='users' element={<UserManagement />} />
          <Route path='users/create' element={<CreateUserForm />} />

          <Route path='orders' element={<AdminOrdersPage />} />
        </Route>

        {/* Optional global 404 */}
        <Route path='*' element={<>404 Page Not Found</>} />
      </Routes>
    </BrowserRouter>
  );
}
