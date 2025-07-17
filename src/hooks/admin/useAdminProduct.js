import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  getAllProductService,
  createProductService,
  deleteProductService,
  updateProductService,
} from "../../services/admin/productService";

export const useAdminProduct = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const query = useQuery({
    queryKey: ["admin_product", pageNumber, pageSize, search],
    queryFn: () =>
      getAllProductService({
        page: pageNumber,
        limit: pageSize,
        search,
      }),
    keepPreviousData: true,
  });

  const products = query.data?.data || [];
  const pagination = query.data?.pagination || {
    page: 1,
    totalPages: 1,
    limit: 10,
  };

  const canPreviousPage = pagination.page > 1;
  const canNextPage = pagination.page < pagination.totalPages;

  return {
    ...query,
    products,
    pageNumber,
    setPageNumber,
    pagination,
    canPreviousPage,
    canNextPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
    refetch: query.refetch,
  };
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_product"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_product"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_product"] });
    },
  });
};