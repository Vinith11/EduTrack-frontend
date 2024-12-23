import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, MessageCircle } from 'lucide-react';

export default function PageNotFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);

  const handleNavigation = () => {
    switch(role) {
      case 'Faculty':
        navigate('/profile');
        break;
      case 'Student':
        navigate('/student-profile');
        break;
      default:
        navigate('/faculty-signin');
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#0f172a] px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-blue-400">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-100 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-400">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={handleNavigation}
            className="flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2.5 text-sm font-semibold text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-all"
          >
            <Home className="w-4 h-4" />
            Go back home
          </button>
          <button 
            onClick={handleNavigation}
            className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-gray-300 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Contact support
          </button>
        </div>
      </div>
    </main>
  );
}