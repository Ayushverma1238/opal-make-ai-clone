"use client"
import { Zap, CirclePlus, MapPinned, Volume2 } from "lucide-react";
import Link from "next/link";
import { TiWorld } from "react-icons/ti";
import { FaUsers } from "react-icons/fa";

const First = () => {
  const firstData = [
    {
      icon: <Zap size={28} />,
      title: "Product Overview",
      description: "Find out more about the oral platform.",
    },
    {
      icon: <CirclePlus size={28} />,
      title: "Apps",
      description: "Browse our app library with over 2,000+ apps to connect.",
    },
    {
      icon: <TiWorld size={28} />,
      title: "Enterprise",
      description: "Scale securely with advanced features and dedicated support.",
    },
    {
      icon: <MapPinned size={28} />,
      title: "Make Grid",
      description: "Take control of your whole automated landscape.",
    },
    {
      icon: <Volume2 size={28} />,
      title: "What's new in Make",
      description: "Keep up with the latest product updates and improvements.",
    },
    {
      icon: <FaUsers size={28} />,
      title: "About us",
      description: "Learn more about our mission and values.",
    },
  ];

  return (
    <div className="absolute top-10 left-0 w-100 bg-white shadow-lg rounded-xl">
      <div className="flex flex-col px-4 py-2">
        {firstData.map((item, index) => (
          <Link
            key={index}
            href="#"
            className="flex gap-4 group group-hover:text-pink-500 items-center p-3 rounded-lg transition-all duration-200 hover:scale-[1.05] hover:bg-pink-50"
          >
            {/* Icon */}
            {/* Icon */}
            <div className="text-black group-hover:text-pink-500">
              {item.icon}
            </div>

            {/* Content */}
            <div className="flex flex-col items-start gap-1">
              <h2 className="font-semibold text-black group-hover:text-pink-500">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600 group-hover:text-pink-500">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default First;