import React, { useState } from "react";
import { useAdminUser, useDeleteUser } from "../../hooks/admin/useAdminUser";
import DeleteModel from "../DeleteModel";
import { Link } from "react-router-dom";
import './UserTable.css'; // Importing external CSS

export default function UserTable() {
    const { users, error, isLoading, isError } = useAdminUser();
    const [deleteId, setDeleteId] = useState(null);
    const deleteUserMutation = useDeleteUser();

    const handleConfirmDelete = () => {
        deleteUserMutation.mutate(deleteId, {
            onSuccess: () => setDeleteId(null),
            onError: (err) => alert(err.message || "Failed to delete user"),
        });
    };

    return (
        <div className="user-table-container">
            <div className="user-table-header">
                <h2>Users</h2>
                <Link to="/admin/user/create">
                    <button className="add-user-btn">Add User</button>
                </Link>
            </div>

            {isLoading && <p className="info-text">Loading users...</p>}
            {isError && <p className="error-text">Error: {error.message}</p>}

            {users.length === 0 ? (
                <p className="info-text text-center">No users found.</p>
            ) : (
                <div className="user-grid">
                    {users.map((user) => (
                        <div key={user._id} className="user-card">
                            <div className="user-info">
                                <h3>{user.username}</h3>
                                <p>{user.email}</p>
                                <p className={`user-role ${user.role === "admin" ? "admin-role" : "user-role-text"}`}>
                                    Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </p>
                            </div>
                            <div className="user-actions">
                                <Link to={`/admin/user/${user._id}`} className="action-btn view">
                                    View
                                </Link>
                                <Link to={`/admin/user/${user._id}/edit`} className="action-btn edit">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => setDeleteId(user._id)}
                                    className="action-btn delete"
                                >
                                    {deleteUserMutation.isLoading && deleteId === user._id
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {deleteId && (
                <DeleteModel
                    onClose={() => setDeleteId(null)}
                    onConfirm={handleConfirmDelete}
                    message="Are you sure you want to delete this user?"
                />
            )}
        </div>
    );
}
