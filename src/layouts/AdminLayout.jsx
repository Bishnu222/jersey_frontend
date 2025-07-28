import { useState, useContext, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import "./AdminLayout.css";
import adminImage from "../assets/football-admin.png";
import logo from "../assets/logo.jpg";

export default function AdminLayout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Initialize logged-in state from sessionStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("adminLoggedIn") === "true";
  });

  // Sync isLoggedIn state if sessionStorage changes externally
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(sessionStorage.getItem("adminLoggedIn") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const defaultAdmin = { username: "admin", password: "password" };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const { username, password } = credentials;

    // Basic client-side validation
    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password");
      return;
    }

    setLoading(true);

    // Simulate async login (e.g. call API here)
    setTimeout(() => {
      if (username === defaultAdmin.username && password === defaultAdmin.password) {
        setIsLoggedIn(true);
        sessionStorage.setItem("adminLoggedIn", "true");
        setError("");
      } else {
        setError("Invalid admin credentials");
      }
      setLoading(false);
    }, 700);
  };

  const handleLogout = () => {
    logout(navigate);
    setIsLoggedIn(false);
    sessionStorage.removeItem("adminLoggedIn");
    setCredentials({ username: "", password: "" });
    setError("");
  };

  const navLinks = [
    { to: "/admin/users", label: "Users" },
    { to: "/admin/product", label: "Products" },
    {to:"/admin/addProduct",label:"AddProduct"},
    { to: "/admin/category", label: "Categories" },
    { to: "/admin/category/create", label: "Create Category" },
    { to: "/admin/orders", label: "Orders" },
    { to: "#", label: "Logout", onClick: handleLogout },

    
  ];


  const renderNavLink = ({ to, label, onClick }) => (
    onClick ? (
      <button
        key={label}
        onClick={onClick}
        className="block text-white bg-red-600 hover:bg-red-700 w-full text-left p-3 rounded-lg font-semibold transition-colors mt-4"
      >
        {label}
      </button>
    ) : (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          `block ${isActive ? "text-red-600 font-semibold" : "text-black hover:text-red-500"}`
        }
        aria-current={({ isActive }) => (isActive ? "page" : undefined)}
      >
        {label}
      </NavLink>
    )
  );

  if (!isLoggedIn) {
    return (
      <div
        className="admin-login-fullpage"
        style={{
          background: `linear-gradient(135deg, #e0f7fa99 0%, #b2f7b899 100%), url(${adminImage}) center/cover no-repeat`,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Overlay for readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255,255,255,0.4)',
          zIndex: 1,
        }} />
        <form
          onSubmit={handleLogin}
          className="admin-login-box"
          autoComplete="off"
          aria-label="Admin login form"
          style={{
            background: 'rgba(255,255,255,0.97)',
            borderRadius: '1.5rem',
            boxShadow: '0 8px 32px 0 rgba(34,197,94,0.15)',
            padding: '2.5rem 2rem',
            minWidth: 350,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '2px solid #22c55e',
            zIndex: 2,
          }}
        >
          <h2 className="admin-login-title" style={{ color: '#000000' }}>Admin Login</h2>
          {error && <p className="admin-error" role="alert">{error}</p>}

          {/* Dummy inputs to prevent autofill */}
          <input type="text" name="dummy_user" style={{ display: "none" }} />
          <input type="password" name="dummy_pass" style={{ display: "none" }} />

          <input
            type="text"
            name="admin_user"
            placeholder="Enter username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            className="admin-input"
            required
            autoComplete="off"
            autoFocus
            aria-label="Admin username"
            style={{
              borderRadius: '0.75rem',
              border: '2px solid #22c55e',
              marginBottom: '1.2rem',
              padding: '0.9rem 1.2rem',
              fontSize: '1.1rem',
              width: '100%',
              outline: 'none',
              color: '#000000',
            }}
          />
          <input
            type="password"
            name="admin_pass"
            placeholder="Enter password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="admin-input"
            required
            autoComplete="new-password"
            aria-label="Admin password"
            style={{
              borderRadius: '0.75rem',
              border: '2px solid #22c55e',
              marginBottom: '1.2rem',
              padding: '0.9rem 1.2rem',
              fontSize: '1.1rem',
              width: '100%',
              outline: 'none',
              color: '#000000',
            }}
          />
          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
            aria-busy={loading}
            style={{
              background: '#22c55e',
              color: '#fff',
              borderRadius: '0.75rem',
              fontWeight: 700,
              fontSize: '1.1rem',
              padding: '0.9rem 1.2rem',
              width: '100%',
              marginTop: '0.5rem',
              boxShadow: '0 2px 8px 0 rgba(34,197,94,0.10)',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {loading ? (
              <span className="spinner" aria-hidden="true" /> // Add CSS spinner for better UX
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 shadow-lg p-8 admin-sidebar" style={{ background: 'linear-gradient(135deg, #e3f0ff 0%, #e6f4ea 100%)', color: '#22223b', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)' }}>
        <img src={logo} alt="Logo" className="admin-logo mb-6" style={{ width: 120, height: 70, objectFit: 'contain', borderRadius: '0.5rem', background: '#fff', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)' }} />
        <h2 className="text-xl font-bold mb-10 tracking-wide" style={{ color: '#22223b', letterSpacing: '1px', textAlign: 'center' }}>Admin Panel</h2>
        <nav className="flex flex-col gap-3 w-full" aria-label="Admin navigation">
          {navLinks.map(({ to, label, onClick }) => (
            renderNavLink({ to, label, onClick })
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header
          className="shadow-md px-6 py-4 flex justify-between items-center admin-header"
          role="banner"
        >
          {/* Removed Logout button from header */}
        </header>
        <main className="p-6 overflow-y-auto flex-1" role="main">
          <Outlet />
        </main>
        <footer className="text-center py-2 bg-gray-100 text-black" role="contentinfo">
          &copy; {new Date().getFullYear()} Jersey Hub. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
