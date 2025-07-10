import axios from "../api";

export const createUserApi = async (formData) => {
  const res = await axios.post("/admin/users", formData);
  return res.data; // return data only
};

export const getAllUserApi = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; // return data only
};

export const getUserByIdApi = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateUserApi = async ({ id, data }) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(`/admin/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteUserApi = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
