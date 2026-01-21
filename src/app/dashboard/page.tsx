"use client";

import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function DashboardPage() {
  const { user, signout } = useAuth();

  const handleLogout = async () => {
    await signout();
    window.location.href = '/';
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-orange-500 px-8 py-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <button
                  onClick={handleLogout}
                  className="bg-white text-orange-500 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-orange-800 mb-2">Welcome Back!</h3>
                  <p className="text-orange-600">
                    Hello, {user?.firstName} {user?.lastName}
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Email</h3>
                  <p className="text-blue-600">{user?.email}</p>
                </div>
                
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Member Since</h3>
                  <p className="text-green-600">Just joined!</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link 
                    href="/explore" 
                    className="bg-white border-2 border-orange-500 text-orange-500 px-6 py-4 rounded-xl font-medium hover:bg-orange-50 transition-colors text-center"
                  >
                    Browse Products
                  </Link>
                  
                  <Link 
                    href="/cart" 
                    className="bg-white border-2 border-blue-500 text-blue-500 px-6 py-4 rounded-xl font-medium hover:bg-blue-50 transition-colors text-center"
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}