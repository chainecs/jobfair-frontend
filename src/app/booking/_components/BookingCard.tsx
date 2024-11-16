"use client";
import React from "react";
import { IBooking } from "@/@types/IBooking";
import { FaEdit, FaTrash } from "react-icons/fa";

interface BookingCardProps {
  booking: IBooking;
  onEdit: () => void;
  onDelete: () => void;
  isAdmin?: boolean;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onEdit, onDelete, isAdmin }) => {
  const bookingDate = new Date(booking.bookingDate);

  console.log("booking", booking);

  return (
    <div className='bg-white shadow-lg rounded-lg p-6 flex flex-col h-full' style={{ minHeight: "250px" }}>
      <div>
        <p className='text-lg font-semibold text-gray-700'>Company: {booking.company?.name}</p>
        <p className='text-md text-gray-500'>Address: {booking.company?.address}</p>
        <p className='text-md text-gray-500'>Phone: {booking.company?.tel}</p>
        <p className='text-md text-gray-500'>Booking Date: {bookingDate.toDateString()}</p>
        {isAdmin && <p className='text-md text-gray-500'>Booked By User id: {booking.user}</p>}
      </div>
      <div className='mt-auto flex justify-between'>
        <button
          onClick={onEdit}
          className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center'>
          <FaEdit className='mr-2' /> Edit
        </button>
        <button
          onClick={onDelete}
          className='bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all shadow-md flex items-center'>
          <FaTrash className='mr-2' /> Delete
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
