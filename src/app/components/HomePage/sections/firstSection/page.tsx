import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import Image from "next/image";
const FirstSection = () => {
  const logos = [
    "/logos/Bamboo_HR_logo__1_.png",
    "/logos/BNY_logo_2x.png",
    "/logos/Bolt_logo_2x.png",
    "/logos/Finn_logo_2x.png",
    "/logos/fonds-finanz_2x.png",
    "/logos/gojob_2x.png",
    "/logos/tally_2x.png",
    "/logos/perk_logo__.png",
  ];

  return (
    <div className="relative w-full py-25 bg-[#220041]">
      <div className="top px-5 overflow-x-hidden flex lg:flex-row flex-col-reverse items-center justify-center gap-10 h-[80%] w-[90%] mx-auto">
        <div className="left flex flex-col gap-8">
          <h1 className="text-5xl font-bold ">
            Visual AI workflow automation that puts teams in control
          </h1>
          <h3 className="text-lg font-semibold">
            Build and manage automations and AI agents on one visual platform.
            See the logic. Trust the solution. Scale with confidence.
          </h3>
          <div className="flex gap-6">
            <Link
              href="/register"
              className="inline-block py-4 px-6 rounded-xl text-lg text-white
  bg-linear-to-r from-purple-700 to-pink-600
  ring-1 ring-white
  hover:shadow-[0_10px_30px_rgba(168,85,247,0.5),0_10px_30px_rgba(236,72,153,0.5)] transition duration-200"
            >
              Get Started Free
            </Link>
            <button className="py-4 rounded-xl px-6 bg-linear-to-r ring ring-white from-gray-800 to-gray-600">
              <Link className="text-lg" href="#">
                Talk to sales
              </Link>
            </button>
          </div>
          <div className="flex gap-5">
            <p className="flex gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <span>No credit card required</span>
            </p>
            <p className="flex gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <span>No time limit on Free plan</span>
            </p>
          </div>
        </div>
        <div className="right  px-20">
          <video
            className="mix-blend-screen bg-transparent"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/Homepage-hero-video.webm" type="video/webm" />
          </video>
        </div>
      </div>
      {/* Slider  */}
      {/* Slider */}
      <div className="overflow-hidden w-[85%] mx-auto pt-10">
        <div className="flex w-max animate-scroll gap-16">
          {[...logos, ...logos].map((logo, i) => (
            <Image
              key={i}
              src={logo}
              height={48}
              className="h-12 object-contain opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition duration-300"
              alt="logo"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
