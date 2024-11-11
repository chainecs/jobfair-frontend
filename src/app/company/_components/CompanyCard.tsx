"use client";
import React from "react";
import Image from "next/image";
import { ICompany } from "@/@types/ICompany";

interface CompanyCardProps {
  company: ICompany;
  onEdit: () => void;
  onDelete: () => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onEdit, onDelete }) => (
  <div className='bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-full'>
    <div className='mb-8'>
      <Image
        src={company.picture}
        alt={company.name}
        width={150}
        height={150}
        className='w-full h-40 object-cover rounded-md mb-4'
      />
      <h3 className='text-xl font-semibold'>{company.name}</h3>
      <p className='text-gray-600'>{company.business}</p>
      <p className='text-gray-500'>
        {company.address}, {company.province}, {company.postalcode}
      </p>
      {company.tel && <p className='text-gray-500'>Tel: {company.tel}</p>}
    </div>
    <div className='mt-auto flex justify-between'>
      <button
        onClick={onEdit}
        className='bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-all shadow-md'>
        Edit
      </button>
      <button
        onClick={onDelete}
        className='bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all shadow-md'>
        Delete
      </button>
    </div>
  </div>
);

export default CompanyCard;
