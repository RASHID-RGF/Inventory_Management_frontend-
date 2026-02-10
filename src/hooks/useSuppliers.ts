import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

// Use environment variable or null for production (no backend)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Only create axios instance if API_URL is configured
const suppliersApi = API_BASE_URL
  ? axios.create({
      baseURL: `${API_BASE_URL}/api/business`,
      headers: {
        "Content-Type": "application/json",
      },
    })
  : null;

// Add auth token to requests
if (suppliersApi) {
  suppliersApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

const handleApiError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.detail || error.response?.data?.message || defaultMessage;
    toast.error(message);
  } else {
    toast.error(defaultMessage);
  }
  throw error;
};

// Supplier types
export interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  contact_person: string;
  created_at: string;
  updated_at: string;
}

export interface SupplierCreate {
  name: string;
  email: string;
  phone: string;
  address: string;
  contact_person: string;
}

export interface SupplierUpdate {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  contact_person?: string;
}

// Get All Suppliers
export const useSuppliers = () => {
  return useQuery<Supplier[]>({
    queryKey: ["suppliers"],
    queryFn: async () => {
      if (!suppliersApi) {
        throw new Error("API not configured");
      }
      const response = await suppliersApi.get<Supplier[]>("/suppliers/");
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!suppliersApi,
  });
};

// Get Single Supplier
export const useSupplier = (id: number) => {
  return useQuery<Supplier>({
    queryKey: ["supplier", id],
    queryFn: async () => {
      if (!suppliersApi) {
        throw new Error("API not configured");
      }
      const response = await suppliersApi.get<Supplier>(`/suppliers/${id}/`);
      return response.data;
    },
    enabled: !!id && !!suppliersApi,
  });
};

// Create Supplier
export const useCreateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation<Supplier, unknown, SupplierCreate>({
    mutationFn: async (data: SupplierCreate) => {
      if (!suppliersApi) {
        throw new Error("API not configured");
      }
      const response = await suppliersApi.post<Supplier>("/suppliers/", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success("Supplier added successfully!");
    },
    onError: (error) => {
      handleApiError(error, "Failed to add supplier");
    },
  });
};

// Update Supplier
export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation<Supplier, unknown, { id: number; data: SupplierUpdate }>({
    mutationFn: async ({ id, data }: { id: number; data: SupplierUpdate }) => {
      if (!suppliersApi) {
        throw new Error("API not configured");
      }
      const response = await suppliersApi.patch<Supplier>(`/suppliers/${id}/`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      queryClient.invalidateQueries({ queryKey: ["supplier", variables.id] });
      toast.success("Supplier updated successfully!");
    },
    onError: (error) => {
      handleApiError(error, "Failed to update supplier");
    },
  });
};

// Delete Supplier
export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, number>({
    mutationFn: async (id: number) => {
      if (!suppliersApi) {
        throw new Error("API not configured");
      }
      await suppliersApi.delete(`/suppliers/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success("Supplier deleted successfully!");
    },
    onError: (error) => {
      handleApiError(error, "Failed to delete supplier");
    },
  });
};
