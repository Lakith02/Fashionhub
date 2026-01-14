"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileNavbar from "@/components/mobilenavbar";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

const categories = ["All", "Men", "Women", "Kids", "Others"];

export default function Explore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products' + (activeCategory !== 'All' ? `?category=${activeCategory}` : ''));
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F6F6] py-6 md:py-12 lg:py-16 px-4 md:px-8 lg:px-12 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F6F6] py-6 md:py-12 lg:py-16 px-4 md:px-8 lg:px-12">
      {/* Mobile-First Navigation */}
      <nav className="fixed top-0 left-0 w-full z-20 px-6 py-4 bg-white flex items-center justify-between md:hidden">
        <Link href="/" className="text-xl font-bold text-black">FashionHub</Link>
        
        {/* Mobile Menu Button */}
        <button 
          className="z-30" 
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
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setMobileMenuOpen(false)}></div>
        )}
        
        {/* Mobile Menu Panel */}
        <div 
          className={`fixed top-0 right-0 h-full w-64 bg-white z-30 transform transition-transform duration-300 ease-in-out ${
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
              <button className="w-full bg-[#FF7A00] text-white py-4 rounded-full font-medium mb-4">
                Order Now
              </button>
              <button className="w-full bg-black text-white py-4 rounded-full font-medium">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto pt-16 md:pt-0">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">Explore</h1>
        </div>
        <p className="text-gray-500 mt-2 text-sm md:text-base">Best trendy collection!</p>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 md:gap-4 mt-6 md:mt-8">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all hover:scale-105 ${
                activeCategory === cat
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-white text-black border border-gray-200 hover:bg-gray-100 hover:shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Grid - 2 cols mobile, 2 cols tablet, 3 cols laptop, 4 cols desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mt-8 md:mt-10 lg:mt-12 pb-20 md:pb-0">
          {filteredProducts.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <div className="bg-white rounded-2xl md:rounded-3xl p-3 md:p-4 shadow-sm hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
                <div className="relative w-full h-[280px] sm:h-[300px] md:h-[320px] rounded-xl md:rounded-2xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-xl md:rounded-2xl"
                    priority={parseInt(product.id) <= 2}
                  />
                </div>

                <div className="mt-3 md:mt-4">
                  <h3 className="font-semibold text-base md:text-lg text-black">{product.price}</h3>
                  <p className="text-gray-500 text-xs md:text-sm mt-1">{product.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
}