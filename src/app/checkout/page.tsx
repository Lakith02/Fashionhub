"use client";

import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const deliveryAddress = "25/3 Housing Estate, Sylhet";
  const orderId = "#154619";

  return (
    <div className="min-h-screen bg-[#F6F6F6] py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Header - Aligned left for desktop */}
        <div className="flex items-center mb-10">
          <Link href="/cart" className="p-3 bg-white shadow-sm hover:bg-gray-100 rounded-full transition mr-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-black">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* LEFT COLUMN: Shipping & Payment */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Delivery Address Card */}
            <div className="bg-white rounded-[40px] p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-black">Delivery Address</h3>
                <button className="text-orange-500 font-semibold hover:underline">Change</button>
              </div>
              <div className="flex items-start gap-6">
                <div className="relative w-24 h-24 rounded-3xl overflow-hidden border border-gray-100 flex-shrink-0">
                  {/* Map representation */}
                  <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-400">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-black mb-2">{deliveryAddress}</h4>
                  <div className="flex items-center gap-2 text-gray-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    <p className="font-medium">Estimated Arrival: 7 Days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white rounded-[40px] p-8 shadow-sm">
              <h3 className="text-xl font-bold text-black mb-8">Payment Method</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {/* Visual representation of payment options */}
                <div className="border-2 border-gray-100 rounded-2xl p-4 flex items-center justify-center grayscale hover:grayscale-0 hover:border-orange-500 cursor-pointer transition">
                  <span className="font-black text-blue-900 italic text-xl">VISA</span>
                </div>
                <div className="border-2 border-gray-100 rounded-2xl p-4 flex items-center justify-center grayscale hover:grayscale-0 hover:border-orange-500 cursor-pointer transition">
                   <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-red-500"></div>
                    <div className="w-6 h-6 rounded-full bg-orange-400 opacity-80"></div>
                  </div>
                </div>
                <div className="border-2 border-gray-100 rounded-2xl p-4 flex items-center justify-center grayscale hover:grayscale-0 hover:border-orange-500 cursor-pointer transition">
                  <span className="font-bold text-blue-800 italic text-xl">PayPal</span>
                </div>
                <div className="border-2 border-orange-500 rounded-2xl p-4 flex items-center justify-center cursor-pointer transition bg-orange-50">
                  <span className="font-bold text-black flex items-center gap-1">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.96.95-2.56.83-3.46-.24l-1.48-1.78c-.04-.04-.1-.04-.14 0l-1.48 1.78c-.9 1.07-2.5 1.19-3.46.24-1.07-1.06-1.07-2.8 0-3.86l7.02-7.02c.5-.5 1.3-.5 1.8 0 .5.5.5 1.3 0 1.8l-5.41 5.41c-.04.04-.04.1 0 .14l1.19 1.19c.04.04.1.04.14 0l5.41-5.41c1.55-1.55 1.55-4.06 0-5.61-1.55-1.55-4.06-1.55-5.61 0l-7.02 7.02c-1.55 1.55-1.55 4.06 0 5.61z"/></svg>
                    Pay
                  </span>
                </div>
              </div>

              <button className="w-full bg-[#FBFBFB] text-gray-400 py-5 rounded-3xl font-bold border border-dashed border-gray-200 hover:bg-gray-50 transition">
                + Add New Voucher
              </button>
            </div>

            {/* Note Section */}
            <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
              <p className="text-gray-600 leading-relaxed text-lg">
                <span className="text-red-500 font-black uppercase tracking-wider">Note : </span> 
                Please use your order id at the payment. Your Order Id is <span className="text-black font-black">{orderId}</span>. This is required to confirm your transaction.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary (Sticky) */}
          <div className="lg:sticky lg:top-8 bg-white rounded-[50px] p-10 shadow-lg border border-gray-50">
            <h3 className="text-2xl font-bold text-black mb-8">Order Summary</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center text-xl font-medium">
                <span className="text-gray-400">Total Items (3)</span>
                <span className="text-black font-bold">$116.00</span>
              </div>
              <div className="flex justify-between items-center text-xl font-medium">
                <span className="text-gray-400">Standard Delivery</span>
                <span className="text-black font-bold">$12.00</span>
              </div>
              
              <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                <span className="text-gray-400 text-xl">Total Payment</span>
                <span className="text-black font-black text-3xl">$126.00</span>
              </div>
            </div>

            <button className="w-full bg-[#FF7A00] text-white py-6 rounded-full font-bold text-2xl shadow-xl shadow-orange-100 hover:bg-orange-600 active:scale-[0.98] transition-all duration-300">
              Pay Now
            </button>
            
            <p className="text-center text-gray-400 mt-6 text-sm font-medium">
              Secure SSL Encrypted Transaction
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}