import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppRouter from './routers/AppRouter.jsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Slide, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthContextProvider from './auth/AuthProvider.jsx'
import { CartProvider } from './auth/CartContext.jsx';
import { NotificationProvider } from './notification/NotifiacationContext.jsx';

const queryClient= new QueryClient() 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <AuthContextProvider>
       <QueryClientProvider client={queryClient}>
        <CartProvider>
          <NotificationProvider userId={JSON.parse(localStorage.getItem('user'))?._id}>
            <AppRouter />
          </NotificationProvider>
        </CartProvider>
    </QueryClientProvider>
    </AuthContextProvider>
   
  
  </StrictMode>,
)
