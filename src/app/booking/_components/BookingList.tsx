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
import { MdAdd } from "react-icons/md";
import Loading from "@/app/loading";

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
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const bookingsData = await listBookings();
        console.log("bookingsData", bookingsData);
        setBookings(bookingsData);
        setIsLoading(false);
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
      if (validationMessage) setValidationMessage("");
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
    if (!formData.company?._id) {
      setValidationMessage("Please select a company before saving.");
      return;
    }

    setIsSaving(true);
    try {
      if (selectedBooking) {
        await updateBooking(selectedBooking._id!, formData);
        await listBookings();
        showMessageModal("Booking updated successfully.");
      } else {
        if (bookings.length >= 3) {
          showMessageModal("You can only book up to 3 times.");
          return;
        }
        await createBooking(formData.company._id, formData);
        await listBookings();
        showMessageModal("Booking created successfully.");
      }
      setValidationMessage("");
      closeModal();
    } catch (error) {
      console.error("Failed to save booking:", error);
      showMessageModal("Failed to save booking.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
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
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto px-6 py-6'>
      <h2 className='text-3xl font-bold mb-8 text-center'>Booking</h2>
      <div className='flex justify-center mb-6'>
        <div className='flex justify-center mb-6'>
          <button
            onClick={() => openModal()}
            className='bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center'>
            <MdAdd className='mr-2 text-lg' /> Create New Booking
          </button>
        </div>
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
          validationMessage={validationMessage}
          isSaving={isSaving}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onConfirm={handleDelete}
          onClose={closeDeleteModal}
          isDeleting={isDeleting}
          booking={selectedBooking}
        />
      )}
      {messageModal.isVisible && <MessageModal message={messageModal.message} onClose={closeMessageModal} />}
    </div>
  );
};

export default BookingManagement;
