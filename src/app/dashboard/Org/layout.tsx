import React from "react";
import SidebarNavbar from "./sidebarNavbar/page";


const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
        <SidebarNavbar/>
      <main className="sm:mt-15 md:w-[calc(100vw-315px)] md:ml-55 min-h-screen bg-gray-100 text-black">
        {children}
      </main>
    </>
  );
};

export default OrganizationLayout;