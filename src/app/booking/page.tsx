"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IBooking } from "@/@types/IBooking";

// Mock data for bookings
const mockBookings: IBooking[] = [
  {
    bookingDate: new Date("2024-11-15"),
    user: "User1",
    company: "Company1",
    createdAt: new Date("2024-11-01"),
  },
  {
    bookingDate: new Date("2024-11-20"),
    user: "User2",
    company: "Company2",
    createdAt: new Date("2024-11-02"),
  },
];

const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<IBooking[]>(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<IBooking | null>(null);
  const [formData, setFormData] = useState({
    bookingDate: new Date(),
    company: "",
  });

  const openModal = (booking?: IBooking) => {
    if (booking) {
      setSelectedBooking(booking);
      setFormData({ bookingDate: booking.bookingDate, company: booking.company });
    } else {
      setSelectedBooking(null);
      setFormData({ bookingDate: new Date(), company: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = (booking: IBooking) => {
    setBookingToDelete(booking);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData({ ...formData, bookingDate: date });
    }
  };

  const handleSave = () => {
    if (selectedBooking) {
      setBookings(bookings.map((b) => (b === selectedBooking ? { ...selectedBooking, ...formData } : b)));
    } else {
      setBookings([...bookings, { ...formData, user: "NewUser", createdAt: new Date() }]);
    }
    closeModal();
  };

  const handleDelete = () => {
    if (bookingToDelete) {
      setBookings(bookings.filter((b) => b !== bookingToDelete));
      closeDeleteModal();
    }
  };

  return (
    <div className='container mx-auto px-6 py-6'>
      <h2 className='text-3xl font-bold mb-8 text-center'>Booking Management</h2>
      <div className='flex justify-center mb-6'>
        <button
          onClick={() => openModal()}
          className='bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all shadow-md'>
          Create New Booking
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {bookings.map((booking, index) => (
          <div key={index} className='bg-white shadow-lg rounded-lg p-6'>
            <p className='text-lg font-semibold text-gray-700'>User: {booking.user}</p>
            <p className='text-lg font-semibold text-gray-700'>Company: {booking.company}</p>
            <p className='text-md text-gray-500'>Booking Date: {booking.bookingDate.toDateString()}</p>
            <div className='mt-6 flex justify-between'>
              <button
                onClick={() => openModal(booking)}
                className='bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-all shadow-md'>
                Edit
              </button>
              <button
                onClick={() => openDeleteModal(booking)}
                className='bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all shadow-md'>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-lg'>
            <h3 className='text-2xl font-bold mb-6'>{selectedBooking ? "Edit Booking" : "Create Booking"}</h3>
            <div className='mb-6'>
              <label htmlFor='company' className='block text-gray-700 mb-2'>
                Company
              </label>
              <input
                type='text'
                id='company'
                name='company'
                value={formData.company}
                onChange={handleChange}
                className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                required
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='bookingDate' className='block text-gray-700 mb-2'>
                Booking Date
              </label>
              <DatePicker
                selected={formData.bookingDate}
                onChange={handleDateChange}
                className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                required
              />
            </div>
            <div className='flex justify-end'>
              <button
                onClick={closeModal}
                className='mr-4 bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-all shadow-md'>
                Cancel
              </button>
              <button
                onClick={handleSave}
                className='bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all shadow-md'>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
            <h3 className='text-xl font-bold mb-4'>Confirm Deletion</h3>
            <p className='text-gray-600 mb-6'>Are you sure you want to delete this booking?</p>
            <div className='flex justify-end'>
              <button
                onClick={closeDeleteModal}
                className='mr-4 bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-all shadow-md'>
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className='bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-all shadow-md'>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
