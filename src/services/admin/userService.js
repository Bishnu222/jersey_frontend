import { createUserApi, getAllUserApi, deleteUserApi, updateUserApi, getUserByIdApi } from "../../api/admin/userApi";

export const createUserService = async (formData) => {
  try {
    const response = await createUserApi(formData);
    return response; // Assuming response is already response.data
  } catch (err) {
    throw new Error(err?.message || "Failed to create user");
  }
};

export const getAllUserService = async () => {
  try {
    const response = await getAllUserApi();
    return response; // assuming response is response.data (an array)
  } catch (err) {
    throw new Error(err?.message || "Failed to fetch users");
  }
};

export const getUserByIdService = async (id) => {
  try {
    const response = await getUserByIdApi(id);
    // Check if response has success and data
    if (response.success) {
      return response.data; // return the user data only
    } else {
      throw new Error(response.message || "Failed to fetch user");
    }
  } catch (err) {
    throw new Error(err?.message || "Failed to fetch user");
  }
};

export const updateUserService = async ({ id, data }) => {
  try {
    const response = await updateUserApi({ id, data });
    return response; // assuming response.data
  } catch (error) {
    throw new Error(error?.message || "Failed to update user");
  }
};

export const deleteUserService = async (id) => {
  try {
    const response = await deleteUserApi(id);
    return response; // assuming response.data with success and message
  } catch (error) {
    throw new Error(error?.message || "Failed to delete user");
  }
};
