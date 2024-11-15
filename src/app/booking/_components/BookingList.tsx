"use client";

import React, { useEffect, useState } from "react";
import BookingCard from "./BookingCard";
import BookingFormModal from "./BookingFormModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { IBooking } from "@/@types/IBooking";
import { ICompany } from "@/@types/ICompany";
import { useBookingStore } from "@/store/bookings/useBookingStore";
import { fetchCompanies } from "@/services/company";
import MessageModal from "@/components/MessageModal";

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
  const [formData, setFormData] = useState<IBooking>({ bookingDate: new Date(), company: null });
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [messageModal, setMessageModal] = useState<{ message: string; isVisible: boolean }>({
    message: "",
    isVisible: false,
  });

  useEffect(() => {
    const getBookings = async () => {
      try {
        const bookingsData = await listBookings();
        console.log("bookingsData", bookingsData);
        setBookings(bookingsData);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };
    getBookings();

    const getCompanies = async () => {
      try {
        const companiesData = await fetchCompanies();
        setCompanies(companiesData);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };
    getCompanies();
  }, [listBookings, setBookings]);

  const openModal = (booking?: IBooking) => {
    if (booking) {
      setSelectedBooking(booking);
      setFormData({ bookingDate: new Date(booking.bookingDate), company: booking.company });
    } else {
      setSelectedBooking(null);
      setFormData({ bookingDate: new Date(), company: null });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const openDeleteModal = (booking: IBooking) => {
    setSelectedBooking(booking);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const showMessageModal = (message: string) => {
    setMessageModal({ message, isVisible: true });
  };

  const closeMessageModal = () => {
    setMessageModal({ message: "", isVisible: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "company") {
      const selectedCompany = companies.find((company) => company._id === value) || null;
      setFormData((prev) => ({ ...prev, company: selectedCompany }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData({ ...formData, bookingDate: date });
    }
  };

  const handleSave = async () => {
    try {
      if (selectedBooking) {
        await updateBooking(selectedBooking._id!, formData);
        await listBookings();
        showMessageModal("Booking updated successfully.");
      } else if (formData.company?._id) {
        if (bookings.length >= 3) {
          showMessageModal("You can only book up to 3 times.");
          return;
        }
        await createBooking(formData.company._id, formData);
        await listBookings();
        showMessageModal("Booking created successfully.");
      }
      closeModal();
    } catch (error) {
      console.error("Failed to save booking:", error);
      showMessageModal("Failed to save booking.");
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedBooking) {
        await deleteBooking(selectedBooking._id!);
        await listBookings();
        showMessageModal("Booking deleted successfully.");
        closeDeleteModal();
      }
    } catch (error) {
      console.error("Failed to delete booking:", error);
      showMessageModal("Failed to delete booking.");
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
        {bookings.map((booking, index) => (
          <BookingCard
            key={booking._id || index}
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
          companies={companies}
        />
      )}

      {isDeleteModalOpen && <DeleteConfirmationModal onConfirm={handleDelete} onClose={closeDeleteModal} />}
      {messageModal.isVisible && <MessageModal message={messageModal.message} onClose={closeMessageModal} />}
    </div>
  );
};

export default BookingManagement;
