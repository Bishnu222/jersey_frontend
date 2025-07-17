import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllUserService,
  deleteUserService,
  createUserService,
  updateUserService,
  getUserByIdService,
} from "../../services/admin/userService";
import { toast } from "react-toastify";

const extractErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "An unexpected error occurred";

export const useCreateUser = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserService,
    onSuccess: (data) => {
      toast.success(data?.message || "User created successfully");
      queryClient.invalidateQueries(["admin_user"]);
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error));
      options?.onError?.(error);
    },
  });
};

export const useAdminUser = () => {
  const query = useQuery({
    queryKey: ["admin_user"],
    queryFn: () => getAllUserService(),
  });

  const users = query.data || [];
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
  });
};

export const useUpdateUser = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserService,
    onSuccess: (data) => {
      toast.success(data?.message || "User updated successfully");
      queryClient.invalidateQueries(["admin_user"]);
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error));
      options?.onError?.(error);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserService,
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries(["admin_user"]);
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error));
      console.error("Delete failed:", error);
    },
  });
};
