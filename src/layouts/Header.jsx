import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import logo from '../assets/logo.jpg'
import './Header.css'
import NotificationDropdown from '../components/auth/NotificationDropDown';

export default function Header() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  const handleLogout = () => {
    logout(navigate)
    setMobileMenuOpen(false)
  }

  return (
    <header>
      <div className="container" style={{ position: 'relative' }}>
        {/* Logo and Brand */}
        <div className="Logo">
          <img src={logo} alt="Football Shirts Logo - Jersey Hub" className="logo" />
        </div>
        {/* Remove search box from header */}
        {/* Navigation */}
        <nav className={mobileMenuOpen ? "nav active" : "nav"}>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
            Home
          </NavLink>
          {user ? (
            <>
              <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
                Products
              </NavLink>
              <NavLink to="/normal/cart" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
                Cart
              </NavLink>
              <NavLink to="/normal/dashboard" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
                Profile
              </NavLink>
              <NavLink to="/normal/order" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
                My Orders
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
                About Us
              </NavLink>
              <NotificationDropdown userId={user._id} />
              <button className="logout-button" onClick={() => { handleLogout(); }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
      {/* Remove user sidebar drawer and overlay */}
    </header>
  )
}
