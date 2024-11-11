"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='bg-white border-b'>
      <div className='container mx-auto px-6 py-4 flex justify-between items-center border-b'>
        {/* Logo Section */}
        <div className='flex items-center'>
          <Link href='/' className='text-2xl font-bold text-blue-600'>
            JobFair
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center space-x-8'>
          <Link href='/booking' className='text-gray-700 hover:text-blue-600 transition-all'>
            Booking
          </Link>
          <Link href='/company' className='text-gray-700 hover:text-blue-600 transition-all'>
            Company
          </Link>
          <Link href='/login' className='text-gray-700 hover:text-blue-600 transition-all'>
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden flex items-center'>
          <button className='text-gray-700 hover:text-blue-600 focus:outline-none' onClick={toggleMenu}>
            <svg
              className='h-8 w-8'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${
          isMenuOpen ? "max-h-60" : "max-h-0"
        } bg-white shadow-md`}>
        <div className='px-10 pb-2 text-center'>
          <Link
            href='/booking'
            className='block text-gray-700 hover:text-blue-600 transition py-2 border-b'
            onClick={() => setIsMenuOpen(false)}>
            Booking
          </Link>
          <Link
            href='/company'
            className='block text-gray-700 hover:text-blue-600 transition py-2 border-b'
            onClick={() => setIsMenuOpen(false)}>
            Company
          </Link>
          <Link
            href='/login'
            className='block text-gray-700 hover:text-blue-600 transition py-2'
            onClick={() => setIsMenuOpen(false)}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
