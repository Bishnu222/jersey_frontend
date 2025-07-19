// src/services/admin/productService.js

import {
  getAllProductApi,
  createProductApi,
  deleteOneProductApi,
  updateProductApi,
} from "../../api/admin/productApi";

// Fetch all products (with optional params for filtering, pagination, etc.)
export const getAllProductService = async (params) => {
  try {
    const response = await getAllProductApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Product fetch failed" };
  }
};

// Create a new product with form data (e.g., including image upload)
export const createProductService = async (formData) => {
  try {
    const response = await createProductApi(formData);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Product creation failed" };
  }
};

// Delete a product by ID
export const deleteProductService = async (id) => {
  try {
    const response = await deleteOneProductApi(id);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Product deletion failed" };
  }
};

// Update a product by ID, data contains updated fields
export const updateProductService = async ({ id, data }) => {
  try {
    const response = await updateProductApi(id, data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Product update failed" };
  }
};
