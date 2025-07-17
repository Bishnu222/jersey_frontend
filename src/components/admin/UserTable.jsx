import React from "react";
import { useAdminUser, useDeleteUser } from "../../hooks/admin/useAdminUser";
import { Link } from "react-router-dom";
import "./UserTable.css";

export default function UserTable() {
  const { users, error, isLoading, isError } = useAdminUser();
  const deleteUserMutation = useDeleteUser();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(id);
    }
  };

  if (isLoading) return <p className="info-text">Loading users...</p>;
  if (isError) return <p className="error-text">Error: {error.message}</p>;

  return (
    <div className="user-table-container">
      <div className="user-table-header">
        <h2>Users</h2>
        <Link to="/admin/user/create">
          <button className="add-user-btn">Add User</button>
        </Link>
      </div>

      {users.length === 0 ? (
        <p className="info-text text-center">No users found.</p>
      ) : (
        <div className="user-grid">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <div className="user-info">
                <h3>{user.username}</h3>
                <p>{user.email}</p>
                <p
                  className={`user-role ${
                    user.role === "admin" ? "admin-role" : "user-role-text"
                  }`}
                >
                  Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
              </div>

              <div className="user-actions">
                {/* View button - navigates to user details page */}
                <Link to={`/admin/user/${user._id}`} className="action-btn view">
                  View
                </Link>

                {/* Edit button - navigates to user edit page */}
                <Link
                  to={`/admin/user/${user._id}/edit`}
                  className="action-btn edit"
                >
                  Edit
                </Link>

                {/* Delete button - immediate delete with confirmation */}
                <button
                  onClick={() => handleDelete(user._id)}
                  className="action-btn delete"
                  disabled={deleteUserMutation.isLoading}
                >
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
