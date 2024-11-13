"use client";

import React, { useState, useEffect } from "react";
import api from "@/libs/axiosInstance"; // Axios instance with token interceptor
import BookingCard from "./BookingCard";
import BookingFormModal from "./BookingFormModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { IBooking } from "@/@types/IBooking";

const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<IBooking | null>(null);
  const [formData, setFormData] = useState({ bookingDate: new Date(), company: "" });

  // Fetch bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get("/api/v1/bookings");
        console.log("Bookings:", response.data);

        // Ensure we set only the booking data array
        if (response.status === 200 && Array.isArray(response.data.data)) {
          setBookings(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setBookings([]); // Default to an empty array if the response is not as expected
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setBookings([]); // Default to an empty array on error
      }
    };
    fetchBookings();
  }, []);

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

  const handleSave = async () => {
    try {
      if (selectedBooking) {
        // Update existing booking
        const response = await api.put(`/api/v1/bookings/${selectedBooking._id}`, formData);
        if (response.status === 200) {
          setBookings(bookings.map((b) => (b._id === selectedBooking._id ? response.data : b)));
        }
      } else {
        // Create new booking
        const response = await api.post("/api/v1/bookings", formData);
        if (response.status === 200) {
          setBookings([...bookings, response.data]);
        }
      }
      closeModal();
    } catch (error) {
      console.error("Failed to save booking:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (bookingToDelete) {
        const response = await api.delete(`/api/v1/bookings/${bookingToDelete._id}`);
        if (response.status === 200) {
          setBookings(bookings.filter((b) => b._id !== bookingToDelete._id));
          closeDeleteModal();
        }
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
