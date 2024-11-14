import { create } from "zustand";
import { ICompany } from "@/@types/ICompany";
import { fetchCompanies, createCompany, updateCompany, deleteCompany } from "@/services/company";

// Define the initial state structure
interface ICompanyState {
  companies: ICompany[];
  selectedCompany: ICompany | null;
}

// Define action types
interface ICompanyActions {
  setCompanies: (companies: ICompany[]) => void;
  setSelectedCompany: (company: ICompany | null) => void;
}

// Define action request types
interface ICompanyActionRequest {
  listCompanies: () => Promise<ICompany[]>;
  createCompany: (formData: Partial<ICompany>) => Promise<ICompany>;
  updateCompany: (id: string, formData: Partial<ICompany>) => Promise<ICompany>;
  deleteCompany: (id: string) => Promise<void>;
}

// Combine everything into a single store type
type ICompanyStore = ICompanyState & ICompanyActions & ICompanyActionRequest;

// Initial state values
const initState: ICompanyState = {
  companies: [],
  selectedCompany: null,
};

// Define the Zustand store
export const useCompanyStore = create<ICompanyStore>((set) => ({
  // Initial state
  ...initState,

  // Actions to manipulate the state
  setCompanies: (companies) => set({ companies }),
  setSelectedCompany: (company) => set({ selectedCompany: company }),

  // Async actions to interact with the backend
  listCompanies: async () => {
    const data = await fetchCompanies();
    set({ companies: data });
    return data;
  },

  createCompany: async (formData) => {
    const newCompany = await createCompany(formData);
    set((state) => ({ companies: [...state.companies, newCompany] }));
    return newCompany;
  },

  updateCompany: async (id, formData) => {
    const updatedCompany = await updateCompany(id, formData);
    set((state) => ({
      companies: state.companies.map((company) => (company._id === id ? updatedCompany : company)),
    }));
    return updatedCompany;
  },

  deleteCompany: async (id) => {
    await deleteCompany(id);
    set((state) => ({
      companies: state.companies.filter((company) => company._id !== id),
    }));
  },
}));