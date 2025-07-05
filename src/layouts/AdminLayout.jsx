import { useState, useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import "./AdminLayout.css";
import adminImage from "../assets/admin.jpg";
import logo from "../assets/logo.jpg";

export default function AdminLayout() {
  const { logout } = useContext(AuthContext);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("adminLoggedIn") === "true";
  });

  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const defaultAdmin = { username: "admin", password: "admin123" };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = credentials;

    if (username === defaultAdmin.username && password === defaultAdmin.password) {
      setIsLoggedIn(true);
      setError("");
      sessionStorage.setItem("adminLoggedIn", "true");
    } else {
      setError("Invalid admin credentials");
    }
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    sessionStorage.removeItem("adminLoggedIn");
    setCredentials({ username: "", password: "" });
    setError("");
  };

  const renderNavLink = (to, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block ${isActive ? "text-red-600 font-semibold" : "text-black hover:text-red-500"}`
      }
    >
      {label}
    </NavLink>
  );

  if (!isLoggedIn) {
    return (
      <div className="admin-login-fullpage">
        <img src={adminImage} alt="Admin" className="admin-image" />
        <form onSubmit={handleLogin} className="admin-login-box" autoComplete="off">
          <h2 className="admin-login-title">Admin Login</h2>
          {error && <p className="admin-error">{error}</p>}

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
          />
          <button type="submit" className="admin-login-btn">
            Login
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
        <nav className="flex flex-col space-y-3">
          {renderNavLink("/admin/users", "Users")}
          {renderNavLink("/admin/product", "Products")}
          {renderNavLink("/admin/category", "Categories")}
          {renderNavLink("/admin/category/create", "Create Category")}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="shadow-md px-6 py-4 flex justify-between items-center admin-header">
          <span className="text-lg font-medium">Welcome, Admin</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white rounded transition"
            style={{ backgroundColor: "#009688" }}
          >
            Logout
          </button>
        </header>

        <main className="p-6 overflow-y-auto flex-1">
          <Outlet />
        </main>

        <footer className="text-center py-2 bg-gray-100">
          &copy; {new Date().getFullYear()} Boot's Buy. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
