import React from "react";
import CredentialsSidebar from "./credentialSidebar/page";


const CredentialLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>

    <CredentialsSidebar/>
      <main className="sm:mt-15 md:w-[calc(100vw-315px)] md:ml-55 min-h-screen bg-gray-100 text-black">
        {children}
      </main>
    </>
  );
};

export default CredentialLayout;