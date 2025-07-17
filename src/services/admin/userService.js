import {
  createUserApi,
  getAllUserApi,
  deleteUserApi,
  updateUserApi,
  getUserByIdApi,
} from "../../api/admin/userApi";

export const createUserService = async (formData) => {
  try {
    const data = await createUserApi(formData);
    return data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || err?.message || "Failed to create user");
  }
};

export const getAllUserService = async () => {
  try {
    const data = await getAllUserApi();
    return data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || err?.message || "Failed to fetch users");
  }
};

export const getUserByIdService = async (id) => {
  try {
    const data = await getUserByIdApi(id);
    return data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || err?.message || "Failed to fetch user");
  }
};

export const updateUserService = async ({ id, data }) => {
  try {
    const response = await updateUserApi({ id, data });
    return response;
  } catch (err) {
    throw new Error(err?.response?.data?.message || err?.message || "Failed to update user");
  }
};

export const deleteUserService = async (id) => {
  try {
    const response = await deleteUserApi(id);
    return response;
  } catch (err) {
    throw new Error(err?.response?.data?.message || err?.message || "Failed to delete user");
  }
};
