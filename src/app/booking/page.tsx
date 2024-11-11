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
  const [formData, setFormData] = useState({
    bookingDate: new Date(),
    user: "",
    company: "",
  });

  const openModal = (booking?: IBooking) => {
    if (booking) {
      setSelectedBooking(booking);
      setFormData({ bookingDate: booking.bookingDate, user: booking.user, company: booking.company });
    } else {
      setSelectedBooking(null);
      setFormData({ bookingDate: new Date(), user: "", company: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      setBookings([...bookings, { ...formData, createdAt: new Date() }]);
    }
    closeModal();
  };

  const handleDelete = (booking: IBooking) => {
    setBookings(bookings.filter((b) => b !== booking));
  };

  return (
    <div className='container mx-auto px-6 py-6'>
      <h2 className='text-2xl font-bold mb-6'>Booking Management</h2>
      <button
        onClick={() => openModal()}
        className='mb-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all'>
        Create New Booking
      </button>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {bookings.map((booking, index) => (
          <div key={index} className='bg-white shadow-md rounded-lg p-4'>
            <p className='text-gray-600'>User: {booking.user}</p>
            <p className='text-gray-600'>Company: {booking.company}</p>
            <p className='text-gray-500'>Booking Date: {booking.bookingDate.toDateString()}</p>
            <div className='mt-4 flex justify-between'>
              <button
                onClick={() => openModal(booking)}
                className='bg-yellow-500 text-white py-1 px-4 rounded-md hover:bg-yellow-600 transition-all'>
                Edit
              </button>
              <button
                onClick={() => handleDelete(booking)}
                className='bg-red-600 text-white py-1 px-4 rounded-md hover:bg-red-700 transition-all'>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-lg'>
            <h3 className='text-xl font-bold mb-4'>{selectedBooking ? "Edit Booking" : "Create Booking"}</h3>
            <div className='mb-4'>
              <label htmlFor='user' className='block text-gray-700 mb-2'>
                User
              </label>
              <input
                type='text'
                id='user'
                name='user'
                value={formData.user}
                onChange={handleChange}
                className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='company' className='block text-gray-700 mb-2'>
                Company
              </label>
              <input
                type='text'
                id='company'
                name='company'
                value={formData.company}
                onChange={handleChange}
                className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='bookingDate' className='block text-gray-700 mb-2'>
                Booking Date
              </label>
              <DatePicker
                selected={formData.bookingDate}
                onChange={handleDateChange}
                className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
                required
              />
            </div>
            <div className='flex justify-end'>
              <button
                onClick={closeModal}
                className='mr-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-all'>
                Cancel
              </button>
              <button
                onClick={handleSave}
                className='bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all'>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
