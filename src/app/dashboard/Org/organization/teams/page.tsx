"use client";
import { Teams } from "@/app/types/org";
import React, { useEffect, useState } from "react";
import { FaEllipsisVertical, FaPencil, FaUsers } from "react-icons/fa6";
import { MdOutlineFiberSmartRecord } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const TeamsPage = () => {
  const [threeDotClick, setThreeDotClick] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [teamNChange, setTeamNChange] = useState("Team Name");
  const [teams, setTeams] = useState<Teams[]>([]);

  const handleChange = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch("/api/dashboard/org/teams", { method: "GET" });
        const {teams} = await res.json();
        if (res?.ok) {
          setTeams(teams);
        } else {
          alert("Error fetching team data");
        }
      } catch (error) {
        console.error("Error fetching teams");
      }
    };
    fetchTeams();
  }, []);

  const handleDelete = () => {
    alert("Are you sure to delete");
  };

  return (
    <>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center pb-6 justify-between pr-5">
          <h1 className="font-semibold text-lg">Teams</h1>
          <button
            disabled
            className="px-3 py-2 disabled:bg-gray-400 rounded-lg text-gray-800 font-semibold border"
          >
            + Add team
          </button>
        </div>
        {/* Card */}
        {teams.length >= 0 ? (
          teams.map((team, index) => (
            <div
              key={index}
              className="w-full mb-2 p-5 flex items-center justify-between bg-white rounded-lg shadow-sm"
            >
              {/* Left */}
              <div className="flex items-center gap-5">
                <FaUsers className="h-10 w-10 text-gray-600 bg-gray-300 p-2 rounded-md" />
                <h2 className="text-gray-800 font-semibold">{team?.name}</h2>
              </div>

              {/* Right */}
              <div className="flex relative items-center gap-6">
                <div className="text-gray-800 flex items-center gap-2 text-sm">
                  <MdOutlineFiberSmartRecord />
                  <span>{team?.operations} operations used</span>
                </div>

                {/* 3 dots */}
                <button
                  onClick={() => setThreeDotClick(!threeDotClick)}
                  className="p-1"
                >
                  <FaEllipsisVertical className="text-sm" />
                </button>

                {/* Dropdown */}
                {threeDotClick && (
                  <div className="absolute right-0 top-8 bg-white rounded-xl shadow-lg border p-3 flex flex-col gap-3 z-10">
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setThreeDotClick(false);
                      }}
                      className="text-sm flex gap-3 items-center text-gray-700 hover:bg-gray-100 p-2 rounded-md"
                    >
                      <FaPencil />
                      Edit
                    </button>

                    <button
                      onClick={handleDelete}
                      className="text-sm flex gap-3 items-center text-red-600 hover:bg-red-50 p-2 rounded-md"
                    >
                      <RiDeleteBin6Line />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No Team</p>
        )}
        ;
      </div>

      {/* Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl flex flex-col gap-5 shadow-xl w-125">
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-lg">Edit Team</h2>
              <div className="w-full h-0.5 bg-purple-600" />
            </div>
            <label
              htmlFor="teamName"
              className="text-gray-600  font-sm font-semibold"
            >
              Team Name *
            </label>
            <input
              type="text"
              name="teamName"
              value={teamNChange}
              onChange={(e) => setTeamNChange(e.target.value)}
              //   placeholder="Team name"
              className="w-full ring focus:ring-1 ring-purple-500 p-2 rounded-md mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsEditing(false);
                }}
                className="px-3 py-1 bg-transparent ring ring-gray-400 rounded-md"
              >
                Close
              </button>
              <button
                onClick={handleChange}
                className="px-3 py-1 bg-blue-600 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamsPage;
