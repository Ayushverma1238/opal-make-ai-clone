import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const DataStorePage = () => {
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-700">Data Structure</h1>
        <button className="px-3 py-2 flex items-center bg-purple-700 text-sm text-white font-semibold rounded-lg">
          <FaPlus /> Add data structure
        </button>
      </div>

      <div className="w-[70%] p-6 mx-auto">
        <p className="text-center text-gray-500 font-medium">
          You haven't created any data structures yet
        </p>

        <div className="w-full bg-white border rounded-xl p-10 mt-10 flex flex-col gap-5 items-center border-gray-300">
          <Image
            className="h-25 object-cover"
            src="https://cdn.candu.ai/cdn-cgi/image/trim=236.3077;0;26.2564;0/https://media.candulabs.com/1908/data-structures.png"
            alt="roundedimage"
          />
          <h1 className="font-semibold text-gray-700 text-sm text-center">
            Define structures to work smoothly with data
          </h1>
          <p className="font-medium text-sm text-center text-gray-500 wrap-break-word">
            A data structure is a document that describes the format of the data
            being transferred to Make, most commonly used for
            serializing/parsing data formats such as <span className="text-purple-500 text-[16px]">JSON, XML, and CSV.</span> Data
            Structures can be created in the settings of the module.
          </p>
        </div>
      </div>
      <h1 className="text-sm text-center text-gray-500">
        Learn more about using{" "}
        <Link
          href="#"
          className="text-purple-500 hover:underline font-semibold"
        >
          Data Structures
        </Link>
      </h1>
    </div>
  );
};

export default DataStorePage;
