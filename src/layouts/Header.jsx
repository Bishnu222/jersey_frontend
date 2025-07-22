import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import logo from '../assets/logo.jpg'
import './Header.css'

export default function Header() {
  const { user, logout } = useContext(AuthContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
              <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
                About Us
              </NavLink>
              {/* User avatar button only */}
              <button
                className="ml-6 flex items-center gap-2 px-3 py-2 rounded-full bg-white/20 hover:bg-white/40 text-white font-bold shadow"
                onClick={() => setSidebarOpen(true)}
                style={{ minWidth: 44 }}
              >
                <span className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-lg font-extrabold text-white">
                  {user?.username?.[0]?.toUpperCase() || <span>👤</span>}
                </span>
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
      {/* User Sidebar Drawer */}
      {user && (
        <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700"
            aria-label="Close sidebar"
          >
            &times;
          </button>
          <div className="flex flex-col items-center mt-24 gap-2 px-6">
            <button
              className="w-full py-2 rounded bg-red-500 hover:bg-red-700 text-white font-bold mt-2"
              onClick={() => { logout(); setSidebarOpen(false); }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
      {/* Overlay for sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setSidebarOpen(false)} />
      )}
    </header>
  )
}
