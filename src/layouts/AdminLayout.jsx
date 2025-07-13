import { useState, useContext, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import "./AdminLayout.css";
import adminImage from "../assets/admin.jpg";
import logo from "../assets/logo.jpg";

export default function AdminLayout() {
  const { logout } = useContext(AuthContext);

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
    logout();
    setIsLoggedIn(false);
    sessionStorage.removeItem("adminLoggedIn");
    setCredentials({ username: "", password: "" });
    setError("");
  };

  const navLinks = [
    { to: "/admin/users", label: "Users" },
    { to: "/admin/product", label: "Products" },
    { to: "/admin/category", label: "Categories" },
    { to: "/admin/category/create", label: "Create Category" },
    
  ];


  const renderNavLink = ({ to, label }) => (
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
  );

  if (!isLoggedIn) {
    return (
      <div className="admin-login-fullpage">
        <img src={adminImage} alt="Admin" className="admin-image" />
        <form
          onSubmit={handleLogin}
          className="admin-login-box"
          autoComplete="off"
          aria-label="Admin login form"
        >
          <h2 className="admin-login-title">Admin Login</h2>
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
          />
          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
            aria-busy={loading}
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
      <aside className="w-64 shadow-lg p-4 admin-sidebar">
        <img src={logo} alt="Logo" className="admin-logo" />
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-3" aria-label="Admin navigation">
          {navLinks.map(renderNavLink)}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header
          className="shadow-md px-6 py-4 flex justify-between items-center admin-header"
          role="banner"
        >
          <span className="text-lg font-medium">Welcome, Admin</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white rounded transition"
            style={{ backgroundColor: "#009688" }}
          >
            Logout
          </button>
        </header>

        <main className="p-6 overflow-y-auto flex-1" role="main">
          <Outlet />
        </main>

        <footer className="text-center py-2 bg-gray-100" role="contentinfo">
          &copy; {new Date().getFullYear()} Jersey Hub. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
