import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllUserService,
  deleteUserService,
  createUserService,
  updateUserService,
  getUserByIdService,
} from "../../services/admin/userService";
import { toast } from "react-toastify";

// Helper to safely extract error messages
const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "An error occurred";

export const useCreateUser = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newUser) => createUserService(newUser),
    onMutate: () => {
      toast.loading("Creating user...");
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(data?.message || "User created successfully");
      queryClient.invalidateQueries(["admin_user"]);
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(getErrorMessage(error));
      options?.onError?.(error);
    },
  });
};

export const useAdminUser = () => {
  const query = useQuery({
    queryKey: ["admin_user"],
    queryFn: () => getAllUserService(),
    retry: 1, // retry once on failure
  });
  const users = query.data?.data || [];
  return {
    ...query,
    users,
  };
};

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["admin_user", id],
    queryFn: () => getUserByIdService(id),
    enabled: !!id,
    retry: 1,
  });
};

export const useUpdateUser = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedUser) => updateUserService(updatedUser),
    onMutate: () => {
      toast.loading("Updating user...");
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(data?.message || "User updated successfully");
      queryClient.invalidateQueries(["admin_user"]);
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(getErrorMessage(error));
      options?.onError?.(error);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId) => deleteUserService(userId),
    onMutate: () => {
      toast.loading("Deleting user...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("User deleted successfully");
      queryClient.invalidateQueries(["admin_user"]);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(getErrorMessage(error));
      console.error("Delete failed:", error);
    },
  });
};
