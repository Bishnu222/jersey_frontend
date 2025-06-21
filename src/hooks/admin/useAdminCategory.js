import{userMutation,useQuery useQueryClient} from "@tanstack/react-query";
import {createOneCategoryService,getAllCategoryService,getOneCategoryService
    updateOneCategoryService, deleteOneCategoryService} from "../service/admin/categoryService";
import { toast } from "react-toastify";

export const useAdminCategory = ()=>{
    const query = useQuery({
        queryKey:["admin_category"],
        queryFn:getAllCategoryService,
    });
    const categories = query.data?.data ||[];
    return {
        ...query,
        categories,
    };
};
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOneCategoryService,
    onSuccess: () => {
      toast.success("Category created");
      queryClient.invalidateQueries(["admin_category"]);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to create category");
    },
  });
};

// GET ONE CATEGORY BY ID
export const useGetOneCategory = (id) => {
  const query = useQuery({
    queryKey: ["admin_category_detail", id],
    queryFn: () => getOneCategoryService(id),
    enabled: !!id, // only fetch if id exists
    retry: false,
  });

  const category = query.data?.data || {};

  return {
    ...query,
    category,
  };
};

// UPDATE CATEGORY
export const useUpdateOneCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateOneCategoryService(id, data),
    onSuccess: () => {
      toast.success("Category updated");
      queryClient.invalidateQueries(["admin_category"]);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to update category");
    },
  });
};

// DELETE CATEGORY
export const useDeleteOneCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOneCategoryService,
    mutationKey: ["admin_category_deleted"],
    onSuccess: () => {
      toast.success("Category deleted");
      queryClient.invalidateQueries(["admin_category"]);
    },
    onError: (err) => {
      toast.error(err?.message || "Delete failed");
    },
  });
};