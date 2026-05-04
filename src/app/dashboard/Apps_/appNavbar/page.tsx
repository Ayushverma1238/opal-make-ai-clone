"use client";

import { EllipsisVertical, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { languages } from "../utils/appsData";
import { appCountry } from "../utils/appsData";

const AppNavbar = () => {
  const pathname = usePathname();
  const [createApp, setCreateApp] = useState<boolean>(false);
  const [threeDotClicked, setThreeDotClicked] = useState<boolean>(false);
  const [appName, setAppName] = useState<string>("");
  const [appLabel, setAppLabel] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [appTheme, setAppTheme] = useState<string>("");
  const [language, setLanguage] = useState<string>("English");
  const [audience, setAudience] = useState<string>("Global");
  const [appLogo, setAppLogo] = useState<string>("");
  const [country, setCountry] = useState<string>(
    "United State Of America (USA)",
  );

  const handleReset = () => {
    setAppName("");
    setAppLabel("");
    setDescription("");
    setAppTheme("");
    setLanguage("English");
    setAudience("Global");
    setAppLogo("");
    setCountry("United State Of America (USA)");
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log("Cloudinary URL:", data.url);

    setAppLogo(data.url); // ✅ store real URL
  };

  const tabs = ["all", "custom apps", "example"];

  const handleCreateApp = async () => {
    try {
      const res = await fetch("/api/dashboard/customApp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appName,
          appLogo,
          theme: appTheme,
          label: appLabel,
          description,
          language,
          audience,
          country,
        }),
      });

      const data = await res.json(); // ✅ important

      if (res.ok) {
        console.log("✅", data.message);
        console.log("Created App:", data.app);
        alert("App created");

        // 👉 optional: reset form
        // resetForm();
        handleReset();
        setCreateApp(false);
      } else {
        console.error("❌", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("❌ Network error:", error);
    }
  };

  return (
    <>
      <div className="fixed bg-white w-[calc(100vw-90px)] border-b border-gray-300 px-5 pt-5 top-0">
        {/* Top Section */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-[35px] text-gray-700 font-medium">Custom App</h1>

          <div className="flex gap-3">
            <div className="flex items-center gap-1 px-2 border rounded-lg border-gray-300">
              <IoIosSearch />
              <input
                type="text"
                placeholder="Search"
                className="focus:outline-none px-1 py-1"
              />
            </div>

            <a
              target="_blank"
              href="https://developers.make.com/custom-apps-documentation"
              className="border rounded-lg flex items-center justify-center border-gray-300 px-2 py-1"
            >
              <IoBookOutline />
            </a>

            <button
              onClick={() => setCreateApp(!createApp)}
              className="px-3 py-1 flex items-center gap-2 bg-[#7302d5] text-white rounded-lg"
            >
              <FaPlus />
              <span>Create app</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="pb-0 pt-5">
          <div className="flex gap-10">
            {tabs.map((tab) => {
              const first = tab.split(" ")[0].toLowerCase();

              const isActive = pathname.startsWith(`/dashboard/Apps_/${first}`);

              return (
                <Link
                  href={`/dashboard/Apps_/${first}`}
                  key={tab}
                  className={`relative cursor-pointer uppercase text-sm font-medium pb-1
                  
                  ${isActive ? "text-purple-500" : "text-gray-400"}

                  after:content-[''] after:absolute after:left-0 after:bottom-0 
                  after:h-1 after:rounded-2xl after:w-0 after:transition-all after:duration-300

                  hover:after:w-full hover:after:bg-gray-400

                  ${isActive ? "after:w-full after:bg-purple-500" : ""}
                `}
                >
                  {tab}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {createApp && (
        <div
          className="fixed inset-0 z-10000 bg-black/60  flex justify-end py-[2%]"
          onClick={() => setCreateApp(false)}
        >
          {/* Sidebar Panel */}
          <div
            className="w-125 h-full mx-auto bg-white text-black shadow-xl space-y-3 p-5 rounded-xl"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
          >
            {/* Header */}
            <div className="flex flex-col ">
              <div className="flex justify-between items-center mb-1 ">
                <h2 className="text-lg font-semibold">Organization Settings</h2>
                <div className="flex relative gap-2 items-center">
                  <button
                    className="p-1 rounded-md focus:ring-1 focus:ring-green-500 outline-none hover:bg-gray-100 transition"
                    onClick={() => setThreeDotClicked(!threeDotClicked)}
                  >
                    <EllipsisVertical />
                  </button>

                  <button
                    className="p-1 rounded-md hover:bg-gray-100 transition"
                    onClick={() => setCreateApp(false)}
                  >
                    <X />
                  </button>

                  {threeDotClicked && (
                    <button
                      onClick={handleReset}
                      className="absolute flex items-center gap-3 right-0 top-full mt-2 w-40 bg-white text-gray-600 rounded-lg shadow-lg border p-2 z-50"
                    >
                      <LuRefreshCw />
                      Refresh Form
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full h-0.5  rounded-full bg-gray-500" />
            </div>

            <div className="flex-1 h-[90%] overflow-hidden overflow-y-auto p-2 min-h-0">
              <div className="flex flex-col gap-2">
                <label
                  className="flex group-hover:inline gap-1"
                  htmlFor="appname"
                >
                  <div className="hidden">A |</div>
                  Name *
                </label>
                <input
                onChange={(e) => setAppName(e.target.value)}
                  className="px-4 py-2 rounded-md focus:outline-purple-500 ring focus:ring-2 w-full"
                  type="text"
                  name="appname"
                  placeholder="custom-app"
                />
                <div className="text-[12px] text-gray-500 flex gap-3">
                  <span className="text-yellow-400 font-sans">A</span>
                  <p>Must be between 3 and 30 characters long.</p>
                </div>
                <div className="text-[12px] text-gray-500 flex gap-3">
                  <span className="text-yellow-400">
                    <FaCheck />
                  </span>
                  <p>Must match pattern /^[a-z][0-9a-z-]+[0-9a-z]$/.</p>
                </div>
              </div>

              <div className="flex mb-2 flex-col gap-2">
                <label
                  className="flex group-hover:inline gap-1"
                  htmlFor="applabel"
                >
                  Label *
                </label>
                <input
                onChange={(e) => setAppLabel(e.target.value)}
                  className="px-4 py-2 rounded-md focus:outline-purple-500 ring focus:ring-2 w-full"
                  type="text"
                  name="applabel"
                  placeholder="Custom App"
                />

                <div className="text-[12px] text-gray-500 flex gap-3">
                  <span className="text-yellow-400 font-sans">A</span>
                  <p>Must be at most 128 characters long.</p>
                </div>
              </div>

              <div className="flex mb-2  flex-col gap-2">
                <label
                  className="flex group-hover:inline gap-1"
                  htmlFor="timeZone"
                >
                  Description
                </label>
                <input
                onChange={(e) => setDescription(e.target.value)}
                  className="px-4 py-2 rounded-md focus:outline-purple-500 ring focus:ring-2 w-full"
                  type="text"
                  name="applabel"
                  placeholder=""
                />
              </div>

              <div className="flex mb-2  flex-col gap-2">
                <label
                  className="flex group-hover:inline gap-1"
                  htmlFor="apptheme"
                >
                  Theme *
                </label>
                <input
                onChange={(e)=> setAppTheme(e.target.value)}
                  className="px-4 py-2 rounded-md focus:outline-purple-500 ring focus:ring-2 w-full"
                  type="text"
                  name="apptheme"
                  placeholder="#000000"
                />
              </div>

              <div className="flex mb-2 flex-col gap-2">
                <label
                  className="flex group-hover:inline gap-1"
                  htmlFor="timeZone"
                >
                  Language *
                </label>
                <select
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-3 border  border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {languages.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex mb-2 flex-col gap-2">
                <label
                  className="flex group-hover:inline gap-1"
                  htmlFor="audience"
                >
                  Audience *
                </label>
                <select
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full p-3 border  border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value={"Global"}>Global</option>
                  <option value={"Specefic countries"}>
                    Specific countries
                  </option>
                </select>
              </div>

              {audience !== "Global" && (
                <div className="flex mb-2 flex-col gap-2">
                  <label
                    className="flex group-hover:inline gap-1"
                    htmlFor="country"
                  >
                    Countries
                  </label>
                  <select
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-3 border  border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {appCountry.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex flex-col gap-2 mb-2">
                <label className="text-sm font-medium text-gray-600">
                  App Logo
                </label>

                <label className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-purple-50 transition">
                  {/* Left text */}
                  <span className="text-gray-500 outline py-1 px-3 rounded-md text-sm">
                    Choose file
                  </span>

                  {/* Right button */}
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-md text-sm">
                    Browse
                  </span>

                  {/* Hidden input */}
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {appLogo && (
                  <p className="truncate text-xs">
                    Selected file : {appLogo}
                  </p>
                )}
              </div>

              <div className="flex justify-end items-center gap-3 pt-4 mt-4">
                <button
                  onClick={() => {
                    handleReset();
                    setCreateApp(false);
                  }}
                  className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                >
                  Close
                </button>

                <button
                  onClick={handleCreateApp}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
                >
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

export default AppNavbar;
