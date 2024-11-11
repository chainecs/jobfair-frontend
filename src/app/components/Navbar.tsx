"use client";

import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className='bg-white shadow-md'>
      <div className='container mx-auto px-6 py-3 flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <Link href='/' className='text-2xl font-bold text-blue-600'>
            JobFair
          </Link>
        </div>
        <div className='hidden md:flex space-x-6'>
          <Link href='/booking' className='text-gray-700 hover:text-blue-600 transition'>
            Booking
          </Link>
          <Link href='/company' className='text-gray-700 hover:text-blue-600 transition'>
            Company
          </Link>
          <Link href='/login' className='text-gray-700 hover:text-blue-600 transition'>
            Login
          </Link>
        </div>
        <div className='md:hidden flex items-center'>
          <button className='text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600'>
            <svg
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
