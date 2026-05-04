"use client"
import { Trophy, NotebookText, Star, MessageCircleQuestionMark, Play } from "lucide-react";
import Link from "next/link";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";

const Forth = () => {
  const forthData = [
     {
      icon: <IoBookOutline size={28} />,
      title: "Blog",
      description: "Access popular guides, tips & stories about automation"
    },
    {
      icon: <Trophy size={28} />,
      title: "Success Stories",
      description: "How Make has helped organizations just like yours",
    },
    {
      icon: <NotebookText size={28} />,
      title: "How-to-guides",
      description: "Step-by-step tutorials for success",
    },
    {
      icon: <IoExtensionPuzzleOutline size={28} />,
      title: "Templates library",
      description: "Get started with our library of templates",
    },
    {
      icon: <FaGraduationCap size={28} />,
      title: "Make Academy",
      description: "Access eLearning content to learn with Make",
    },
    {
      icon: <Star size={28} />,
      title: "Make Community",
      description: "Connect with other Makers, exchange ideas & tips",
    },
    {
      icon: <MessageCircleQuestionMark size={28} />,
      title: "Help center",
      description: "Explore our documentation & resources",
    },
    {
      icon: <Play size={28} />,
      title: "Webinars",
      description: "Live expert-led learning sessions",
    },
  ];

  return (
    <div className="absolute top-10 left-0 w-100 h-[80vh] overflow-y-auto bg-white shadow-lg rounded-xl">
      <div className="flex flex-col px-4 py-2">
        {forthData.map((item, index) => (
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

export default Forth;