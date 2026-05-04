"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type appDatatype = {
  appLogo: string;
  appName: string;
  module: number;
  theme: string;
  mode: string;
};

const CustomAppPage = () => {
  const [allData, setAllData] = useState<appDatatype[]>([]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await fetch("/api/dashboard/customApp/custom");
        console.log(res)

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setAllData(data.data); // ✅ update state
      } catch (err) {
        console.error(err);
      }
    };

    fetchApps();
  }, []);

  return (
    <div className="p-6">
      <div className="h-140 border border-gray-200 p-6 pb-15  bg-white flex flex-col gap-5 rounded-lg overflow-y-auto">
        {allData.length === 0 ? (
          // ✅ No Data UI
          <div className="flex items-center justify-center h-full text-gray-400 text-lg font-medium">
            No Data Found
          </div>
        ) : (
          // ✅ Data UI
          allData.map((data, index) => (
            <div key={index} className="flex flex-col gap-5">
              <Link
                href="#"
                className="flex items-center group hover:bg-purple-50 cursor-pointer flex-col sm:flex-row justify-between"
              >
                <div className="flex gap-4 items-center">
                  <Image
                    className="h-8 w-8 rounded-full object-contain"
                    style={{ backgroundColor: data.theme }}
                    src={data.appLogo}
                    alt={data.appName}
                  />
                  <h2 className="font-semibold text-gray-800">
                    {data.appName}
                  </h2>
                </div>

                <div className="flex gap-4 items-center justify-between">
                  <div className="text-[10px] px-2 py-1 flex items-center justify-center text-gray-200 bg-gray-800 rounded-2xl">
                    {data.mode === "READ_ONLY"
                    ? "Read Only"
                    : data.mode === "EDITABLE"
                      ? "Editable"
                      : "Admin Only"}{" "}
                  </div>
                  <div>{data.module} module(s)</div>
                </div>
              </Link>

              <div className="w-full h-px bg-gray-200 rounded-2xl" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomAppPage;
