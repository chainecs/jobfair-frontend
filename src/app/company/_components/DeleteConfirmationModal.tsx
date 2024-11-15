"use client";
import React from "react";
import { ICompany } from "@/@types/ICompany";

interface DeleteConfirmationModalProps {
  company: ICompany | null;
  onConfirm: () => void;
  onClose: () => void;
  isDeleting: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  company,
  onConfirm,
  onClose,
  isDeleting,
}) => (
  <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
    <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
      <h3 className='text-xl font-bold mb-4'>Confirm Deletion</h3>
      <p className='text-gray-600 mb-6'>
        Are you sure you want to delete company <span className='font-semibold'>{company?.name}</span>?
      </p>
      <div className='flex justify-end'>
        <button
          onClick={onClose}
          className='mr-4 bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-all shadow-md'>
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className={`flex items-center bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-all shadow-md ${
            isDeleting ? "opacity-70 cursor-not-allowed" : ""
          }`}>
          {isDeleting ? (
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
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmationModal;
