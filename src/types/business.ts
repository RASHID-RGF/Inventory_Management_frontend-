// Business Profile Types

export interface BusinessProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  currency: string;
  language: string;
  logo?: string;
  tax_id?: string;
  created_at: string;
  updated_at: string;
}

export interface BusinessProfileUpdate {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  currency?: string;
  language?: string;
  logo?: string;
  tax_id?: string;
}

export interface BusinessApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

