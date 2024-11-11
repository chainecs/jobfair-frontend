"use client";

"use client";

import React, { useState } from "react";
import BookingCard from "./BookingCard";
import BookingFormModal from "./BookingFormModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { IBooking } from "@/@types/IBooking";

const mockBookings: IBooking[] = [
  { bookingDate: new Date("2024-11-15"), company: "Company1", createdAt: new Date("2024-11-01") },
  { bookingDate: new Date("2024-11-20"), company: "Company2", createdAt: new Date("2024-11-02") },
];

const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<IBooking[]>(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<IBooking | null>(null);
  const [formData, setFormData] = useState({ bookingDate: new Date(), company: "" });

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

  const closeModal = () => setIsModalOpen(false);

  const openDeleteModal = (booking: IBooking) => {
    setBookingToDelete(booking);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

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
          <BookingCard
            key={index}
            booking={booking}
            onEdit={() => openModal(booking)}
            onDelete={() => openDeleteModal(booking)}
          />
        ))}
      </div>

      {isModalOpen && (
        <BookingFormModal
          formData={formData}
          onChange={handleChange}
          onDateChange={handleDateChange}
          onSave={handleSave}
          onClose={closeModal}
          isEdit={!!selectedBooking}
        />
      )}

      {isDeleteModalOpen && <DeleteConfirmationModal onConfirm={handleDelete} onClose={closeDeleteModal} />}
    </div>
  );
};

export default BookingManagement;
