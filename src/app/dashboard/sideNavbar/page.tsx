"use client";

import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { RxHome } from "react-icons/rx";
import {
  Share2,
  Box,
  Paperclip,
  Database,
  Smartphone,
  EllipsisVertical,
} from "lucide-react";
import { BsOpenai } from "react-icons/bs";
import { GoShieldCheck } from "react-icons/go";
import { SiLineageos } from "react-icons/si";
import { TbWorld } from "react-icons/tb";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const ALL_ITEMS = [
  { icon: <Share2 className="h-5 w-5" />, title: "Scenarios" },
  { icon: <BsOpenai className="h-5 w-5" />, title: "AI Agents" },
  { icon: <GoShieldCheck className="h-5 w-5" />, title: "Credentials" },
  { icon: <TbWorld className="h-5 w-5" />, title: "WebHooks" },
  { icon: <Paperclip className="h-5 w-5" />, title: "MCP Toolboxes" },
  {
    icon: <IoExtensionPuzzleOutline className="h-5 w-5" />,
    title: "Templates_",
  },
  { icon: <Database className="h-5 w-5" />, title: "Data Stores" },
  { icon: <Smartphone className="h-5 w-5" />, title: "Devices" },
  { icon: <Box className="h-5 w-5" />, title: "Data Structures" },
  { icon: <SiLineageos className="h-5 w-5" />, title: "Custom Apps_" },
];

const SideNavbar = () => {
  const [openMore, setOpenMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ALL_ITEMS.length);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemMeasureRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 1. Detect Screen Mode
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 640);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // 2. Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenMore(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. Calculation logic
  const calculateItems = () => {
    if (!containerRef.current || !headerRef.current || !itemMeasureRef.current)
      return;

    const totalSize = isMobile
      ? containerRef.current.offsetWidth
      : containerRef.current.offsetHeight;

    const headerSize = isMobile
      ? headerRef.current.offsetWidth + 20
      : headerRef.current.offsetHeight + 40;

    const singleItemSize = isMobile
      ? itemMeasureRef.current.offsetWidth + 20
      : itemMeasureRef.current.offsetHeight + 24;

    const remainingSpace = totalSize - headerSize - 40; // 40px buffer for safety

    let count = Math.floor(remainingSpace / singleItemSize);

    if (count < ALL_ITEMS.length) {
      count = Math.max(1, count - 1); // Save space for the 3-dot icon
    } else {
      count = ALL_ITEMS.length;
    }

    setVisibleCount(count);
  };

  useLayoutEffect(() => {
    calculateItems();
    const ro = new ResizeObserver(calculateItems);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [isMobile]);

  const mainItems = ALL_ITEMS.slice(0, visibleCount);
  const extraItems = ALL_ITEMS.slice(visibleCount);

  const pathname = usePathname();
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <div
      ref={containerRef}
      className="fixed z-1000 flex flex-row sm:flex-col top-0 left-0 w-full h-20 sm:w-20 sm:h-screen bg-linear-to-b from-[#ce31e0] to-[#7503d5] text-white items-center px-4 sm:px-0"
    >
      {/* Header Section */}
      <div
        ref={headerRef}
        className="flex flex-row sm:flex-col items-center shrink-0"
      >
        <div className="flex flex-row sm:flex-col items-center pt-3 gap-4">
          <Image
            width={40}
            height={40}
            className="w-10 h-10 sm:w-12 sm:h-12"
            src="/dashlogo.png"
            alt="logo"
          />
          <div className={`flex  flex-col items-center`}>
            <Link
              href="/dashboard/Org/organization/dashboard"
              className={`p-2 ${isActive("/dashboard/Org") ? "bg-purple-600 px-3 py-2 rounded-lg text-purple-100 font-semibold" : "text-white"} hover:bg-white/20 rounded-md cursor-pointer`}
            >
              <RxHome className="h-5 w-5" />
            </Link>
            <p className="text-[10px] opacity-70">Org</p>
          </div>
        </div>
        <div className="sm:h-px h-10 bg-white/20 sm:w-10 mx-4 sm:my-4 w-px" />
      </div>

      {/* Main Items + More Icon */}
      <div className="flex flex-row sm:flex-col items-center gap-5 sm:gap-6">
        {mainItems.map((item, index) => {
          const lastWord = item.title.split(" ").pop();
          return (
            <div
              key={item.title}
              ref={index === 0 ? itemMeasureRef : null}
              className="flex flex-col items-center shrink-0"
            >
              <Link
                href={`/dashboard/${lastWord}`}
                className={`p-2 hover:bg-white/20 ${isActive(`/dashboard/${lastWord}`) ? "px-3 py-2 rounded-lg text-white bg-purple-600 font-semibold" : "text-white"} rounded-md cursor-pointer transition-colors`}
              >
                {item.icon}
              </Link>
              <p className="text-[10px] text-center whitespace-nowrap">
                {item.title}
              </p>
            </div>
          );
        })}

        {/* The 3-Dot "More" Button */}
        {extraItems.length > 0 && (
          <div className="relative shrink-0" ref={dropdownRef}>
            <div className="flex flex-col items-center">
              <button
                onClick={() => setOpenMore(!openMore)}
                className={`p-2 rounded-md transition-colors ${
                  openMore ? "bg-purple-900 shadow-inner" : "hover:bg-white/20"
                }`}
              >
                <EllipsisVertical className="h-5 w-5" />
              </button>
              <p className="text-[10px]">More</p>
            </div>

            {/* The Actual Dropdown Menu */}
            {openMore && (
              <div
                className={`absolute z-1000 bg-white text-slate-800 rounded-xl shadow-2xl p-2 flex flex-col min-w-45 border border-gray-200 
                ${
                  isMobile
                    ? "top-15 right-0" // Mobile: below and aligned right
                    : "left-full bottom-0 ml-4" // Desktop: to the right of the bar
                }`}
              >
                <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase border-b border-gray-100 mb-1">
                  Hidden Items
                </div>
                {extraItems.map((item) => {
                  const lastWord = item.title.split(" ").pop();
                  return (
                    <Link
                      href={`/dashboard/${lastWord}`}
                      onClick={() => setOpenMore(false)}
                      key={item.title}
                      className={`flex ${isActive(`/dashboard/${lastWord}`) ? "px-3 py-2 rounded-lg text-purple-700 bg-purple-100 hover:bg-purple-200 font-semibold" : "text-purple-500"} items-center gap-3 hover:bg-purple-50 p-2.5 rounded-lg cursor-pointer group transition-colors`}
                    >
                      <div
                        className={`text-purple-600  group-hover:scale-110 transition-transform`}
                      >
                        {item.icon}
                      </div>
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNavbar;
