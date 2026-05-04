import React from "react";
import { FaPlus } from "react-icons/fa";
import { GrSearchAdvanced } from "react-icons/gr";
import { LuCircleCheckBig } from "react-icons/lu";
import { RiMailSendFill } from "react-icons/ri";

const AiAgentPage = () => {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row ">
        <h1 className="text-xl font-bold text-gray-700">AI Agents</h1>
        <div className="flex grow justify-center">
          <div className="rounded-lg px-6 w-175">
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-gray-700">
                Build workflows that think and adapt
              </h3>
              <p className="font-medium text-sm text-gray-500">
                Make AI Agents turn complex inputs into smart decisions and
                actions, all on one canvas.
              </p>
            </div>

            <div className="w-full p-6 mt-6 rounded-lg bg-white border border-gray-300 flex flex-col md:flex-row gap-5">
              <div className="left flex flex-col gap-5 justify-center">
                <h1 className="font-semibold">
                  Create your first agent from scratch
                </h1>
                <button className="flex w-fit rounded-lg gap-3 text-sm px-3 py-2 bg-purple-500 text-white">
                  <FaPlus />
                  Create agents
                </button>
              </div>

              <div className="flex-1  bg-white flex items-center justify-center">
                <div className="relative w-full aspect-video rounded-[18px] overflow-hidden bg-[#120321] group cursor-pointer shadow-lg">
                  {/* YouTube Iframe */}
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/noM1F2MtxVk?si=q0Gf47HXtP-Y1eSD"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>

                  {/* Custom Overlay (Optional: only if you want to match the thumbnail look exactly) */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="w-full p-6 mt-6 rounded-lg bg-white border border-gray-300 flex flex-col gap-5">
              <div className="flex justify-between wrap-break-word items-center w-full">
                <div>
                  <h2 className="font-semibold text-gray-700">
                    Explore the library of agents
                  </h2>
                  <p className="text-sm text-gray-500">
                    Start with a pre-made agent or find inspiration for your own
                    workflows.
                  </p>
                </div>
                <button className="text-purple-500 font-semibold text-sm">
                  View all
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-linear-to-r from-purple-50 to-pink-50 rounded-lg border border-gray-300 wrap-break-word">
                  <div className="w-8 h-8 border border-gray-200 rounded bg-white p-1">
                    <RiMailSendFill className="text-purple-500 text-xl" />
                  </div>
                  <h1 className=" font-semibold text-sm pt-5">
                    Start with a pre-made agent or find inspiration for your own
                    workflows.
                  </h1>
                </div>
                <div className="p-5 bg-linear-to-r from-purple-50 to-pink-50 rounded-lg border border-gray-300 wrap-break-word">
                  <div className="w-8 h-8 border border-gray-200 rounded bg-white p-1">
                    <GrSearchAdvanced className="text-purple-500 text-xl" />
                  </div>{" "}
                  <h1 className=" font-semibold text-sm pt-5">
                    Get the latest news from your industry.
                  </h1>
                </div>
                <div className="p-5 bg-linear-to-r from-purple-50 to-pink-50 rounded-lg border border-gray-300 wrap-break-word">
                  <div className="w-8 h-8 border border-gray-200 rounded bg-white p-1">
                    <LuCircleCheckBig className="text-purple-500 text-xl" />
                  </div>{" "}
                  <h1 className=" font-semibold text-sm pt-5">
                    Start with a pre-made agent or find inspiration for your own
                    workflows.
                  </h1>
                </div>
              </div>
            </div>

            <div className="w-full mt-6 grid gap-5 grid-cols-2 rounded-lg">
              <div className="bg-white border w-full px-3 py-2 rounded-lg  flex items-center justify-between border-gray-300 ">
                <h1 className="font-medium text-gray-700">Help Center</h1>
                <button className="text-purple-500">Visit</button>
              </div>
              <div className="bg-white border w-full px-3 py-2 rounded-lg  flex items-center justify-between border-gray-300 ">
                <h1 className="font-medium text-gray-700">Resourse Hub</h1>
                <button className="text-purple-500">Visit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAgentPage;
