import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const DataStorePage = () => {
  return (
    <div className="p-6 space-y-10">
        <div className="flex items-center justify-between">

      <h1 className="text-xl font-semibold text-gray-700">Data Store</h1>
      <button className="px-3 py-2 flex items-center bg-purple-700 text-sm text-white font-semibold rounded-lg">
            <FaPlus/> Open scenario builder
          </button>
        </div>

      <div className="w-[75%] p-6 mx-auto">
        <p className="text-center text-gray-500 font-medium">
          You haven't added any data stores yet
        </p>

        <div className="w-full bg-white border rounded-xl p-10 mt-10 flex flex-col gap-5 items-center border-gray-300">
          <Image
            className="h-30 w-30 object-cover"
            src="https://cdn.candu.ai/cdn-cgi/image/width=120px,dpr=2/https://media.candulabs.com/1908/data-store.png"
            alt="roundedimage"
          />
          <h1 className="font-semibold text-gray-700 text-sm text-center">
            Achieve more with built-in data storage
          </h1>
          <p className="font-medium text-sm text-center text-gray-500 wrap-break-word">
            Data stores are built-in databases inside Make that store and read
            information within a scenario, but also between multiple scenarios.
            <b className="text-gray-700">Click 'Add Data Store'</b> in the top-right corner to create a data
            store.
          </p>
          
        </div>
      </div>
      <h1 className="text-sm text-center text-gray-500">
        Learn more about using{" "}
        <Link
          href="#"
          className="text-purple-500 hover:underline font-semibold"
        >
          Data Stores
        </Link>
      </h1>
    </div>
  );
};

export default DataStorePage;
