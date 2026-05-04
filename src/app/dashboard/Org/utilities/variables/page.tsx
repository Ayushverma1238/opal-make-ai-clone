"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Variable = {
  variableName?: string;
  type?: string;
  name?: string;
  dataType?: any;
  value?: any;
};

const VariablePage = () => {
  const [isOrg, setIsOrg] = useState(true);

  // const data: Variable[] = [
  //   {
  //     filterName: "organizationVar",
  //     type: "system",
  //     name: "Data left",
  //     dataType: "number",
  //     value: 536870912,
  //   },
  //   {
  //     filterName: "teamVar",
  //     type: "system",
  //     name: "Data left",
  //     dataType: "number",
  //     value: 1522199,
  //   },
  // ];

  const [data, setData] = useState<Variable[]>([])

  useEffect(()=> {
    const fetchVariable = async () =>{
      try {
        const res = await fetch("/api/dashboard/org/variables",{method:"GET"});
        const {variables} = await res.json();
        if(res?.ok){
          setData(variables)
        }

      } catch (error) {
        console.error("Error fetching variable")
      }
    };
    fetchVariable()
  })

  return (
    <>
      <div className="p-6 ">
        {/* Header */}
        <div className="flex items-center pb-6 justify-between pr-5">
          {isOrg ? (
            <h1 className="font-semibold text-lg">Org Variable</h1>
          ) : (
            <h1 className="font-semibold text-lg">Team Variable</h1>
          )}
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 p-1 rounded-md bg-white border border-gray-200">
              <button
                onClick={() => setIsOrg(true)}
                className={`px-3 py-1 ${isOrg ? "bg-gray-100" : "bg-white"}  rounded-lg text-gray-500 border-gray-200 text-[12px] font-semibold border`}
              >
                Org Variable
              </button>
              <div className="w-px bg-gray-300 h-6" />
              <button
                onClick={() => setIsOrg(false)}
                className={`px-3 py-1 ${!isOrg ? "bg-gray-100" : "bg-white"} rounded-lg text-gray-500 border-gray-200 text-[12px] font-semibold border`}
              >
                Team Variable
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-sm text-left">
            {/* Header */}
            <thead className=" text-gray-700 bg-gray-200">
              <tr>
                <th className="p-3">TYPE</th>
                <th className="p-3">NAME</th>
                <th className="p-3">DATA TYPE</th>
                <th className="p-3">VALUE</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {data
                .filter((team) =>
                  isOrg
                    ? team.variableName === "ORGANIZATION"
                    : team.variableName === "TEAM",
                )
                .map((team, index) => (
                  <tr
                    key={index}
                    className="border-t font-medium text-[16px] text-gray-700 hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium text-gray-800">
                      <span className="bg-green-500 lowercase text-white py-1 px-2 rounded-2xl">
                        {team.type}
                      </span>
                    </td>
                    <td className="p-3 truncate">{team.name}</td>
                    <td className="p-3 ">{team.dataType}</td>
                    <td className="p-3 truncate">{team.value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default VariablePage;
