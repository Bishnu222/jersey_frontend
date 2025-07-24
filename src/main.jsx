import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppRouter from './routers/AppRouter.jsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Slide, ToastContainer } from 'react-toastify'
import AuthContextProvider from './auth/AuthProvider.jsx'
import { CartProvider } from './auth/CartContext.jsx';
import { NotificationProvider } from './notification/NotifiacationContext.jsx';
const queryClient= new QueryClient() 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
       <QueryClientProvider client={queryClient}>
        <CartProvider>
          <NotificationProvider userId={JSON.parse(localStorage.getItem('user'))?._id}>
            <AppRouter />
            <ToastContainer
              position='top-center'
              autoClose={2000}
              hideProgressBar={false}
              theme='dark'
              transition={Slide} // Bouce, slide,zoom,flip
            />
          </NotificationProvider>
        </CartProvider>
    </QueryClientProvider>
    </AuthContextProvider>
   
  
  </StrictMode>,
)
