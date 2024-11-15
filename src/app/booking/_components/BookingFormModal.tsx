"use client";

import { ICompany } from "@/@types/ICompany";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface BookingFormModalProps {
  formData: { bookingDate: Date; company: ICompany | null };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onDateChange: (date: Date | null) => void;
  onSave: () => void;
  onClose: () => void;
  isEdit: boolean;
  companies: ICompany[]; // Add companies prop to provide list of companies for dropdown
}

const BookingFormModal: React.FC<BookingFormModalProps> = ({
  formData,
  onChange,
  onDateChange,
  onSave,
  onClose,
  isEdit,
  companies,
}) => (
  <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
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
          className='bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all shadow-md'>
          Save
        </button>
      </div>
    </div>
  </div>
);

export default BookingFormModal;
