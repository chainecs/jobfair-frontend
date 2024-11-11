"use client";
import React from "react";

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ onConfirm, onClose }) => (
  <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
    <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
      <h3 className='text-xl font-bold mb-4'>Confirm Deletion</h3>
      <p className='text-gray-600 mb-6'>Are you sure you want to delete this company?</p>
      <div className='flex justify-end'>
        <button
          onClick={onClose}
          className='mr-4 bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-all shadow-md'>
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className='bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-all shadow-md'>
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmationModal;
