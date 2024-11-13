"use client";

import React, { useState } from "react";
import CompanyCard from "./CompanyCard";
import CompanyFormModal from "./CompanyFormModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { ICompany } from "@/@types/ICompany";
import { useSession } from "next-auth/react";

const companyData: ICompany[] = [
  {
    name: "TechCorp Solutions",
    business: "Software Development",
    address: "123 Main Street",
    province: "Bangkok",
    postalcode: "10110",
    tel: "02-123-4567",
    picture: "https://picsum.photos/200/300?random=1",
  },
  {
    name: "GreenField Agriculture",
    business: "Agricultural Equipment",
    address: "456 Country Road",
    province: "Chiang Mai",
    postalcode: "50000",
    tel: "053-789-0123",
    picture: "https://picsum.photos/200/300?random=2",
  },
  {
    name: "HealthFirst Medical",
    business: "Healthcare Services",
    address: "789 Health Avenue",
    province: "Phuket",
    postalcode: "83000",
    picture: "https://picsum.photos/200/300?random=3",
  },
];

const CompanyList: React.FC = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin"; // Determine if the user is an admin

  const [companies, setCompanies] = useState<ICompany[]>(companyData);
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

  const openModal = (company?: ICompany) => {
    if (company) {
      setSelectedCompany(company);
      setFormData(company); // Use the selected company data
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

  const handleSave = () => {
    if (selectedCompany) {
      setCompanies(companies.map((c) => (c === selectedCompany ? { ...selectedCompany, ...formData } : c)));
    } else {
      setCompanies([...companies, { ...formData }]);
    }
    closeModal();
  };

  const handleDelete = () => {
    if (companyToDelete) {
      setCompanies(companies.filter((c) => c !== companyToDelete));
      closeDeleteModal();
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
        {companies.map((company, index) => (
          <CompanyCard
            key={index}
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
