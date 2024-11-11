/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from "next/link";

// Login Component
const Login: React.FC = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        <form>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 mb-2'>
              Email
            </label>
            <input
              type='email'
              id='email'
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
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all'>
            Login
          </button>
        </form>
        <p className='mt-4 text-center text-gray-600'>
          Don't have an account?{" "}
          <Link href='/register' className='text-blue-600 hover:underline'>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
