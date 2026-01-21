"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-[#F6F6F6] md:bg-white">
      {/* Navbar Overlay */}
      <nav className="absolute top-0 left-0 w-full z-20 px-6 md:px-12 py-6 flex items-center justify-between">
        <div className="text-xl font-bold text-black">FashionHub</div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-30" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
        
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={() => setMobileMenuOpen(false)}></div>
        )}
        
        {/* Mobile Menu Panel */}
        <div 
          className={`fixed top-0 right-0 h-full w-64 bg-white z-30 transform transition-transform duration-300 ease-in-out md:hidden ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-16">
            <div className="flex flex-col gap-8 px-8 py-6">
              <Link 
                href="/" 
                className="text-black font-medium text-xl py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/explore" 
                className="text-black font-medium text-xl py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore
              </Link>
              <Link 
                href="/cart" 
                className="text-black font-medium text-xl py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cart
              </Link>
            </div>
            <div className="mt-auto px-8 pb-10">
              <button 
                className="w-full bg-[#FF7A00] text-white py-4 rounded-full font-medium mb-4"
                onClick={() => {
                  // Navigate to explore page
                  window.location.href = '/explore';
                  setMobileMenuOpen(false);
                }}
              >
                Order Now
              </button>
              <button 
                className="w-full bg-black text-white py-4 rounded-full font-medium"
                onClick={() => {
                  // Handle Contact Us functionality
                  window.location.href = 'mailto:contact@fashionhub.com';
                  setMobileMenuOpen(false);
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="text-black font-medium hover:opacity-70">Home</Link>
          <Link href="/explore" className="text-black font-medium hover:opacity-70">Explore</Link>
          <Link href="/cart" className="text-black font-medium hover:opacity-70">Cart</Link>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <button 
            className="bg-[#FF7A00] text-white px-6 py-3 rounded-full font-medium hover:bg-[#FF8A1A] transition"
            onClick={() => {
              // Navigate to explore page
              window.location.href = '/explore';
            }}
          >
            Order Now
          </button>
          <button 
            className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition"
            onClick={() => {
              // Handle Contact Us functionality
              window.location.href = 'mailto:contact@fashionhub.com';
            }}
          >
            Contact Us
          </button>
        </div>
      </nav>

      {/* Mobile Layout */}
      <div className="min-h-screen w-full flex items-center justify-center md:hidden px-4">
        <div className="w-[340px] bg-white rounded-[32px] shadow-md overflow-hidden">
          {/* Image */}
          <div className="p-4">
            <div className="relative w-full h-[320px] rounded-[24px] overflow-hidden">
              <Image
                src="/images/Hero1.png"
                alt="Hero"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-8">
            <h1 className="text-[28px] font-bold leading-[1.2] text-black">
              Find The <br /> Best Collections
            </h1>

            <p className="text-[14px] text-gray-400 mt-3 leading-relaxed">
              Get your dream item easily with FashionHub and get other interesting offer
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button 
                className="flex-1 border border-gray-300 rounded-full py-3 text-[14px] font-medium text-black"
                onClick={() => {
                  // Navigate to signup page
                  window.location.href = '/signup';
                }}
              >
                Sign Up
              </button>
                          
              <button 
                className="flex-1 bg-[#FF7A00] text-white rounded-full py-3 text-[14px] font-medium"
                onClick={() => {
                  // Navigate to signin page
                  window.location.href = '/signin';
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex w-full min-h-screen items-center">
        <div className="w-full max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-6xl font-bold leading-[1.1] text-black">
                Find The <br /> Best Collections
              </h1>

              <p className="text-lg text-gray-600 mt-6 leading-relaxed max-w-xl">
                Get your dream item easily with FashionHub and get other interesting offer
              </p>

              <div className="flex gap-6 mt-10">
                <button 
                  className="border-2 border-gray-300 text-black rounded-full py-4 px-10 text-base font-medium hover:bg-gray-100 transition"
                  onClick={() => {
                    // Navigate to signup page
                    window.location.href = '/signup';
                  }}
                >
                  Sign Up
                </button>
                              
                <button 
                  className="bg-[#FF7A00] text-white rounded-full py-4 px-10 text-base font-medium hover:bg-[#FF8A1A] transition"
                  onClick={() => {
                    // Navigate to signin page
                    window.location.href = '/signin';
                  }}
                >
                  Sign In
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex items-center justify-end mt-16">
              <div className="relative w-[520px] h-[600px] rounded-[32px] overflow-hidden shadow-xl">
                <Image
                  src="/images/Hero1.png"
                  alt="Hero"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
