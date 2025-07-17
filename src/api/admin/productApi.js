import axios from "../api";

// GET all products
export const getAllProductApi = (params) =>
  axios.get("/admin/product", { params });

// CREATE a product
export const createProductApi = (data) =>
  axios.post("/admin/product", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

// DELETE a product
export const deleteOneProductApi = (id) =>
  axios.delete(`/admin/product/${id}`);

// GET products by category
export const getProductsByCategoryApi = (categoryId) =>
  axios.get(`/admin/product/category/${categoryId}`);

// UPDATE a product (edit)
export const updateProductApi = (id, data) =>
  axios.put(`/admin/product/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
