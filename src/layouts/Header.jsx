import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import logo from '../assets/logo.jpg'
import './Header.css'

export default function Header() {
  const { user, logout } = useContext(AuthContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  return (
    <header>
      <div className="container">

        {/* Logo and Brand */}
        <div className="Logo">
          <img src={logo} alt="Football Shirts Logo - Jersey Hub" className="logo" />
        </div>

        {/* Search Box */}
        <div className="search-box">
          <input
            type="search"
            placeholder="Explore the collection..."
            aria-label="Search orders, products, customers"
          />
          <span className="search-icon" aria-hidden="true">&#128269;</span>
        </div>

        {/* Navigation */}
        <nav className={mobileMenuOpen ? "nav active" : "nav"}>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
            Home
          </NavLink>

          {!user ? (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
                Register
              </NavLink>
            </>
          ) : (
            <>
              <button className="logout-button" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
