// services/admin/userService.js
import { getAllUserApi, deleteUserApi, createUserApi, updateUserApi, getUserByIdApi } from "../../api/admin/userApi";

export const getAllUserService = async () => {
  const response = await getAllUserApi();
  // Assuming response shape: { success, data: usersArray, message }
  return response.data;  // Return the users array directly
};

export const createUserService = async (formData) => {
  const response = await createUserApi(formData);
  return response;
};

export const getUserByIdService = async (id) => {
  const response = await getUserByIdApi(id);
  return response;
};

export const updateUserService = async ({ id, data }) => {
  const response = await updateUserApi({ id, data });
  return response;
};

export const deleteUserService = async (id) => {
  const response = await deleteUserApi(id);
  return response;
};
