"use client"
import { ClipboardList } from "lucide-react";
import Link from "next/link";
import { TiWorld } from "react-icons/ti";
import { FaUserFriends } from "react-icons/fa";

const Fifth = () => {
  const fifthData = [
    {
      icon: <ClipboardList size={28} />,
      title: "Find a partner",
      description: "Find the perfect partner to support your business needs",
    },
    {
      icon: <FaUserFriends size={28} />,
      title: "Become a partner",
      description: "Help your customers automate anything with Make",
    },
    {
      icon: (
        <svg
          stroke="black"
          fill="black"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="28px"
          width="28px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 3H4c-1.1 0-2 .9-2 2v3h2V5h16v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>

          <path d="M2 18v3h3c0-1.66-1.34-3-3-3z"></path>
          <path d="M2 14v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7z"></path>
          <path d="M2 10v2a9 9 0 019 9h2c0-6.08-4.93-11-11-11z"></path>

          <path d="M11 11l3 2-3 2v-4z"></path>

          <path d="M12 6L8 9l4 2 4-2-4-3z"></path>
        </svg>
      ),
      title: "Digital Education Program",
      description: "Get free professional access to Make for all your students",
    },
  ];

  return (
    <div className="absolute top-10 left-0 w-100 bg-white shadow-lg rounded-xl">
      <div className="flex flex-col px-4 py-2">
        {fifthData.map((item, index) => (
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

export default Fifth;
