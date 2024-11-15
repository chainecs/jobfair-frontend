"use client";
import React from "react";
import { ICompany } from "@/@types/ICompany";

interface CompanyFormModalProps {
  formData: ICompany;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onClose: () => void;
  isEdit: boolean;
  errors: Partial<ICompany>;
}

const CompanyFormModal: React.FC<CompanyFormModalProps> = ({ formData, onChange, onSave, onClose, isEdit, errors }) => (
  <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
    <div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-lg'>
      <h3 className='text-2xl font-bold mb-6'>{isEdit ? "Edit Company" : "Create Company"}</h3>
      {["name", "business", "address", "province", "postalcode", "tel", "picture"].map((field) => (
        <div key={field} className='mb-6'>
          <label htmlFor={field} className='block text-gray-700 mb-2'>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type='text'
            id={field}
            name={field}
            value={formData[field as keyof ICompany]}
            onChange={onChange}
            className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
            maxLength={field === "name" ? 50 : undefined}
          />
          {errors[field as keyof ICompany] && (
            <p className='text-red-500 text-sm mt-1'>{errors[field as keyof ICompany]}</p>
          )}
        </div>
      ))}
      <div className='flex justify-end'>
        <button
          onClick={onClose}
          className='mr-4 bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-all shadow-md'>
          Cancel
        </button>
        <button
          onClick={onSave}
          className='bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all shadow-md'>
          Save
        </button>
      </div>
    </div>
  </div>
);

export default CompanyFormModal;
