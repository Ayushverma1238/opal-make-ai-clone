"use client";

import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsCheckLg, BsLightning, BsThreeDotsVertical } from "react-icons/bs";
import { CiMail, CiSearch } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { HiPlus } from "react-icons/hi";
import { IoSwapHorizontal, IoSwapVertical } from "react-icons/io5";
import {
  MdFilterList,
  MdOutlineDateRange,
  MdOutlineFiberSmartRecord,
} from "react-icons/md";


type appData = {
  imageUrl: string;
  name: string;
  theme: string;
}; 

const AllPageScenario = () => {
  const [openAll, setOpenAll] = useState(false);
  const [openAZ, setOpenAZ] = useState(false);
  const [fil, setFil] = useState("All");
  const [fillAZ, setFillAZ] = useState("Name: A-Z");
  const [allScenarios, setAllScenarios] = useState<any[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fetchAllScenario = async () => {
      try {
        const res = await fetch("/api/dashboard/scenarios/all", {
          method: "GET",
        });
        const { scenarios } = await res.json();
        if (res?.ok) {
          console.log("SCENARIOS", scenarios)
          setAllScenarios(scenarios);
        } else {
          console.log("No data yet");
        }
      } catch (error) {
        console.error("Error fetching scenario data");
      }
    };
    fetchAllScenario();
  },[]);
  const [appData, setAppData] = useState<appData[]>([]);

   useEffect(() => {
      const fetchAppData = async () => {
        try {
          const appsres = await fetch("/api/dashboard/appData", {
            method: "GET",
          });
          const { apps } = await appsres.json();
          if (appsres?.ok) {
            setAppData(apps);
          }
        } catch (error) {
          console.error("Error fetching public template data");
        }
      };
      fetchAppData();
    }, []);

  // const formattedResetDate = activePlan?.updatedAt
  //     ? dayjs(activePlan.updatedAt).format("MMM DD, YYYY")
  //     : "N/A";
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">All scenarios</h1>
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
          className="px-2 py-1  rounded-lg border flex items-center cursor-pointer  gap-2 border-gray-200 bg-white"
        >
          <MdFilterList />
          {fil}
        </button>
        <button
          onClick={() => setOpenAZ(!openAZ)}
          className="px-2 py-1 rounded-lg border cursor-pointer flex items-center gap-2 border-gray-200 bg-white"
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
                setFillAZ("Name: A-Z");
              }}
              className={`flex items-center px-5 py-2 w-[95%] ${fil == "Name: A-Z" ? "bg-pink-50" : "bg-white"} rounded-md  gap-2`}
            >
              <FaCheck
                className={`${fil == "Name: A-Z" ? "inline" : "hidden"}`}
              />
              <span>Name: A-Z</span>
            </button>
            <button
              onClick={() => {
                setOpenAZ(!openAZ);

                setFil("Name: Z-A");
              }}
              className={`flex items-center px-5 py-2 w-[95%] ${fil == "Name: Z-A" ? "bg-pink-50" : "bg-white"} rounded-md  gap-2`}
            >
              <FaCheck
                className={`${fil == "Name: Z-A" ? "inline" : "hidden"}`}
              />
              <p>Name: Z-A</p>
            </button>
            <div className="w-full my-2 h-px bg-gray-300"></div>
            <button
              onClick={() => {
                setOpenAZ(!openAZ);

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
                setOpenAZ(!openAZ);

                setFil("Created: newest");
              }}
              className={`flex items-center px-5 py-2 w-[95%] ${fil == "Created: newest" ? "bg-pink-50" : "bg-white"} rounded-md  gap-2`}
            >
              <FaCheck
                className={`${fil == "Created: newest" ? "inline" : "hidden"}`}
              />
              <span>Created: newest</span>
            </button>
            <button
              onClick={() => {
                setOpenAZ(!openAZ);

                setFil("Created: oldest");
              }}
              className={`flex items-center px-5 py-2 w-[95%] ${fil == "Created: oldest" ? "bg-pink-50" : "bg-white"} rounded-md  gap-2`}
            >
              <FaCheck
                className={`${fil == "Created: oldest" ? "inline" : "hidden"}`}
              />
              <span>Created: oldest</span>
            </button>
            <div className="w-full h-px my-2 bg-gray-300"></div>

            <button
              onClick={() => {
                setOpenAZ(!openAZ);

                setFil("Credit usage: highest");
              }}
              className={`flex items-center px-5 py-2 w-[95%] ${fil == "Credit usage: highest" ? "bg-pink-50" : "bg-white"} rounded-md  gap-2`}
            >
              <FaCheck
                className={`${fil == "Credit usage: highest" ? "inline" : "hidden"}`}
              />
              <span>Credit usage: highest (30)</span>
            </button>
          </div>
        )}
      </div>
      {allScenarios.length === 0 ? (
        <>
          <h1 className="text-center wrap-break-word text-gray-600 font-medium pt-10">
            You haven't created any scenarios yet
          </h1>

          <div className="max-w-[90%] px-10 flex justify-center items-center space-y-5 flex-col rounded-lg py-6 bg-white border border-gray-300 mx-auto">
            <div className="relative w-50 h-28">
              <div className=" absolute left-10 top-5 text-5xl flex items-center justify-center p-3 rounded-full bg-[#b55dcd] text-white">
                <HiPlus />
              </div>
              <div className=" absolute left-25 -top-2 text-lg p-3 flex items-center justify-center  rounded-full bg-[#e38eff] text-white">
                <BsCheckLg />
              </div>
              <div className=" absolute right-8 top-8 text-2xl p-3 flex items-center justify-center rounded-full bg-[#724ebf] text-white">
                <CiMail />
              </div>
            </div>
            <h1 className="font-semibold">Create your first Scenario</h1>
            <p className="text-sm text-gray-600 wrap-break-word text-center">
              In order for Make to automate your tasks for you, you have to
              create a scenario. Open the builder to create your first scenario
              or browse our templates for inspiration and easy start.
            </p>

            <div className="flex gap-5">
              <button className="px-4 py-1 font-semibold bg-purple-500 text-white text-sm rounded-lg">
                Open scenarios builder
              </button>
              <button className="px-4 py-1 font-medium bg-white  border border-gray-300 text-sm rounded-lg">
                Open scenarios builder
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full">
          {allScenarios.map((scenario, index) => (
            <div
              key={index}
              className="w-full bg-white border rounded-2xl my-5 px-5 py-3 border-gray-300"
            >
              <div className="flex  items-center flex-col sm:flex-row gap-5 sm:justify-between">
                <div className="flex gap-5">
                  <div
                    className="flex items-center transition-all duration-300 
                group-hover:opacity-0 group-hover:-translate-y-2"
                  >
                    {scenario?.template.templateApps.map((d:string, i:number)  => {
                      const app = appData.find((app) => app.name === d);

                      if (!app) return null;

                      return (
                        <div
                          key={i}
                          className={`p-2 ${
                            i !== 0 ? "-ml-3 border border-white" : "ml-0"
                          } h-12 w-12 rounded-full`}
                          style={{ backgroundColor: app.theme }}
                        >
                          <Image
                          width={32}
                          height={32}
                            className="h-8 w-8 rounded-full object-contain"
                            src={app.imageUrl}
                            alt={app.name}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="">
                    <h1 className="text-lg font-bold wrap-break-word">{scenario?.template.title}</h1>
                    <div className="flex gap-2  text-sm items-center">
                      <div className="flex gap-2 items-center">
                        <div
                          title={`Credits Usage\nSince ${dayjs(scenario?.template.createdAt).format("DD MMM YYYY, hh:mm A")}`}
                          className="flex gap-1 items-center"
                        >
                          <MdOutlineFiberSmartRecord />
                          <span>0</span>
                        </div>
                        <div
                          title={`Data transfer\nSince ${dayjs(scenario?.template.createdAt).format("DD MMM YYYY, hh:mm A")}`}
                          className="flex gap-1 items-center"
                        >
                          <IoSwapHorizontal />
                          <span>0</span>
                        </div>
                      </div>

                      <div
                        title={`Username\n${scenario?.user?.email}`}
                        className="flex gap-2 wrap-break-word items-center"
                      >
                        <FaRegUser />
                        <span>Ayush Verma</span>
                      </div>

                      <div
                        title={`Creation Date`}
                        className="flex gap-2 wrap-break-word items-center"
                      >
                        <MdOutlineDateRange />
                        <span>{dayjs(scenario.createdAt).format("DD MMM YYYY")}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 text-[18px] items-center">
                  <BsLightning />
                  <button
                    onClick={() => setEnabled(!enabled)}
                    className={`w-8 h-5 flex items-center rounded-full p-1 transition-all duration-300 ${
                      enabled ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-all duration-300 ${
                        enabled ? "translate-x-3" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <div className="p-2 rounded-lg border-gray-200">
                    <BsThreeDotsVertical />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPageScenario;
