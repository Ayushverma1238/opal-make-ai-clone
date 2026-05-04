"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaHome, FaBars } from "react-icons/fa";
import { FaAngleRight, FaRegCreditCard } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

const SidebarNavbar = () => {
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
          {/* Organization */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <FaHome />
              <h1 className="font-semibold text-sm">Organization</h1>
            </div>

            <Link
              href="/dashboard/Org/organization/dashboard"
              onClick={() => setIsOpen(false)}
            >
              <h2
                className={`pl-4 cursor-pointer ${isActive("/dashboard/Org/organization/dashboard") ? "text-purple-700 px-3 py-2 rounded-lg bg-purple-200 font-semibold" : "text-gray-700"}`}
              >
                Dashboards
              </h2>
            </Link>

            <Link
              href="/dashboard/Org/organization/teams"
              onClick={() => setIsOpen(false)}
            >
              <h2
                className={`pl-4 cursor-pointer ${isActive("/dashboard/Org/organization/teams") ? "text-purple-700 px-3 py-2 rounded-lg bg-purple-200 font-semibold" : "text-gray-700"}`}
              >
                Teams
              </h2>
            </Link>

            <Link
              href="/dashboard/Org/organization/users"
              onClick={() => setIsOpen(false)}
            >
              <h2
                className={`pl-4 cursor-pointer ${isActive("/dashboard/Org/organization/users") ? "text-purple-700 px-3 py-2 rounded-lg bg-purple-200 font-semibold" : "text-gray-700"}`}
              >
                Users
              </h2>
            </Link>
          </div>

          <div className="h-px w-[70%] mx-auto bg-gray-300" />

          {/* Plans */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <FaRegCreditCard />
              <h1 className="font-semibold text-sm">My Plans</h1>
            </div>

            <Link
              href="/dashboard/Org/plan/subscription"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center justify-between cursor-pointer">
                <h2
                  className={`pl-4 ${isActive("/dashboard/Org/plan/subscription") ? "text-purple-700 px-3 py-2 rounded-lg bg-purple-200 font-semibold" : "text-gray-700"}`}
                >
                  Subscription
                </h2>
                <span className="px-2 bg-gray-600 rounded-2xl text-white text-sm">
                  FREE
                </span>
              </div>
            </Link>

            <Link
              href="/dashboard/Org/plan/credits"
              onClick={() => setIsOpen(false)}
            >
              <h2
                className={`pl-4 cursor-pointer ${isActive("/dashboard/Org/plan/credits") ? "text-purple-700 px-3 py-2 rounded-lg bg-purple-200 font-semibold" : "text-gray-700"}`}
              >
                Credit usage
              </h2>
            </Link>

            <Link
              href="/dashboard/Org/plan/payments"
              onClick={() => setIsOpen(false)}
            >
              <h2
                className={`pl-4 cursor-pointer ${isActive("/dashboard/Org/plan/payments") ? "text-purple-700 px-3 py-2 rounded-lg bg-purple-200 font-semibold" : "text-gray-700"}`}
              >
                Payments
              </h2>
            </Link>
          </div>

          <div className="h-px w-[70%] mx-auto bg-gray-300" />

          {/* Utilities */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <IoSettingsOutline />
              <h1 className="font-semibold text-sm">Utilities</h1>
            </div>

            <Link
              href="/dashboard/Org/utilities/insApps"
              onClick={() => setIsOpen(false)}
            >
              <h2
                className={`pl-4 cursor-pointer ${isActive("/dashboard/Org/utilities/insApps") ? "text-purple-700 px-3 py-2 rounded-lg bg-purple-200 font-semibold" : "text-gray-700"}`}
              >
                Installed apps
              </h2>
            </Link>

            <Link
              href="/dashboard/Org/utilities/variables"
              onClick={() => setIsOpen(false)}
            >
              <h2
                className={`pl-4 cursor-pointer ${isActive("/dashboard/Org/utilities/variables") ? "text-purple-700 px-3 py-2 rounded-lg bg-purple-200 font-semibold" : "text-gray-700"}`}
              >
                Variables
              </h2>
            </Link>

            <Link
              href="/dashboard/Org/utilities/scenario"
              onClick={() => setIsOpen(false)}
            >
              <h2
                className={`pl-4 cursor-pointer ${isActive("/dashboard/Org/utilities/scenario") ? "text-purple-700 px-3 py-2 rounded-lg bg-purple-200 font-semibold" : "text-gray-700"}`}
              >
                Scenario property
              </h2>
            </Link>

            <Link
              href="/dashboard/Org/utilities/dashNotifications"
              onClick={() => setIsOpen(false)}
            >
              <h2
                className={`pl-4 cursor-pointer ${isActive("/dashboard/Org/utilities/dashNotifications") ? "text-purple-700 px-3 py-2 rounded-lg bg-purple-200 font-semibold" : "text-gray-700"}`}
              >
                Notification options
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarNavbar;
