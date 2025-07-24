import api from "./api";

// Register user (send as JSON, not multipart/form-data)
export const registerUserApi = (formData) =>
  api.post("/auth/register", formData);

// Login user
export const loginUserApi = (data) =>
  api.post("/auth/login", data);

// Get user info by ID (protected route, token auto-attached)
export const getUserByIdApi = (id) =>
  api.get(`/users/${id}`).then(res => res.data.data || res.data);

// Update user info (with possible file upload)
export const updateUserApi = (id, formData) =>
  api.put(`/users/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then(res => res.data);
