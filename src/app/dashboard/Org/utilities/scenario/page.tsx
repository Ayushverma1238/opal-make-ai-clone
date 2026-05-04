"use client";

import { Tags } from "lucide-react";
import Link from "next/link";
import { PiFunnel } from "react-icons/pi";

const ScenarioProperty = () => {
  return (
    <>
      <div className="px-[9vw] py-6 space-y-7 max-w-5xl mx-auto">
        {/* Top Section */}
        <div className="p-6 w-full bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-center flex-col gap-5 text-center">
            <h1 className="text-2xl font-semibold wrap-break-word">
              Custom scenario properties
            </h1>

            <p className="text-gray-600 wrap-break-word">
              Keep your long list of scenarios organized.
              <Link href="#" className="text-purple-500 hover:underline">
                {" "}
                Learn more{" "}
              </Link>
              about custom scenario properties available on the Enterprise plan.
            </p>

            <button className="px-4 py-2 bg-[#6d00cc] rounded-lg text-white font-medium hover:bg-purple-700 transition">
              Talk to sales
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-white p-6 flex flex-col items-center text-center space-y-4 rounded-lg border border-gray-200">
            <PiFunnel className="h-16 w-16 rounded-full p-3 text-white bg-[#e845f9]"/>
            <h1 className="font-semibold text-lg text-gray-800">
              Scenario filtering
            </h1>
            <p className="text-gray-600">
              Use custom scenario properties to narrow down that long list so
              you can focus on automating.
            </p>
          </div>

          <div className="bg-white p-6 flex flex-col items-center text-center space-y-4 rounded-lg border border-gray-200">
            <Tags className="h-16 w-16 rounded-full p-3 text-white bg-[#e845f9]"/>
           
            <h1 className="font-semibold text-lg text-gray-800">
              Enhanced scenario information
            </h1>
            <p className="text-gray-600">
              Create custom scenario properties to include the information you
              need in your scenario list.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScenarioProperty;
