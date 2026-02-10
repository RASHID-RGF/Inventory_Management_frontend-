import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BusinessProfile, BusinessProfileUpdate } from "@/types/business";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8080";

const businessApi = axios.create({
  baseURL: `${API_BASE_URL}/api/business`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
businessApi.interceptors.request.use((config) => {
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

// Get Business Profile
export const useBusinessProfile = () => {
  const { isAuthenticated } = useAuth();

  return useQuery<BusinessProfile>({
    queryKey: ["businessProfile"],
    queryFn: async () => {
      const response = await businessApi.get<BusinessProfile>("/profile/");
      return response.data;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 1,
  });
};

// Update Business Profile
export const useUpdateBusinessProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<BusinessProfile, unknown, BusinessProfileUpdate>({
    mutationFn: async (data: BusinessProfileUpdate) => {
      const response = await businessApi.patch<BusinessProfile>("/profile/", data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<BusinessProfile>(["businessProfile"], data);
      toast.success("Business profile updated successfully!");
    },
    onError: (error) => {
      handleApiError(error, "Failed to update business profile");
    },
  });
};

// Create Business Profile (for first-time setup)
export const useCreateBusinessProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<BusinessProfile, unknown, BusinessProfile>({
    mutationFn: async (data: BusinessProfile) => {
      const response = await businessApi.post<BusinessProfile>("/profile/", data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<BusinessProfile>(["businessProfile"], data);
      toast.success("Business profile created successfully!");
    },
    onError: (error) => {
      handleApiError(error, "Failed to create business profile");
    },
  });
};

// Get Business Statistics
export interface BusinessStats {
  total_sales: number;
  total_orders: number;
  total_customers: number;
  revenue: number;
}

export const useBusinessStats = () => {
  const { isAuthenticated } = useAuth();

  return useQuery<BusinessStats>({
    queryKey: ["businessStats"],
    queryFn: async () => {
      const response = await businessApi.get<BusinessStats>("/stats/");
      return response.data;
    },
    enabled: isAuthenticated,
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
  });
};

