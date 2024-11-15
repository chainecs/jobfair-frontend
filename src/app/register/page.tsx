"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MessageModal from "@/components/MessageModal";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // เพิ่ม state สำหรับ loading
  const [modalMessage, setModalMessage] = useState<string | null>(null); // State สำหรับ modal
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // เริ่ม loading
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setIsLoading(false); // หยุด loading
      if (result.success) {
        setModalMessage("Registration successful!"); // แสดงข้อความสำเร็จใน Modal
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setIsLoading(false); // หยุด loading
      setError("Server error. Please try again later.");
    }
  };

  const handleModalClose = () => {
    setModalMessage(null); // ปิด Modal
    router.push("/login"); // ไปที่หน้า Login
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      {modalMessage && <MessageModal message={modalMessage} onClose={handleModalClose} />}
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md px-6'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>
        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='name' className='block text-gray-700 mb-2'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 mb-2'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='tel' className='block text-gray-700 mb-2'>
              Telephone
            </label>
            <input
              type='tel'
              id='tel'
              name='tel'
              value={formData.tel}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
              required
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='password' className='block text-gray-700 mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all flex items-center justify-center'
            disabled={isLoading}>
            {isLoading ? (
              <svg
                className='animate-spin h-5 w-5 mr-2 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
              </svg>
            ) : null}
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className='mt-4 text-center text-gray-600'>
          Already have an account?{" "}
          <Link href='/login' className='text-blue-600 hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
