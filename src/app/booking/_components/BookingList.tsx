"use client";

import React, { useEffect, useState } from "react";
import BookingCard from "./BookingCard";
import BookingFormModal from "./BookingFormModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { IBooking } from "@/@types/IBooking";
import { useBookingStore } from "@/store/bookings/useBookingStore";

const BookingManagement: React.FC = () => {
  const {
    bookings,
    selectedBooking,
    setBookings,
    setSelectedBooking,
    listBookings,
    createBooking,
    updateBooking,
    deleteBooking,
  } = useBookingStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({ bookingDate: new Date(), company: "" });

  // Fetch bookings on component mount
  useEffect(() => {
    const getBookings = async () => {
      try {
        const bookingsData = await listBookings();
        setBookings(bookingsData);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };
    getBookings();
  }, [listBookings, setBookings]);

  const openModal = (booking?: IBooking) => {
    if (booking) {
      setSelectedBooking(booking);
      setFormData({ bookingDate: new Date(booking.bookingDate), company: booking.company });
    } else {
      setSelectedBooking(null);
      setFormData({ bookingDate: new Date(), company: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const openDeleteModal = (booking: IBooking) => {
    setSelectedBooking(booking);
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

  const handleSave = async () => {
    try {
      if (selectedBooking) {
        // Update existing booking
        const updatedBooking = await updateBooking(selectedBooking._id!, formData);
        setBookings(bookings.map((b) => (b._id === selectedBooking._id ? updatedBooking : b)));
      } else {
        // Create new booking
        const newBooking = await createBooking(formData);
        setBookings([...bookings, newBooking]);
      }
      closeModal();
    } catch (error) {
      console.error("Failed to save booking:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedBooking) {
        await deleteBooking(selectedBooking._id!);
        setBookings(bookings.filter((b) => b._id !== selectedBooking._id));
        closeDeleteModal();
      }
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  return (
    <div className='container mx-auto px-6 py-6'>
      <h2 className='text-3xl font-bold mb-8 text-center'>Booking</h2>
      <div className='flex justify-center mb-6'>
        <button
          onClick={() => openModal()}
          className='bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all shadow-md'>
          Create New Booking
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {bookings.map((booking) => (
          <BookingCard
            key={booking._id}
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
