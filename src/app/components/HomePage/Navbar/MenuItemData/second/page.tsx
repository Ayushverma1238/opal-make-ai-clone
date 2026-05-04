"use client"
import { Cpu, Grid2x2, Paperclip } from "lucide-react";
import Link from "next/link";
import { Grid2x2X } from "lucide-react";
import { VscSendToRemoteAgent } from "react-icons/vsc";
const Second = () => {
  const secondData = [
    {
      icon: <Cpu size={28} />,
      title: "Automation with AI",
      description: "Revolutionize your workflows with AI-powered automation.",
    },
    {
      icon: <VscSendToRemoteAgent size={28} />,
      title: "Agentic Automation",
      description:
        "AI powered automation that adapts in real time to your business needs.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2c-.78 5.16-4.84 9.22-10 10 5.16.78 9.22 4.84 10 10 .78-5.16 4.84-9.22 10-10-5.16-.78-9.22-4.84-10-10" />
        </svg>
      ),
      title: "Make AI Agents",
      description:
        "Build transparent AI agents that take action and orchestrate complex...",
    },
    {
      icon: <Grid2x2 size={28} />,
      title: "Library of Agents",
      description:
        "Explor ready-made AI agents you can deploy and adapt instantly.",
    },
    {
      icon: <Paperclip size={28} />,
      title: "Make MCP Server",
      description:
        "Connect your AI to real business actions securely and visually",
    },
    {
      icon: <Grid2x2X size={28} />,
      title: "Make AI apps",
      description: "Discover AI apps to power your next Make automation",
    },
  ];

  return (
    <div className="absolute top-10 left-0 w-100 bg-white shadow-lg rounded-xl">
      <div className="flex flex-col px-4 py-2">
        {secondData.map((item, index) => (
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

export default Second;
