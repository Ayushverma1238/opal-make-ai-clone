"use client";
import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";

const ExploreHeading = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-between bg-purple-700 text-lg py-2 px-4">
      
      {/* Left side content */}
      <div className="flex items-center gap-2 justify-center w-full">
        <p>
          Explore our Library of Agents. Start building with pre-made AI Agent
          examples today!
        </p>
        <Link href="/library" className="underline">
          Browse the Library
        </Link>
      </div>

      {/* Right side button */}
      <button
        className="p-2 rounded-md cursor-pointer transition-colors"
        onClick={() => setIsOpen(false)}
        aria-label="Close"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default ExploreHeading;