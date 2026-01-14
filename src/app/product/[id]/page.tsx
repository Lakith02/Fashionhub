"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState(0); // Index of selected color
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 md:py-12 px-4 md:px-8 lg:px-12 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-500">Loading...</div>
      </div>
    );
  }

  const addToCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          selectedColor: product.colors[selectedColor],
          selectedSize,
        }),
      });
      
      if (response.ok) {
        alert('Item added to cart successfully!');
        // In a real app, you might want to update the cart context here
      } else {
        alert('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding item to cart');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header - Mobile & Desktop */}
        <div className="flex justify-between items-center mb-6 md:mb-10 max-w-[450px] lg:max-w-none mx-auto">
          <Link href="/explore" className="p-2 hover:bg-white rounded-full transition">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Link>
          <span className="font-semibold text-lg text-black">Details</span>
          <button className="p-2 hover:bg-white rounded-full transition">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        </div>

        {/* Desktop Grid Layout / Mobile Single Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center bg-white rounded-[30px] md:rounded-[50px] shadow-sm p-6 md:p-8 lg:p-12 max-w-[450px] lg:max-w-none mx-auto">
          
          {/* LEFT: Product Image */}
          <div className="relative w-full aspect-[4/5] rounded-[30px] md:rounded-[40px] overflow-hidden bg-[#EAE3D9]">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority />
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1 md:gap-2">
              <div className="w-8 md:w-12 h-1.5 md:h-2 bg-white rounded-full"></div>
              <div className="w-2 md:w-2.5 h-1.5 md:h-2 bg-white/50 rounded-full"></div>
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div className="flex flex-col justify-center">
            {/* Title & Colors */}
            <div className="flex justify-between items-start mb-6 lg:mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-[200px] md:max-w-xs leading-tight text-black">{product.name}</h1>
              <div className="flex gap-2 md:gap-3 pt-2">
                {product.colors.map((color, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer hover:scale-110 transition ${index === selectedColor ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Size Picker */}
            <div className="mb-8 lg:mb-12">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-black">Size</h3>
              <div className="flex justify-between md:justify-start md:gap-4 lg:gap-6">
                {product.sizes.map((s) => (
                  <button 
                    key={s} 
                    onClick={() => setSelectedSize(s)} 
                    className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl transition-all ${
                      selectedSize === s ? "bg-black text-white scale-110 shadow-lg" : "text-gray-300 hover:text-black hover:bg-gray-50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Bar - Price & Add to Cart */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 pt-6 lg:pt-8 border-t border-gray-100">
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">{product.price}</span>
              <button 
                onClick={addToCart}
                className="w-full sm:w-auto bg-[#FF7A00] text-white px-10 md:px-12 lg:px-16 py-4 md:py-5 lg:py-6 rounded-full font-bold text-lg md:text-xl lg:text-2xl shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all active:scale-95"
              >
                Add To Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
