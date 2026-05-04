"use client";

import { EllipsisVertical, Folder, Plus, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { GoShareAndroid } from "react-icons/go";
import { LuRefreshCcw } from "react-icons/lu";

const ScenarioSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [addFolder, setAddFolder] = useState(false);
  const [threeDotClicked, setThreeDotClicked] = useState(false);
  const [folderName, setFolderName] = useState("")

  const isActive = (path: string) => pathname.startsWith(path);

  const createFolder = async () => {
    try {
      if(!folderName) {
        console.log("Folder name is not there")
        return;
      }
      const res = await fetch("/api/dashboard/folder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          folderName
        }),

      });

      if(res?.ok) {
        console.log("Folder created successfully")
      }
    } catch (error) {
      console.error("Error creating folder")
    }
  };

  const [folders, setFolders] = useState<any[]>([])

  useEffect(()=> {
    const fetchAllFolder = async () => {
      try {
        const res = await fetch('/api/dashboard/folder', {method:"GET"});
        const {folders} = await res.json();
        if(res?.ok){
          setFolders(folders)
          console.log("folder", folders)
        }

      } catch (error) {
        console.error("Error fetching folders")
      }
    };
    fetchAllFolder()
  },[])

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
          {/* Scenarios */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <GoShareAndroid />
              <h1 className="font-semibold text-sm">Scenarios</h1>
            </div>

            <Link
              href="/dashboard/Scenarios/all"
              onClick={() => setIsOpen(false)}
            >
              <h2
                className={`pl-4 cursor-pointer ${isActive("/dashboard/Scenarios/all") ? "text-purple-700 px-3 py-2 rounded-lg bg-purple-100 font-semibold" : "text-gray-700"}`}
              >
                All
              </h2>
            </Link>

            <Link
              href="/dashboard/Scenarios/uncategorized"
              onClick={() => setIsOpen(false)}
            >
              <h2
                className={`pl-4 cursor-pointer ${isActive("/dashboard/Scenarios/uncategorized") ? "text-purple-700 px-3 py-2 rounded-lg bg-purple-100 font-semibold" : "text-gray-700"}`}
              >
                Uncategorized
              </h2>
            </Link>

            <Link
              href="/dashboard/Scenarios/module"
              onClick={() => setIsOpen(false)}
            >
              <h2
                className={`pl-4 cursor-pointer ${isActive("/dashboard/Scenarios/module") ? "text-purple-700 px-3 py-2 rounded-lg bg-purple-100 font-semibold" : "text-gray-700"}`}
              >
                Module tools
              </h2>
            </Link>
          </div>

          <div className="h-px w-[85%] mx-auto bg-gray-300" />

          {/* Plans */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center justify-between">
              <div className="flex gap-2">
                <Folder className="h-4 w-4" />
                <h1 className="font-semibold text-sm">Folder</h1>
              </div>
              <button onClick={() => setAddFolder(!addFolder)}>
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {addFolder && (
        <div
          onClick={() => setAddFolder(false)}
          className="fixed inset-0 z-10000 bg-black/50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-150 bg-white border rounded-lg p-6 border-gray-300"
          >
            <div className="flex text-gray-600 flex-col ">
              <div className="flex justify-between items-center mb-1 ">
                <h2 className="text-lg  font-semibold">Add Folder</h2>
                <div className="flex relative gap-2 items-center">
                  <button
                    className="p-1 rounded-md focus:ring-1 focus:ring-green-500 outline-none hover:bg-gray-100 transition"
                    onClick={() => setThreeDotClicked(!threeDotClicked)}
                  >
                    <EllipsisVertical />
                  </button>

                  <button
                    className="p-1 rounded-md hover:bg-gray-100 transition"
                    onClick={() => setAddFolder(false)}
                  >
                    <X />
                  </button>

                  {threeDotClicked && (
                    <button
                      // onClick={handleReset}
                      className="absolute flex items-center gap-4 right-0 top-full mt-2 w-40 bg-white text-gray-600 rounded-lg shadow-lg border p-2 z-50"
                    >
                      <LuRefreshCcw />
                      Refresh Form
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full h-0.5  rounded-full bg-gray-500" />
            </div>

            <div className="flex-1 h-[95%] overflow-hidden overflow-y-auto p-2 min-h-0">
              <div className="flex flex-col group-focus:text-red-500 group-hover:inline gap-2">
                <label className="flex  gap-1" htmlFor="orginazationName">
                  <div className="hidden">A |</div>
                  Name *
                </label>
                <input
                onChange={e => setFolderName(e.target.value)}
                  className="px-4 py-2 rounded-md focus:outline-purple-500 ring focus:ring-2 w-full"
                  type="text"
                  value={folderName}
                  name="orginazationName"
                  placeholder="Folder Name"
                />
                <div className="text-[12px] text-gray-500 flex gap-3">
                  <span className="text-yellow-400 font-sans">A</span>
                  <p>Must beat most 100 characters long.</p>
                </div>
              </div>

              <div className="flex justify-end items-center gap-3 pt-4 mt-4">
                <button
                  onClick={() => setAddFolder(false)}
                  className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                >
                  Close
                </button>

                <button onClick={createFolder} className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-md">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScenarioSidebar;
