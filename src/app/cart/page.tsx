"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('/api/cart');
        const data = await response.json();
        setCartItems(data.cart || []);
        
        // Calculate total price
        const total = data.cart.reduce((sum: number, item: CartItem) => {
          const price = parseFloat(item.price.replace('$', ''));
          return sum + (price * item.quantity);
        }, 0);
        setTotalPrice(total);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (productId: string) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cart);
        
        // Recalculate total
        const newTotal = data.cart.reduce((sum: number, item: CartItem) => {
          const price = parseFloat(item.price.replace('$', ''));
          return sum + (price * item.quantity);
        }, 0);
        setTotalPrice(newTotal);
        
        alert('Item removed from cart');
      } else {
        alert('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Error removing item from cart');
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cart);
        
        // Recalculate total
        const newTotal = data.cart.reduce((sum: number, item: CartItem) => {
          const price = parseFloat(item.price.replace('$', ''));
          return sum + (price * item.quantity);
        }, 0);
        setTotalPrice(newTotal);
      } else {
        alert('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Error updating quantity');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F6F6] py-12 px-6 md:px-12 lg:px-24 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-500">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F6F6] py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Breadcrumb / Back Button */}
        <div className="flex items-center mb-10">
          <Link href="/explore" className="p-3 bg-white shadow-sm hover:bg-gray-100 rounded-full transition-all mr-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Link>
          <h1 className="text-4xl font-extrabold text-black">My Orders</h1>
        </div>

        {/* Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* LEFT: Cart Items List (Takes 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[40px] p-10">
                <h2 className="text-2xl font-bold text-gray-500 mb-4">Your cart is empty</h2>
                <p className="text-gray-400 mb-6">Add some items from the explore page to get started</p>
                <Link href="/explore" className="inline-block bg-[#FF7A00] text-white px-6 py-3 rounded-full font-medium">
                  Browse Products
                </Link>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="group bg-white rounded-[40px] p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-8 relative overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="relative w-32 h-40 md:w-40 md:h-48 rounded-[30px] overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col flex-1 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-2xl text-black leading-tight mb-2">{item.name}</h4>
                        <p className="text-gray-400 font-medium text-lg">
                          Color: <span className="text-black">{item.selectedColor || 'N/A'}</span> | 
                          Size: <span className="text-black">{item.selectedSize || 'N/A'}</span>
                        </p>
                      </div>
                      {/* Show delete button */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-2"
                      >
                         <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-auto">
                      <span className="text-3xl font-black text-black">{item.price}</span>
                      
                      {/* Quantity Selector Style */}
                      <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm font-bold text-black"
                        >
                          -
                        </button>
                        <span className="text-xl font-bold px-2">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-xl bg-black text-white font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile-Style Orange Tab (Visible on hover or as design accent) */}
                  {idx === 1 && (
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-[#FF7A00] opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* RIGHT: Summary Sidebar (Sticky) */}
          <div className="lg:sticky lg:top-8 bg-white rounded-[50px] p-10 shadow-xl border border-gray-50">
            <h3 className="text-2xl font-bold text-black mb-8">Cart Summary</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center text-lg font-medium">
                <span className="text-gray-400">Total Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span className="text-black font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-medium">
                <span className="text-gray-400">Standard Delivery</span>
                <span className="text-black font-bold">$12.00</span>
              </div>
              
              <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                <span className="text-gray-400 text-xl">Total Payment</span>
                <span className="text-black font-black text-3xl">${(totalPrice + 12.00).toFixed(2)}</span>
              </div>
            </div>

            {/* Link to Checkout */}
            <Link href="/checkout" className="block group">
              <button className="w-full bg-[#FF7A00] text-white py-6 rounded-full font-bold text-2xl shadow-xl shadow-orange-100 group-hover:bg-orange-600 active:scale-[0.98] transition-all duration-300">
                Checkout Now
              </button>
            </Link>

            <div className="mt-8 flex items-center justify-center gap-4 grayscale opacity-40">
               <span className="text-xs font-black italic">VISA</span>
               <span className="text-[10px] font-bold">PayPal</span>
               <div className="flex -space-x-1">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <div className="w-3 h-3 rounded-full bg-orange-400"></div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}