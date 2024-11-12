"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IRegisterResponse } from "@/@types/IAuth";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5001/api/v1/auth/register`, formData);
      const authData: IRegisterResponse = response.data;
      if (response.data.success) {
        console.log(authData);
        alert("Registration successful. with email: ");
        // router.push("/login");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
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
            className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all'>
            Register
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
