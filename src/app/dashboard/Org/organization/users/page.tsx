"use client";

import { EllipsisVertical, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuRefreshCw } from "react-icons/lu";

const UsersPage = () => {
  const [threeDotClicked, setThreeDotClicked] = useState(false);
  const [inviteUserClicked, setInviteUserClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleReset = () => {
    setEmail("");
    setName("");
    setRole("");
    setNote("");
  };

  const roleData = [
    {
      title: "Admin",
      desc: "Full access to organization settings, users and billing. Cannot delete the organization or transfer ownerships.",
    },
    {
      title: "Members",
      desc: "Access to run scenarios and manage personal connections and data.",
    },
    {
      title: "Accountant",
      desc: "Access to financial reports and billing information.",
    },
    {
      title: "App Developer",
      desc: "Access to build and test app integration using Make's developer tools.",
    },
    {
      title: "Guest",
      desc: "Read-only access to organization resources.",
    },
  ];

  const [data, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch("/api/dashboard/org/users", { method: "GET" });

        const { users } = await res.json();
        if (res?.ok) {
          setUsers(users);
        } else {
          console.log("Error fetching user team");
        }
      } catch (error) {
        console.error("Error fetching user team detail", error);
      }
    };
    fetchTeams();
  }, [data]);

  const handleSave = async () => {
    if (!email || !name || !role) {
      console.log("All field is required");
      return;
    }

    try {
      const res = await fetch("/api/dashboard/org/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          role,
          note,
        }),
      });

      if(res?.ok){
        alert("New team member added successfull")
      }else{
        alert("Error adding team member")
      }

    } catch (error) {
      console.error("Error adding team member")
    }
  };

  return (
    <>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center pb-6 justify-between pr-5">
          <h1 className="font-semibold text-lg">Users</h1>
          <button
            onClick={() => setInviteUserClicked(true)}
            className="px-3 py-2 bg-purple-600 rounded-lg text-gray-100 font-semibold border"
          >
            + Invite user
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-sm text-left">
            {/* Header */}
            <thead className=" text-gray-700 bg-gray-200">
              <tr>
                <th className="p-3">TEAM NAME</th>
                <th className="p-3">EMAIL</th>
                <th className="p-3">LAST LOGIN</th>
                <th className="p-3">ROLE</th>
                <th className="p-3 text-right">TEAMS</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {data.map((team, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium text-gray-800">{team.name}</td>
                  <td className="p-3">{team.email}</td>
                  <td className="p-3">{team.lastLoginAt}</td>
                  <td className="p-3">{team.role}</td>
                  <td className="p-3 text-right">
                    <Link
                      href="/dashboard/Organization/dashboard"
                      className="text-purple-600 hover:underline"
                    >
                      {team.team_name}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {inviteUserClicked && (
        <div
          className="fixed inset-0 z-100000000 bg-black/40  flex justify-end py-[2%]"
          onClick={() => setInviteUserClicked(false)}
        >
          {/* Sidebar Panel */}
          <div
            className="w-125 h-full mx-auto bg-white text-black shadow-xl space-y-3 p-5 rounded-xl"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
          >
            {/* Header */}
            <div className="flex flex-col ">
              <div className="flex justify-between items-center mb-1 ">
                <h2 className="text-lg font-semibold">Invite User</h2>
                <div className="flex relative gap-2 items-center">
                  <button
                    className="p-1 rounded-md focus:ring-1 focus:ring-green-500 outline-none hover:bg-gray-100 transition"
                    onClick={() => setThreeDotClicked(!threeDotClicked)}
                  >
                    <EllipsisVertical />
                  </button>

                  <button
                    className="p-1 rounded-md hover:bg-gray-100 transition"
                    onClick={() => setInviteUserClicked(false)}
                  >
                    <X />
                  </button>

                  {threeDotClicked && (
                    <button
                      onClick={handleReset}
                      className="absolute right-0 flex items-center gap-2 top-full mt-2 w-40 bg-white text-gray-600 rounded-lg shadow-lg border p-2 z-50"
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
                  htmlFor="email"
                >
                  <div className="hidden group-focus:inline">A |</div>
                  Email *
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 rounded-md focus:outline-purple-500 ring focus:ring-2 w-full"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex group-hover:inline gap-1" htmlFor="name">
                  Name *
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-2 rounded-md focus:outline-purple-500 ring focus:ring-2 w-full"
                  type="text"
                  name="name"
                  placeholder="Name"
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
                <label className="flex group-hover:inline gap-1" htmlFor="role">
                  Role
                </label>
                <div className="relative w-full">
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="border p-2 flex items-center justify-between rounded-md cursor-pointer bg-white"
                  >
                    {role || "Select option"}
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>

                  {/* Dropdown */}
                  {isOpen && (
                    <div className="absolute w-full h-[30vh] overflow-y-auto bg-white shadow rounded-md mt-1 z-10">
                      {roleData.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setRole(item.title);
                            setIsOpen(false);
                          }}
                          className="p-2 hover:bg-gray-100 border-b border-gray-300 cursor-pointer"
                        >
                          <h2 className="font-semibold text-gray-800">
                            {item.title}
                          </h2>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex mb-2 flex-col gap-2">
                <label
                  className="flex group-hover:inline gap-1"
                  htmlFor=" note"
                >
                  Note
                </label>
                <input
                  onChange={(e) => setNote(e.target.value)}
                  className="px-4 py-2 rounded-md focus:outline-purple-500 ring focus:ring-2 w-full"
                  type="text"
                  name="note"
                  placeholder="Note"
                />
              </div>

              <div className="flex justify-end items-center gap-3 pt-4 mt-4">
                <button
                  onClick={() => setInviteUserClicked(false)}
                  className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                >
                  Close
                </button>

                <button
                  onClick={handleSave}
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

export default UsersPage;
