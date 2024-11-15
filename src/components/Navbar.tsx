"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { userLogOut } from "@/services/auth";
import { useRouter } from "next/navigation";
import { FaUserAlt, FaBuilding, FaSignOutAlt, FaSignInAlt } from "react-icons/fa"; // Import ไอคอน
import { MdMenu } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import axios from "axios";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    setIsMenuOpen(false);
    try {
      // await userLogOut();
      await axios.get("/api/auth/logout");
      signOut();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className='bg-white border-b'>
      <div className='container mx-auto px-6 py-4 flex justify-between items-center border-b'>
        <Link href='/'>
          <div className='flex items-center space-x-3'>
            <FaBriefcase className='text-blue-600 text-3xl' />
            <div className='text-2xl font-bold text-blue-600'>JobFair</div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center space-x-8'>
          {session ? (
            <Link href='/booking' className='text-gray-700 hover:text-blue-600 transition-all flex items-center'>
              <FaUserAlt className='mr-2' /> Booking
            </Link>
          ) : null}
          <Link href='/company' className='text-gray-700 hover:text-blue-600 transition-all flex items-center'>
            <FaBuilding className='mr-2' /> Company
          </Link>
          {session ? (
            <button
              onClick={handleSignOut}
              className='text-gray-700 hover:text-blue-600 transition-all flex items-center'>
              <FaSignOutAlt className='mr-2' /> Logout from {session.user.name || session.user.email}
            </button>
          ) : (
            <Link href='/login' className='text-gray-700 hover:text-blue-600 transition-all flex items-center'>
              <FaSignInAlt className='mr-2' /> Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden flex items-center'>
          <button className='text-gray-700 hover:text-blue-600 focus:outline-none' onClick={toggleMenu}>
            <MdMenu className='h-8 w-8' />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${
          isMenuOpen ? "max-h-60" : "max-h-0"
        } bg-white shadow-md`}>
        <div className='flex flex-col px-10 pb-2 text-center'>
          <Link
            href='/booking'
            className='block text-gray-700 hover:text-blue-600 transition py-2 border-b flex items-center justify-center'
            onClick={() => setIsMenuOpen(false)}>
            <FaUserAlt className='mr-2' /> Booking
          </Link>
          <Link
            href='/company'
            className='block text-gray-700 hover:text-blue-600 transition py-2 border-b flex items-center justify-center'
            onClick={() => setIsMenuOpen(false)}>
            <FaBuilding className='mr-2' /> Company
          </Link>
          {session ? (
            <button
              onClick={handleSignOut}
              className='block text-gray-700 hover:text-blue-600 transition py-2 flex items-center justify-center'>
              <FaSignOutAlt className='mr-2' /> Logout from {session.user.name || session.user.email}
            </button>
          ) : (
            <Link
              href='/login'
              className='block text-gray-700 hover:text-blue-600 transition py-2 flex items-center justify-center'
              onClick={() => setIsMenuOpen(false)}>
              <FaSignInAlt className='mr-2' /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
