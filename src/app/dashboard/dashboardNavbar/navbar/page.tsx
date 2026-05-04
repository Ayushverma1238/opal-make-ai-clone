"use client";
import React, { useState } from "react";
import {
  ArrowRightLeft,
  Bell,
  Check,
  CircleQuestionMark,
  CreditCard,
  EllipsisVertical,
  Mail,
  Pencil,
  Plus,
  SquarePen,
  X,
} from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { timeZoneData, countries } from "@/app/utils/countryData";
import Link from "next/link";
import { FaLightbulb, FaUserClock } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { LuRefreshCw } from "react-icons/lu";
import { signOut } from "next-auth/react";

const DashboardNavbar = () => {
  const [isMyOrgClicked, setIsMyOrgClicked] = useState(false);
  const [timeZone, setTimeZone] = useState("(GMT+05:30) Asia/Kolkata");
  const [partnerLink, setPartnerLink] = useState("");
  const [country, setCountry] = useState("India");
  const [orgName, setOrgName] = useState("My Organization");
  const [threeDotClicked, setThreeDotClicked] = useState(false);
  const router = useRouter();
  const [navThreeDot, setNavThreeDot] = useState(false);
  const [profile, setProfile] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem("userId"); // ✅ remove your custom token
    await signOut({ callbackUrl: "/login" });
  };

  const handleReset = () => {
    // reset your form states here
    setTimeZone("(GMT+05:30) Asia/Kolkata");
    setCountry("India");
    setPartnerLink("");
    // close dropdown after reset
    setThreeDotClicked(true);
    router.push("/dashboard");
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch("/api/dashboard/orgNavbar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeZone,
          country,
          orgName,
          partnerLink,
        }),
      });

      if (res?.ok) {
        alert("Organization data updated");
      }
    } catch (error) {
      console.error("Error updating organization", error);
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="fixed flex z-60 shadow-md items-center justify-between top-0 h-15 px-4 text-black bg-white ml-0 mt-20 sm:mt-0  sm:ml-20 w-full sm:w-[calc(100vw-95px)]">
        {/* LEFT */}
        <div className="flex gap-2 items-center">
          <div className="bg-red-800 rounded-lg w-6 h-6 flex items-center justify-center text-white">
            <span className="text-[12px]">M</span>
          </div>
          <div>
            <h1 className="text-sm font-semibold">My Organization</h1>
            <h2 className="text-[12px]">My Team</h2>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex gap-4 items-center">
          <div className="flex relative gap-5">
            {/* Open Modal */}
            <button
              onClick={() => setIsMyOrgClicked(true)}
              className="md:px-4 px-2 py-0 md:py-2 flex items-center gap-2 text-gray-700 border rounded-lg text-sm"
            >
              <SquarePen className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Organization Setting</span>
            </button>

            <button
              onClick={() => setNavThreeDot(!navThreeDot)}
              className="md:px-4 px-2  py-2 border rounded-lg"
            >
              <EllipsisVertical className="h-3.5 w-3.5" />
            </button>

            <button className="md:px-4 px-2 py-2 flex items-center gap-2 bg-purple-600 text-white rounded-lg text-sm">
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Create scenario</span>
            </button>

            {navThreeDot && (
              <div className="bg-gray-50 absolute left-15 flex flex-col gap-4 top-11  shadow-[0_0_25px_rgba(0,0,0,0.15)] rounded-lg text-black p-4">
                <div className="flex gap-3 items-center ">
                  <Pencil className="w-3 h-3" />
                  <h2 className="text-sm">Change Billing Address</h2>
                </div>
                <div className="flex gap-3 items-center ">
                  <CreditCard className="w-3 h-3" />
                  <h2 className="text-sm">Add payment method</h2>
                </div>
                <div className="flex gap-3 items-center ">
                  <Mail className="w-3 h-3" />
                  <h2 className="text-sm">Invite user</h2>
                </div>
                <div className="flex gap-3 items-center ">
                  <ArrowRightLeft className="w-3 h-3" />
                  <h2 className="text-sm">Transfer ownership</h2>
                </div>
                <div className="flex gap-3 items-center ">
                  <FaUserClock className="w-3 h-3" />
                  <h2 className="text-sm">Set session timeout</h2>
                </div>
              </div>
            )}
          </div>

          <div className="h-7 hidden sm:inline w-0.5 bg-gray-200" />

          <div className="sm:flex relative hidden gap-5 items-center">
            <button className="flex items-center gap-2 text-sm">
              <CircleQuestionMark className="h-3.5 w-3.5" />
              Help
            </button>

            <Bell className="h-4 w-4" />

            <button
              onClick={() => setProfile(!profile)}
              className="p-2 bg-purple-600 text-white rounded-full text-sm"
            >
              AV
            </button>

            {profile && (
              <div className="absolute right-0 px-4 py-2 top-10 bg-white rounded-lg border border-gray-200">
                <button onClick={handleLogout} className=" hover:bg-purple-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay + Modal */}
      {isMyOrgClicked && (
        <div
          className="fixed inset-0 z-50 bg-black/40  flex justify-end py-[2%]"
          onClick={() => setIsMyOrgClicked(false)}
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
                    onClick={() => setIsMyOrgClicked(false)}
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

            <div className="flex-1 h-[95%] overflow-hidden overflow-y-auto p-2 min-h-0">
              <div className="flex flex-col gap-2">
                <label
                  className="flex group-hover:inline gap-1"
                  htmlFor="orginazationName"
                >
                  <div className="hidden">A |</div>
                  Organization Name *
                </label>
                <input
                  onChange={(e) => setOrgName(e.target.value)}
                  className="px-4 py-2 rounded-md focus:outline-purple-500 ring focus:ring-2 w-full"
                  type="text"
                  value={orgName}
                  name="orginazationName"
                  placeholder="Organization Name"
                />
                <div className="text-[12px] text-gray-500 flex gap-3">
                  <span className="text-yellow-400 font-sans">A</span>
                  <p>Must be between 1 and 128 characters long.</p>
                </div>
                <div className="text-[12px] text-gray-500 flex gap-3">
                  <span className="text-yellow-400">
                    <FaCheck />
                  </span>
                  <p>
                    Use only letters, numbers, spaces and allowed special
                    characters. Names cannot start or end with spaces.
                  </p>
                </div>
              </div>

              <div className="flex mb-2 flex-col gap-2">
                <label
                  className="flex group-hover:inline gap-1"
                  htmlFor="region"
                >
                  Region
                </label>
                <select
                  disabled
                  className="w-full p-3 border disabled:bg-gray-300 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="EU">EU</option>
                  <option value="US">US</option>
                </select>
              </div>

              <div className="flex mb-2  flex-col gap-2">
                <label
                  className="flex group-hover:inline gap-1"
                  htmlFor="timeZone"
                >
                  TimeZone *
                </label>
                <select
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="w-full p-3 border  border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {timeZoneData.map((item, index) => (
                    <option key={index} value={item.label}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex mb-2 flex-col gap-2">
                <label
                  className="flex group-hover:inline gap-1"
                  htmlFor="timeZone"
                >
                  Country *
                </label>
                <select
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-3 border  border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {countries.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex mb-2 flex-col gap-2">
                <label
                  className="flex group-hover:inline gap-1"
                  htmlFor="partner"
                >
                  Partner Link
                </label>
                <input
                  value={partnerLink}
                  onChange={(e) => setPartnerLink(e.target.value)}
                  className="px-4 py-2 rounded-md focus:outline-purple-500 ring focus:ring-2 w-full"
                  type="text"
                  name="partner"
                  placeholder="Enter partner link"
                />
                <div className="text-[12px] text-gray-500 flex gap-3">
                  <span className="text-yellow-400 font-sans">A</span>
                  <p>Must be between 1 and 128 characters long.</p>
                </div>
              </div>

              <div className="flex mb-2 flex-col gap-2">
                <label
                  className="flex group-hover:inline gap-1"
                  htmlFor="region"
                >
                  Affiliate partner for shared scenarios
                </label>
                <select
                  disabled
                  className="w-full p-3 border disabled:bg-gray-300 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="EU">Nobedy receives commission </option>
                </select>
                <div className="text-[12px] text-gray-500 flex gap-3">
                  <span className="text-yellow-400 font-sans">
                    <FaLightbulb />
                  </span>
                  <p>
                    Nobody has joined the affiliate program yet. Once someone
                    joins, you can choose who earns commission for your
                    organization.{" "}
                    <Link href="#" className="text-purple-500 hover:underline">
                      Learn more
                    </Link>
                  </p>
                </div>
              </div>

              <div className="flex justify-end items-center gap-3 pt-4 border-t mt-4">
                <button
                  onClick={() => setIsMyOrgClicked(false)}
                  className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                >
                  Close
                </button>

                <button
                  onClick={handleUpdate}
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

export default DashboardNavbar;
