import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";

export const getAllProductApi = (params) => {
  return axios.get(`${BASE_URL}/api/admin/product`, { params });
};

export const createProductApi = (formData) => {
  return axios.post(`${BASE_URL}/api/admin/product`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteOneProductApi = (id) => {
  if (!id) throw new Error("Product ID is required");
  return axios.delete(`${BASE_URL}/api/admin/product/${id}`);
};

export const updateProductApi = (id, data) => {
  if (!id) throw new Error("Product ID is required");
  return axios.put(`${BASE_URL}/api/admin/product/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};