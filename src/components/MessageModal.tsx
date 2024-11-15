"use client";

const MessageModal: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
    <div className='bg-white p-6 rounded-lg shadow-lg'>
      <p className='text-center text-lg'>{message}</p>
      <div className='flex justify-center mt-4'>
        <button
          onClick={onClose}
          className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all shadow-md'>
          Close
        </button>
      </div>
    </div>
  </div>
);

export default MessageModal;
