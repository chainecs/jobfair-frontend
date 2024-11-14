import api from "@/libs/api";
import { ICompany } from "@/@types/ICompany";

// Fetch all companies
export const fetchCompanies = async (): Promise<ICompany[]> => {
  const response = await api.get("/api/v1/companies");
  if (response.status === 200 && Array.isArray(response.data.data)) {
    return response.data.data;
  }
  throw new Error("Failed to fetch companies");
};

// Create a new company
export const createCompany = async (formData: Partial<ICompany>): Promise<ICompany> => {
  const response = await api.post("/api/v1/companies", formData);
  if (response.status === 201) {
    return response.data.data;
  }
  throw new Error("Failed to create company");
};

// Update an existing company
export const updateCompany = async (id: string, formData: Partial<ICompany>): Promise<ICompany> => {
  const response = await api.put(`/api/v1/companies/${id}`, formData);
  if (response.status === 200) {
    return response.data.data;
  }
  throw new Error("Failed to update company");
};

// Delete a company
export const deleteCompany = async (id: string): Promise<void> => {
  const response = await api.delete(`/api/v1/companies/${id}`);
  if (response.status !== 200) {
    throw new Error("Failed to delete company");
  }
};
