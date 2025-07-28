import React, { useState } from "react";
import { useAdminUser, useDeleteUser } from "../../hooks/admin/useAdminUser";
import { Link } from "react-router-dom";
import { User, Mail, Shield, Trash2, Plus, Search, Filter } from "lucide-react";
import "./UserTable.css";

export default function UserTable() {
  const { users, error, isLoading, isError } = useAdminUser();
  const deleteUserMutation = useDeleteUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(id);
    }
  };

  // Filter users based on search and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (isLoading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading users...</p>
    </div>
  );
  
  if (isError) return (
    <div className="error-container">
      <p>Error: {error.message}</p>
    </div>
  );

  return (
    <div className="user-table-container">
      <div className="user-table-header">
        <div className="header-left">
          <h2>User Management</h2>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <Filter size={18} />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon users">
            <User size={20} />
          </div>
          <div className="stat-content">
            <h3>{users.length}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon regular-users">
            <User size={20} />
          </div>
          <div className="stat-content">
            <h3>{users.filter(u => u.role === 'user').length}</h3>
            <p>Regular Users</p>
          </div>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="empty-state">
          <User size={48} />
          <h3>No users found</h3>
          <p>{searchTerm || roleFilter !== "all" ? "Try adjusting your search or filters" : "Get started by adding your first user"}</p>
        </div>
      ) : (
        <div className="user-grid">
          {filteredUsers.map((user) => (
            <div key={user._id} className="user-card">
              <div className="user-avatar">
                <div className={`avatar ${user.role === "admin" ? "admin" : "user"}`}>
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className={`role-badge ${user.role === "admin" ? "admin" : "user"}`}>
                  {user.role === "admin" ? <Shield size={12} /> : <User size={12} />}
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </div>
              </div>
              
              <div className="user-info">
                <h3>{user.username}</h3>
                <div className="user-email">
                  <Mail size={14} />
                  <span>{user.email}</span>
                </div>
                <div className="user-meta">
                  <span className="user-id">ID: {user._id.slice(-6)}</span>
                </div>
              </div>

              <div className="user-actions">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="action-btn delete"
                  disabled={deleteUserMutation.isLoading}
                  title="Delete user"
                >
                  <Trash2 size={16} />
                  {deleteUserMutation.isLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
