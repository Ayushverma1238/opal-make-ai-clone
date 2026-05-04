"use client"
import { useState, useRef } from "react";
import { CiBullhorn } from "react-icons/ci";
import { ChartLine, Headset, Banknote, Flame } from "lucide-react";
import { TbMedicalCrossCircle } from "react-icons/tb";
import { FaComputer, FaUsers } from "react-icons/fa6";
import Link from "next/link";

type ItemProps = {
  index: number;
  icon: React.ReactNode;
  title: string;
  description: string;
};

const Third = () => {
  const topData = [
    {
      icon: <CiBullhorn />,
      title: "Marketing",
      description: "Drive faster growth with marketing...",
    },
    {
      icon: <ChartLine />,
      title: "Sales",
      description: "Level up your sales cycle to close more...",
    },
    {
      icon: <TbMedicalCrossCircle />,
      title: "Operations",
      description: "Get teams and tools working togather...",
    },
    {
      icon: <Headset />,
      title: "Customer Experience",
      description: "Take better care of customers with...",
    },
    {
      icon: <Banknote />,
      title: "Finance",
      description: "Manage times as well as you manage...",
    },
    {
      icon: <FaComputer />,
      title: "Information Technology",
      description: "Efficiently scale and control your IT...",
    },
    {
      icon: <FaUsers />,
      title: "People",
      description: "Get Your HR processes running...",
    },
    {
      icon: <Flame />,
      title: "Workplace Productivity",
      description: "Automate busy work to focus on what...",
    },
  ];
  const bottomData = [
    {
      title: "Social Media Posting",
      description: "More engagement,less efforts",
    },
    {
      title: "Lead Management",
      description: "Automate for more conversion",
    },
    {
      title: "Invoicing",
      description: "Save time on invoicing and billing",
    },
    {
      title: "Contracting",
      description: "Automate and make deals faster",
    },
    {
      title: "Email Marketing",
      description: "Increase your email conversion",
    },
    {
      title: "Content Creation",
      description: "Generate high quality content with AI",
    },
  ];

  return (
    <div className="absolute top-12 left-0 w-187.5 bg-white shadow-xl rounded-xl border border-gray-100">
      <div className="flex flex-col p-6 gap-6">
        {/* TOP SECTION */}
        <div>
          <h1 className="text-sm font-semibold text-gray-500 mb-3">
            Make across your business
          </h1>

          <div className="grid grid-cols-4 gap-3">
            {topData.map((item, index) => (
              <Link
                key={index}
                href="#"
                className="group flex gap-3 items-center p-3 rounded-lg transition-all duration-200 hover:bg-pink-50"
              >
                {/* Icon */}
                <div className="text-gray-700 group-hover:text-pink-500 text-lg">
                  {item.icon}
                </div>

                {/* Content */}
                <div>
                  <h2 className="text-sm font-semibold text-gray-900 group-hover:text-pink-500">
                    {item.title}
                  </h2>
                  <p className="text-xs text-gray-500 group-hover:text-pink-500">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div>
          <h1 className="text-sm font-semibold text-gray-500 mb-3">
            Popular automations
          </h1>

          <div className="grid grid-cols-3 gap-3">
            {bottomData.map((item, index) => (
              <Link
                key={index}
                href="#"
                className="group flex flex-col items-center p-3 rounded-lg transition-all duration-200 hover:bg-pink-50"
              >
                <h2 className="text-sm font-semibold text-gray-900 group-hover:text-pink-500">
                  {item.title}
                </h2>
                <p className="text-xs text-gray-500 group-hover:text-pink-500">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Third;
