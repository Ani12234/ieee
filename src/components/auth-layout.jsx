import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-xl">
        <div className="flex justify-center mb-6">
          <img 
            src="/logo.png" 
            alt="IEEE Logo" 
            className="h-20"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://i.imgur.com/XUlYYA1.png"; // IEEE Logo fallback
            }}
          />
        </div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600">Please sign in to your account</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
