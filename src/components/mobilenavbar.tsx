"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HiOutlineHome, 
  HiOutlineSearch, 
  HiOutlineShoppingBag, 
  HiOutlineCog 
} from "react-icons/hi"; // Install with: npm install react-icons

export default function MobileNavbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", icon: HiOutlineHome, href: "/" },
    { label: "Explore", icon: HiOutlineSearch, href: "/explore" },
    { label: "Cart", icon: HiOutlineShoppingBag, href: "/cart", hasBadge: true },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 md:hidden z-50 rounded-t-[30px] shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.label} 
              href={item.href}
              className="flex flex-col items-center gap-1 group relative"
            >
              <div className="relative">
                <Icon 
                  size={28} 
                  className={`transition-colors ${
                    isActive ? "text-[#FF7A00]" : "text-black"
                  }`} 
                />
                
                {/* Notification Badge for Cart */}
                {item.hasBadge && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                )}
              </div>

              <span className={`text-[12px] font-medium transition-colors ${
                isActive ? "text-[#FF7A00]" : "text-gray-400"
              }`}>
                {item.label}
              </span>

              {/* Active Indicator Line (Optional, matches your screenshot's orange glow) */}
              {isActive && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-[#FF7A00] rounded-full blur-[2px]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}