"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    price: string;
    image: string;
  };
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState("L");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white w-full max-w-[450px] rounded-[50px] shadow-sm p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/explore" className="p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Link>
          <span className="font-semibold text-lg">Details</span>
          <button className="p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        </div>

        {/* Product Image */}
        <div className="relative w-full aspect-[4/5] rounded-[40px] overflow-hidden bg-[#EAE3D9] mb-6">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
            <div className="w-8 h-1.5 bg-white rounded-full"></div>
            <div className="w-2 h-1.5 bg-white/50 rounded-full"></div>
          </div>
        </div>

        {/* Title & Colors */}
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold max-w-[200px] leading-tight">{product.name}</h1>
          <div className="flex gap-2 pt-2">
            <div className="w-8 h-8 rounded-full border-2 border-orange-500 p-0.5">
              <div className="w-full h-full rounded-full bg-orange-200"></div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#1B2B48]"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          </div>
        </div>

        {/* Size Picker */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Size</h3>
          <div className="flex justify-between">
            {["S", "M", "L", "XL", "XXL"].map((s) => (
              <button 
                key={s} 
                onClick={() => setSelectedSize(s)} 
                className={`w-12 h-12 rounded-xl font-bold transition ${
                  selectedSize === s ? "bg-black text-white" : "text-gray-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold">{product.price}</span>
          <button className="bg-[#FF7A00] text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-orange-100 hover:bg-orange-600">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
