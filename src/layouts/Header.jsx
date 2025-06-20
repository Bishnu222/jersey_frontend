import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import logo from '../assets/logo.png'
import './Header.css'

export default function Header() {
  const { user, logout } = useContext(AuthContext)

  return (
    <header>
      <div className="container">

        {/* Logo and Brand */}
        <div className="brand">
          <img src={logo} alt="Football Shirts Logo" className="logo" />
        </div>

        {/* Search Box */}
        <div className="search-box">
          <input type="text" placeholder="Explore the collection..." />
          <span className="search-icon">&#128269;</span>
        </div>

        {/* Navigation */}
        <nav>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Home
          </NavLink>

          {!user ? (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
                Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="#" onClick={logout}>
                Logout
              </NavLink>
            </>
          )}
        </nav>

        {/* Icons */}
        <div className="icon-buttons">
          <div className="hamburger" title="Menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="cart" title="Cart">&#128722;</div>
        </div>
      </div>
    </header>
  )
}
