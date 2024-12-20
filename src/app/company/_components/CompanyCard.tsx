"use client";
import React from "react";
import Image from "next/image";
import { ICompany } from "@/@types/ICompany";
import { FaEdit, FaTrash } from "react-icons/fa";

interface CompanyCardProps {
  company: ICompany;
  onEdit?: () => void;
  onDelete?: () => void;
  isAdmin: boolean;
}

const fallbackImage = "/images/fallback.jpg";

const isValidImageUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onEdit, onDelete, isAdmin }) => {
  const imageUrl = company.picture && isValidImageUrl(company.picture) ? company.picture : fallbackImage;

  return (
    <div className='bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-full'>
      <div className='mb-8'>
        <Image
          src={imageUrl}
          alt={company.name}
          width={150}
          height={150}
          className='w-full h-40 object-cover rounded-md mb-4'
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
        <h3 className='text-xl font-semibold'>{company.name}</h3>
        <p className='text-gray-600'>{company.business}</p>
        <p className='text-gray-500'>
          {company.address}, {company.province}, {company.postalcode}
        </p>
        {company.tel && <p className='text-gray-500'>Tel: {company.tel}</p>}
      </div>
      {isAdmin && (
        <div className='mt-auto flex justify-between'>
          <button
            onClick={onEdit}
            className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center'>
            <FaEdit className='mr-2' /> Edit
          </button>
          <button
            onClick={onDelete}
            className='bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all shadow-md flex items-center'>
            <FaTrash className='mr-2' /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyCard;
