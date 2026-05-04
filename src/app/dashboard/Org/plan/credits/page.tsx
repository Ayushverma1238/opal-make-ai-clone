"use client";

import Link from "next/link";
import { CiSearch } from "react-icons/ci";

const CreditPage = () => {
  const data = [
    {
      name: "Ayush Verma",
      type: "vermaayush9170@gmail.com",
      credit: "Apr 22, 2026, 8:39:09 AM",
      dataTransfer: "Owner",
      record: "My Team",
    },
  ];

  return (
    <>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center pb-6 justify-between pr-5">
          <h1 className="font-semibold text-lg">Credit Usage</h1>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-lg border border-gray-300">
              <CiSearch />
              <input
                className="outline-none"
                type="text"
                placeholder="Search events"
              />
            </div>

            <button className="px-3 py-2 bg-purple-600 rounded-lg text-gray-100 font-semibold border">
              Last 30 days
            </button>
            <button className="px-3 py-2 bg-purple-600 rounded-lg text-gray-100 font-semibold border">
              Last 30 days
            </button>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-sm text-left">
            {/* Header */}
            <thead className=" text-gray-700 bg-gray-200">
              <tr>
                <th className="p-3">NAME</th>
                <th className="p-3">TYPE</th>
                <th className="p-3">CREDITS</th>
                <th className="p-3">DATA TRANSFER</th>
                <th className="p-3 text-right">USAGE RECORDED</th>
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
                  <td className="p-3">{team.type}</td>
                  <td className="p-3">{team.credit}</td>
                  <td className="p-3">{team.dataTransfer}</td>
                  <td className="p-3 text-right">{team.record}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CreditPage;
