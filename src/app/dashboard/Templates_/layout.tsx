import React from "react";
import TemplatesSidebar from "./templatesSidebar/page";


const TemplatesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <TemplatesSidebar/>
      <main className="sm:mt-15 md:w-[calc(100vw-315px)] md:ml-55 min-h-[calc(100vh-140px)] sm:min-h-[calc(100vh-60px)] bg-gray-100 text-black">
        {children}
      </main>
    </>
  );
};

export default TemplatesLayout;