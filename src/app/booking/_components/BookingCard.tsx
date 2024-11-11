"use client";
import React from "react";
import { IBooking } from "@/@types/IBooking";

interface BookingCardProps {
  booking: IBooking;
  onEdit: () => void;
  onDelete: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onEdit, onDelete }) => (
  <div className='bg-white shadow-lg rounded-lg p-6'>
    <p className='text-lg font-semibold text-gray-700'>Company: {booking.company}</p>
    <p className='text-md text-gray-500'>Booking Date: {booking.bookingDate.toDateString()}</p>
    <div className='mt-6 flex justify-between'>
      <button
        onClick={onEdit}
        className='bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-all shadow-md'>
        Edit
      </button>
      <button
        onClick={onDelete}
        className='bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all shadow-md'>
        Delete
      </button>
    </div>
  </div>
);

export default BookingCard;
