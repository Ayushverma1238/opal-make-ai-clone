"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { IoExtensionPuzzle } from "react-icons/io5";

const TemplatesSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed sm:left-16 -left-4 top-1/2 -translate-y-1/2 
  text-white bg-linear-to-b from-purple-500 to-pink-500 
  p-3 rounded-full animate-shadowPulseAll"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaAngleRight className="text-2xl" />
      </button>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0  left-0 z-40 h-screen w-55 bg-white shadow-md text-black transform transition-transform duration-300
        ${isOpen ? "translate-x-0 sm:mt-15 sm:ml-20 mt-35 ml-0" : "-translate-x-full"} 
        md:translate-x-0 md:ml-20  md:mt-15 md:h-[calc(100vh-60px)]`}
      >
        <div className="overflow-y-auto h-full flex flex-col gap-7 p-3">
          {/* Templates_ */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <IoExtensionPuzzle />
              <h1 className="font-semibold text-sm">Templates</h1>
            </div>

            <Link
              href="/dashboard/Templates_/publicTemplates"
              onClick={() => setIsOpen(false)}
            >
              <h2
                className={`pl-4 cursor-pointer ${isActive("/dashboard/Templates_/publicTemplates") ? "text-purple-700 px-3 py-2 rounded-lg bg-purple-100 font-semibold" : "text-gray-700"}`}
              >
                Public Templates
              </h2>
            </Link>

            <Link
              href="/dashboard/Templates_/teamTemplates"
              onClick={() => setIsOpen(false)}
            >
              <h2
                className={`pl-4 cursor-pointer ${isActive("/dashboard/Templates_/teamTemplates") ? "text-purple-700 px-3 py-2 rounded-lg bg-purple-100 font-semibold" : "text-gray-700"}`}
              >
                Team Templates
              </h2>
            </Link>

           
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplatesSidebar;
