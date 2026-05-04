"use client";
import React, { useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { CiMail, CiSearch } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { HiPlus } from "react-icons/hi";
import { IoSwapVertical } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";

const AllPageScenario = () => {
  const [openAll, setOpenAll] = useState(false);
  const [openAZ, setOpenAZ] = useState(false);
  const [fil, setFil] = useState("All");
  const [fillAZ, setFillAZ] = useState("Name: A-Z")


  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Module tools</h1>
        <div className="px-3 font-medium py-2 flex gap-2 items-center rounded-lg text-sm border border-gray-200 bg-white">
          <CiSearch />
          <input
            type="text"
            placeholder="Search"
            name="allSearch"
            className="outline-none"
          />
        </div>
      </div>

      <div className="flex gap-5 relative items-center">
        <button
          onClick={() => setOpenAll(!openAll)}
          className="px-2 py-1  rounded-lg border flex items-center gap-2 border-gray-200 bg-white"
        >
          <MdFilterList />
          {fil}
        </button>
        <button
          onClick={() => setOpenAZ(!openAZ)}
          className="px-2 py-1 rounded-lg border flex items-center gap-2 border-gray-200 bg-white"
        >
          <IoSwapVertical />
          {fillAZ}
        </button>

        {openAll && (
          <div className="flex w-1/4 absolute left-0 top-10 flex-col text-sm p-3 text-purple-500 rounded-md bg-white border border-gray-300">
            <h2 className="font-semibold  text-gray-500">Filter by</h2>
            <button
              onClick={() => {
                setOpenAll(!openAll);
                setFil("All");
              }}
              className={`flex items-center px-5 py-2 w-[95%] ${fil == "All" ? "bg-pink-50" : "bg-white"} rounded-md  gap-2`}
            >
              <FaCheck className={`${fil == "All" ? "inline" : "hidden"}`} />
              <span>All</span>
            </button>
            <button
              onClick={() => {
                setOpenAll(!openAll);

                setFil("Active");
              }}
              className={`flex items-center px-5 py-2 w-[95%] ${fil == "Active" ? "bg-pink-50" : "bg-white"} rounded-md  gap-2`}
            >
              <FaCheck className={`${fil == "Active" ? "inline" : "hidden"}`} />
              <p>Active (0)</p>
            </button>
            <button
              onClick={() => {
                setOpenAll(!openAll);

                setFil("Inactive");
              }}
              className={`flex items-center px-5 py-2 w-[95%] ${fil == "Inactive" ? "bg-pink-50" : "bg-white"} rounded-md  gap-2`}
            >
              <FaCheck
                className={`${fil == "Inactive" ? "inline" : "hidden"}`}
              />
              <span>Inactive (0)</span>
            </button>
            <button
              onClick={() => {
                setOpenAll(!openAll);

                setFil("Shared");
              }}
              className={`flex items-center px-5 py-2 w-[95%] ${fil == "Shared" ? "bg-pink-50" : "bg-white"} rounded-md  gap-2`}
            >
              <FaCheck className={`${fil == "Shared" ? "inline" : "hidden"}`} />
              <span>Shared (0)</span>
            </button>
          </div>
        )}


         {openAZ && (
          <div className="flex w-1/4 absolute left-20 top-10 flex-col text-sm p-3 text-purple-500 rounded-md bg-white border border-gray-300">
            <h2 className="font-semibold  text-gray-500">Sort by</h2>
            <button
              onClick={() => {
                setOpenAZ(!openAZ);
                setFillAZ('Name: A-Z')
              }}
              className={`flex items-center px-5 py-2 w-[95%] ${fil == "Name: A-Z" ? "bg-pink-50" : "bg-white"} rounded-md  gap-2`}
            >
              <FaCheck className={`${fil == "Name: A-Z" ? "inline" : "hidden"}`} />
              <span>Name: A-Z</span>
            </button>
            <button
              onClick={() => {
                setOpenAZ(!openAZ)

                setFil("Name: Z-A");
              }}
              className={`flex items-center px-5 py-2 w-[95%] ${fil == "Name: Z-A" ? "bg-pink-50" : "bg-white"} rounded-md  gap-2`}
            >
              <FaCheck className={`${fil == "Name: Z-A" ? "inline" : "hidden"}`} />
              <p>Name: Z-A</p>
            </button>
            <div className="w-full my-2 h-px bg-gray-300"></div>
            <button
              onClick={() => {
                setOpenAZ(!openAZ)

                setFil("Last Editied");
              }}
              className={`flex items-center px-5 py-2 w-[95%] ${fil == "Last Editied" ? "bg-pink-50" : "bg-white"} rounded-md  gap-2`}
            >
              <FaCheck
                className={`${fil == "Last Editied" ? "inline" : "hidden"}`}
              />
              <span>Last Editied</span>
            </button>
            <button
              onClick={() => {
                setOpenAZ(!openAZ)

                setFil("Created: newest");
              }}
              className={`flex items-center px-5 py-2 w-[95%] ${fil == "Created: newest" ? "bg-pink-50" : "bg-white"} rounded-md  gap-2`}
            >
              <FaCheck className={`${fil == "Created: newest" ? "inline" : "hidden"}`} />
              <span>Created: newest</span>
            </button>
            <button
              onClick={() => {
                setOpenAZ(!openAZ)

                setFil("Created: oldest");
              }}
              className={`flex items-center px-5 py-2 w-[95%] ${fil == "Created: oldest" ? "bg-pink-50" : "bg-white"} rounded-md  gap-2`}
            >
              <FaCheck className={`${fil == "Created: oldest" ? "inline" : "hidden"}`} />
              <span>Created: oldest</span>
            </button>
            <div className="w-full h-px my-2 bg-gray-300"></div>

            <button
              onClick={() => {
                setOpenAZ(!openAZ)

                setFil("Credit usage: highest");
              }}
              className={`flex items-center px-5 py-2 w-[95%] ${fil == "Credit usage: highest" ? "bg-pink-50" : "bg-white"} rounded-md  gap-2`}
            >
              <FaCheck className={`${fil == "Credit usage: highest" ? "inline" : "hidden"}`} />
              <span>Credit usage: highest (30)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPageScenario;
