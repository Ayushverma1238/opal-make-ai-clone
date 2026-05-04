"use client"
import React from "react";
import DashboardNavbar from "./dashboardNavbar/navbar/page";
import SideNavbar from "./sideNavbar/page";
import { usePathname } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
    const isActive = pathname.startsWith('/dashboard/Apps_');

  return (
    <div className="relative bg-white top-0">
      <SideNavbar />
      {!isActive && (
        <DashboardNavbar />
      )}

      <main className={`ml-0 sm:ml-20  ${isActive ? "mt-20 sm:mt-0": 'mt-35 sm:mt-15'} sm:w-[calc(100vw-100px)] w-full min-h-screen  sm:min-h-[calc(100vh-60px)]'} bg-gray-100 text-black`}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;