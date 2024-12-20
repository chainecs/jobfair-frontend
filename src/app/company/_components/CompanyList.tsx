"use client";

import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import CompanyFormModal from "./CompanyFormModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { ICompany } from "@/@types/ICompany";
import { useSession } from "next-auth/react";
import { useCompanyStore } from "@/store/company/useCompanyStore";
import MessageModal from "@/components/MessageModal";
import { MdAdd } from "react-icons/md";
import Loading from "@/app/loading";

const CompanyList: React.FC = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const {
    companies,
    selectedCompany,
    setCompanies,
    setSelectedCompany,
    listCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
  } = useCompanyStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [companyFormData, setCompanyFormData] = useState<ICompany>({
    name: "",
    business: "",
    address: "",
    province: "",
    postalcode: "",
    tel: "",
    picture: "",
  });
  const [errors, setErrors] = useState<Partial<ICompany>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesData = await listCompanies();
        setCompanies(companiesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };
    fetchCompanies();
  }, [listCompanies, setCompanies]);

  const [messageModal, setMessageModal] = useState<{ message: string; isVisible: boolean }>({
    message: "",
    isVisible: false,
  });

  const showMessageModal = (message: string) => {
    setMessageModal({ message, isVisible: true });
  };

  const closeMessageModal = () => {
    setMessageModal({ message: "", isVisible: false });
  };

  const openModal = (company?: ICompany) => {
    if (company) {
      setSelectedCompany(company);
      setCompanyFormData(company);
    } else {
      setSelectedCompany(null);
      setCompanyFormData({
        name: "",
        business: "",
        address: "",
        province: "",
        postalcode: "",
        tel: "",
        picture: "",
      });
    }
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const openDeleteModal = (company: ICompany) => {
    setSelectedCompany(company);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyFormData({ ...companyFormData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof ICompany]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Partial<ICompany> = {};

    if (!companyFormData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (companyFormData.name.length > 50) {
      newErrors.name = "Name cannot be more than 50 characters.";
    }

    if (!companyFormData.business.trim()) {
      newErrors.business = "Business description is required.";
    }

    if (!companyFormData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!companyFormData.province.trim()) {
      newErrors.province = "Province is required.";
    }

    if (!companyFormData.postalcode.trim()) {
      newErrors.postalcode = "Postal code is required.";
    } else if (!/^\d+$/.test(companyFormData.postalcode.trim())) {
      newErrors.postalcode = "Postal code must be numeric.";
    } else if (companyFormData.postalcode.trim().length > 5) {
      newErrors.postalcode = "Postal code cannot be more than 5 digits.";
    }

    if (!companyFormData.picture.trim()) {
      newErrors.picture = "Picture URL is required.";
    } else if (!/^https?:\/\/.+\..+$/.test(companyFormData.picture.trim())) {
      newErrors.picture = "Picture must be a valid URL (e.g., https://picsum.photos/200/300?random=1).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setIsSaving(true);
    try {
      if (selectedCompany) {
        const updatedCompany = await updateCompany(selectedCompany._id!, companyFormData);
        setCompanies(companies.map((c) => (c._id === selectedCompany._id ? updatedCompany : c)));
        showMessageModal("Company updated successfully.");
      } else {
        const newCompany = await createCompany(companyFormData);
        setCompanies([...companies, newCompany]);
        showMessageModal("Company created successfully.");
      }
      closeModal();
    } catch (error) {
      console.error("Failed to save company:", error);
      showMessageModal("Failed to save company.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      if (selectedCompany) {
        await deleteCompany(selectedCompany._id!);
        setCompanies(companies.filter((c) => c._id !== selectedCompany._id));
        showMessageModal("Company deleted successfully.");
        closeDeleteModal();
      }
    } catch (error) {
      console.error("Failed to delete company:", error);
      showMessageModal("Failed to delete company.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto px-6 py-6'>
      <h2 className='text-3xl font-bold mb-8 text-center'>Company</h2>
      <div className='flex justify-center mb-6'>
        {isAdmin && (
          <button
            onClick={() => openModal()}
            className='bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center'>
            <MdAdd className='mr-2 text-lg' /> Create New Company
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
            isAdmin={isAdmin}
          />
        ))}
      </div>

      {isModalOpen && (
        <CompanyFormModal
          formData={companyFormData}
          onChange={handleChange}
          onSave={handleSave}
          onClose={closeModal}
          isEdit={!!selectedCompany}
          errors={errors}
          isSaving={isSaving}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onConfirm={handleDelete}
          onClose={closeDeleteModal}
          isDeleting={isDeleting}
          company={selectedCompany}
        />
      )}

      {messageModal.isVisible && <MessageModal message={messageModal.message} onClose={closeMessageModal} />}
    </div>
  );
};

export default CompanyList;
