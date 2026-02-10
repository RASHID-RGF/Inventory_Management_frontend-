import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8080";

const suppliersApi = axios.create({
  baseURL: `${API_BASE_URL}/api/business`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
suppliersApi.interceptors.request.use((config) => {
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
      const response = await suppliersApi.get<Supplier[]>("/suppliers/");
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

// Get Single Supplier
export const useSupplier = (id: number) => {
  return useQuery<Supplier>({
    queryKey: ["supplier", id],
    queryFn: async () => {
      const response = await suppliersApi.get<Supplier>(`/suppliers/${id}/`);
      return response.data;
    },
    enabled: !!id,
  });
};

// Create Supplier
export const useCreateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation<Supplier, unknown, SupplierCreate>({
    mutationFn: async (data: SupplierCreate) => {
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
