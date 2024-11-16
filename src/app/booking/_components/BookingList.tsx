// BookingManagement.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MdAdd } from "react-icons/md";

import BookingCard from "./BookingCard";
import BookingFormModal from "./BookingFormModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import MessageModal from "@/components/MessageModal";
import Loading from "@/app/loading";

import { useBookingStore } from "@/store/bookings/useBookingStore";
import { fetchCompanies } from "@/services/company";
import { IBooking } from "@/@types/IBooking";
import { ICompany } from "@/@types/ICompany";

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

  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState<IBooking>({
    _id: "",
    bookingDate: new Date(),
    user: "",
    company: null,
    createdAt: new Date(),
  });
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [messageModal, setMessageModal] = useState<{
    message: string;
    isVisible: boolean;
  }>({ message: "", isVisible: false });
  const [companyValidationMessage, setCompanyValidationMessage] = useState<string>("");
  const [dateValidationMessage, setDateValidationMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filterUserId, setFilterUserId] = useState<string>("");

  useEffect(() => {
    const getBookings = async () => {
      try {
        const bookingsData = await listBookings();
        setBookings(bookingsData);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const getCompanies = async () => {
      try {
        const companiesData = await fetchCompanies();
        setCompanies(companiesData);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };

    getBookings();
    getCompanies();
  }, [listBookings, setBookings]);

  const openModal = (booking?: IBooking) => {
    if (booking) {
      setSelectedBooking(booking);
      setFormData({
        _id: booking._id,
        bookingDate: new Date(booking.bookingDate),
        user: booking.user,
        company: booking.company,
        createdAt: new Date(booking.createdAt),
      });
    } else {
      setSelectedBooking(null);
      setFormData({
        _id: "",
        bookingDate: new Date(),
        user: "",
        company: null,
        createdAt: new Date(),
      });
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
      if (companyValidationMessage) setCompanyValidationMessage("");
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate <= today) {
        setDateValidationMessage("Booking date must be in the future.");
      } else {
        setDateValidationMessage("");
        setFormData((prev) => ({ ...prev, bookingDate: date }));
      }
    }
  };

  const handleSave = async () => {
    if (!formData.company?._id) {
      setCompanyValidationMessage("Please select a company before saving.");
      return;
    }

    if (dateValidationMessage) {
      return;
    }

    setIsSaving(true);
    try {
      if (formData._id !== "") {
        // Existing booking
        await updateBooking(formData._id, formData);
        showMessageModal("Booking updated successfully.");
      } else {
        // New booking
        if (bookings.length >= 3) {
          showMessageModal("You can only book up to 3 times.");
          return;
        }
        await createBooking(formData.company._id, formData);
        showMessageModal("Booking created successfully.");
      }
      await listBookings();
      setCompanyValidationMessage("");
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
      if (!selectedBooking) {
        showMessageModal("No booking selected.");
        return;
      }

      await deleteBooking(selectedBooking._id);
      await listBookings();
      showMessageModal("Booking deleted successfully.");
      closeDeleteModal();
    } catch (error) {
      console.error("Failed to delete booking:", error);
      showMessageModal("Failed to delete booking.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredBookings = filterUserId ? bookings.filter((booking) => booking.user === filterUserId) : bookings;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto px-6 py-6'>
      <h2 className='text-3xl font-bold mb-8 text-center'>Booking</h2>
      <div className='flex justify-center mb-6'>
        <div className='flex justify-center'>
          {!isAdmin ? (
            <button
              onClick={() => openModal()}
              className='bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center'>
              <MdAdd className='mr-2 text-lg' /> Create New Booking
            </button>
          ) : (
            <div className='flex flex-row items-center'>
              <input
                type='text'
                value={filterUserId}
                onChange={(e) => setFilterUserId(e.target.value)}
                placeholder='Enter User ID to filter'
                className='border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs mr-2'
              />
              <button
                onClick={() => setFilterUserId("")}
                className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center'>
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {filteredBookings.map((booking, index) => (
          <BookingCard
            key={index}
            booking={booking}
            onEdit={() => openModal(booking)}
            onDelete={() => openDeleteModal(booking)}
            isAdmin={isAdmin}
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
          isEdit={formData._id !== ""}
          companies={companies}
          companyValidationMessage={companyValidationMessage}
          dateValidationMessage={dateValidationMessage}
          isSaving={isSaving}
        />
      )}

      {isDeleteModalOpen && selectedBooking && (
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
