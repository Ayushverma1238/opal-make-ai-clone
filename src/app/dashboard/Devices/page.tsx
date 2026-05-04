import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const DataStorePage = () => {
  return (
    <div className="p-6 space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-700">Devices</h1>
        <button className="px-3 py-2 flex items-center bg-purple-700 text-sm text-white font-semibold rounded-lg">
          <FaPlus /> Add device
        </button>
      </div>

      <div className="w-[70%] p-6 mx-auto">
        <p className="text-center text-gray-500 font-medium">
          You haven't added any devices yet
        </p>

        <div className="w-full bg-white border rounded-xl p-10 mt-10 flex flex-col gap-5 items-center border-gray-300">
          <Image
          height={100}
            className="h-25 object-cover"
            src="https://cdn.candu.ai/cdn-cgi/image/width=170px,dpr=2/https://media.candulabs.com/1908/devices.png"
            alt="roundedimage"
          />
          <h1 className="font-semibold text-gray-700 text-sm text-center">
            Access Make from anywhere with our mobile apps
          </h1>
          <p className="font-medium text-sm text-center text-gray-500 wrap-break-word">
            To get started, add your iOS or Android device to your Make account.{" "}
            <b className="text-gray-700"> Click 'Add Device'</b> in the
            top-right corner.
          </p>
        </div>
      </div>
      <h1 className="text-sm text-center text-gray-500">
        Learn more about adding{" "}
        <Link
          href="#"
          className="text-purple-500 hover:underline font-semibold"
        >
          Devices
        </Link>
      </h1>
    </div>
  );
};

export default DataStorePage;
