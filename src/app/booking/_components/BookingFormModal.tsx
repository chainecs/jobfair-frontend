"use client";

import React from "react";
import { ICompany } from "@/@types/ICompany";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface BookingFormModalProps {
  formData: { bookingDate: Date; company: ICompany | null };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onDateChange: (date: Date | null) => void;
  onSave: () => void;
  onClose: () => void;
  isEdit: boolean;
  companies: ICompany[];
  validationMessage: string;
  isSaving: boolean;
}

const BookingFormModal: React.FC<BookingFormModalProps> = ({
  formData,
  onChange,
  onDateChange,
  onSave,
  onClose,
  isEdit,
  companies,
  validationMessage,
  isSaving,
}) => (
  <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
    <div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-lg'>
      <h3 className='text-2xl font-bold mb-6'>{isEdit ? "Edit Booking" : "Create Booking"}</h3>
      <div className='mb-6'>
        <label htmlFor='company' className='block text-gray-700 mb-2'>
          Company
        </label>
        <select
          id='company'
          name='company'
          value={formData.company?._id || ""}
          onChange={onChange}
          className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
          required>
          <option value=''>Select a company</option>
          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </select>
        {validationMessage && <p className='text-red-500 text-sm mt-2'>{validationMessage}</p>}
      </div>
      <div className='mb-6'>
        <label htmlFor='bookingDate' className='block text-gray-700 mb-2'>
          Booking Date
        </label>
        <DatePicker
          selected={formData.bookingDate}
          onChange={onDateChange}
          className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
          required
        />
      </div>
      <div className='flex justify-end'>
        <button
          onClick={onClose}
          className='mr-4 bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-all shadow-md'>
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={isSaving}
          className={`flex items-center bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all shadow-md ${
            isSaving ? "opacity-70 cursor-not-allowed" : ""
          }`}>
          {isSaving ? (
            <svg
              className='animate-spin h-5 w-5 mr-2 text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'>
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
            </svg>
          ) : null}
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  </div>
);

export default BookingFormModal;
