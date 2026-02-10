import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8080";

const productsApi = axios.create({
  baseURL: `${API_BASE_URL}/api/business`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
productsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const handleApiError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.detail || error.response?.data?.message || defaultMessage;
    toast.error(message);
  } else {
    toast.error(defaultMessage);
  }
  throw error;
};

// Product types
export interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit_price: number;
  cost_price: number;
  supplier: string;
  min_stock: number;
  max_stock: number;
  expiry_date?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductCreate {
  name: string;
  category: string;
  quantity: number;
  unit_price: number;
  cost_price: number;
  supplier: string;
  min_stock: number;
  max_stock: number;
  expiry_date?: string;
}

export interface ProductUpdate {
  name?: string;
  category?: string;
  quantity?: number;
  unit_price?: number;
  cost_price?: number;
  supplier?: string;
  min_stock?: number;
  max_stock?: number;
  expiry_date?: string;
}

// Get All Products
export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await productsApi.get<Product[]>("/products/");
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
  });
};

// Get Single Product
export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await productsApi.get<Product>(`/products/${id}/`);
      return response.data;
    },
    enabled: !!id,
  });
};

// Create Product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, unknown, ProductCreate>({
    mutationFn: async (data: ProductCreate) => {
      const response = await productsApi.post<Product>("/products/", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product added successfully!");
    },
    onError: (error) => {
      handleApiError(error, "Failed to add product");
    },
  });
};

// Update Product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, unknown, { id: number; data: ProductUpdate }>({
    mutationFn: async ({ id, data }: { id: number; data: ProductUpdate }) => {
      const response = await productsApi.patch<Product>(`/products/${id}/`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
      toast.success("Product updated successfully!");
    },
    onError: (error) => {
      handleApiError(error, "Failed to update product");
    },
  });
};

// Delete Product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, number>({
    mutationFn: async (id: number) => {
      await productsApi.delete(`/products/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully!");
    },
    onError: (error) => {
      handleApiError(error, "Failed to delete product");
    },
  });
};
