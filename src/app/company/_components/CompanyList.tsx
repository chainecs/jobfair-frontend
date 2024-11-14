"use client";

import React, { useState, useEffect } from "react";
import api from "@/libs/axiosInstance";
import CompanyCard from "./CompanyCard";
import CompanyFormModal from "./CompanyFormModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { ICompany } from "@/@types/ICompany";
import { useSession } from "next-auth/react";

const CompanyList: React.FC = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin"; // Determine if the user is an admin

  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<ICompany | null>(null);
  const [formData, setFormData] = useState<ICompany>({
    name: "",
    business: "",
    address: "",
    province: "",
    postalcode: "",
    tel: "",
    picture: "",
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get("/api/v1/companies");
        if (response.status === 200 && Array.isArray(response.data.data)) {
          setCompanies(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const openModal = (company?: ICompany) => {
    if (company) {
      setSelectedCompany(company);
      setFormData(company);
    } else {
      setSelectedCompany(null);
      setFormData({
        name: "",
        business: "",
        address: "",
        province: "",
        postalcode: "",
        tel: "",
        picture: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const openDeleteModal = (company: ICompany) => {
    setCompanyToDelete(company);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (selectedCompany) {
        const response = await api.put(`/api/v1/companies/${selectedCompany._id}`, formData);
        if (response.status === 200) {
          setCompanies(companies.map((c) => (c._id === selectedCompany._id ? response.data.data : c)));
        }
      } else {
        const response = await api.post("/api/v1/companies", formData);
        if (response.status === 201) {
          setCompanies([...companies, response.data.data]);
        }
      }
      closeModal();
    } catch (error) {
      console.error("Failed to save company:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (companyToDelete) {
        const response = await api.delete(`/api/v1/companies/${companyToDelete._id}`);
        if (response.status === 200) {
          setCompanies(companies.filter((c) => c._id !== companyToDelete._id));
          closeDeleteModal();
        }
      }
    } catch (error) {
      console.error("Failed to delete company:", error);
    }
  };

  return (
    <div className='container mx-auto px-6 py-6'>
      <h2 className='text-3xl font-bold mb-8 text-center'>Company</h2>
      <div className='flex justify-center mb-6'>
        {isAdmin && (
          <button
            onClick={() => openModal()}
            className='bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all shadow-md'>
            Create New Company
          </button>
        )}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {companies.map((company) => (
          <CompanyCard
            key={company._id}
            company={company}
            onEdit={() => openModal(company)}
            onDelete={() => openDeleteModal(company)}
            isAdmin={isAdmin} // Pass the isAdmin prop
          />
        ))}
      </div>

      {isModalOpen && (
        <CompanyFormModal
          formData={formData}
          onChange={handleChange}
          onSave={handleSave}
          onClose={closeModal}
          isEdit={!!selectedCompany}
        />
      )}

      {isDeleteModalOpen && <DeleteConfirmationModal onConfirm={handleDelete} onClose={closeDeleteModal} />}
    </div>
  );
};

export default CompanyList;
