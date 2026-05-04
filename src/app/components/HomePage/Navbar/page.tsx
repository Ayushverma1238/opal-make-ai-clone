"use client";

import { useState, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import First from "./MenuItemData/first/page";
import Second from "./MenuItemData/second/page";
import Third from "./MenuItemData/solution/page";
import Forth from "./MenuItemData/forth/page";
import Fifth from "./MenuItemData/fifth/page";
import Image from "next/image";

const Navbar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuItems = [
    "What to Make",
    "Make + AI",
    "Solutions",
    "Resources",
    "Partners",
    "Pricing",
  ];

  const menuItemData = [
    <First />, <Second />, <Third />, <Forth />, <Fifth />
  ];

  const handleEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 200); // delay (adjust 150–300ms)
  };

  return (
    <div className="flex sticky top-0 z-10 justify-between px-6 items-center bg-linear-to-r from-[#220041] to-purple-950">
      
      <Image src="/logo.png" alt="logo" width={105} height={35} />

      <div className="flex gap-10 text-white">
        
        {/* LEFT MENU */}
        <div className="flex items-center gap-10">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="relative hidden lg:flex items-center gap-1 text-[14px] cursor-pointer"
              onMouseEnter={() => handleEnter(index)}
              onMouseLeave={handleLeave}
            >
              <span>{item}</span>

              {item !== "Pricing" && (
                hoveredIndex === index ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )
              )}

              {/* DROPDOWN */}
              {hoveredIndex === index && item !== "Pricing" && (
                <div className="absolute top-full left-0 pt-4">
                  {menuItemData[index]}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex gap-3 items-center">
          <Link href="#" className="hover:underline">
            Talk to Sales
          </Link>

          <button className="py-2 px-3 border-[#F024F6] border-2 rounded-md">
            <Link className="text-[#F024F6] font-semibold" href="/login">
              Log in
            </Link>
          </button>

          <button className="py-2 px-3 rounded-md bg-[#FF009A]">
            <Link href="/register">Get Started Free</Link>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Navbar;