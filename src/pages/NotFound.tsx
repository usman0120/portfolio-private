// src/pages/NotFound.tsx
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-9xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
      <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8"> <span className='text-red-700'>Error</span>  Page Not Found</p>
      <Link 
        to="/" 
        className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-opacity"
      >
        Return Home
      </Link>
    </div>
  );
};
export default NotFound;