import {
  getAllProductApi,
  createProductApi,
  deleteOneProductApi,
  updateProductApi,
} from "../../api/admin/productApi";

// GET
export const getAllProductService = async (params) => {
  try {
    const response = await getAllProductApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: 'Product fetch failed' };
  }
};

// POST (Create)
export const createProductService = async (formData) => {
  try {
    const response = await createProductApi(formData);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: 'Product creation failed' };
  }
};

// DELETE
export const deleteProductService = async (id) => {
  try {
    const response = await deleteOneProductApi(id);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: 'Product deletion failed' };
  }
};

// PUT (Update)
export const updateProductService = async ({ id, data }) => {
  try {
    const response = await updateProductApi(id, data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: 'Product update failed' };
  }
};
