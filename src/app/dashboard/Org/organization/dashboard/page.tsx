"use client";

import { Plan, Subscription, Usage } from "@/app/types/subscription";
import { ArrowUpRight, ExternalLink, MoveUpRight, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiCircleQuestion } from "react-icons/ci";
import { FaSlack } from "react-icons/fa";
import { MdOutlineFiberSmartRecord } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { TbWorld } from "react-icons/tb";

const DashboardPage = () => {
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [leftPlan, setLeftPlan] = useState<Usage | null>(null);
  const [subscriptionData, setSubscriptionData] = useState<Subscription | null>(
    null,
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/dashboard/org/dashboard", {
          method: "GET",
        });

        const { plan, usage, subscription } = await res.json();
        if (res?.ok) {
          setActivePlan(plan);
          setLeftPlan(usage);
          setSubscriptionData(subscription);
        } else {
          console.log("Error dashboard data");
        }
      } catch (error) {
        console.error("Error fetching dashboard Data");
      }
    };
    fetchUser();
  }, []);

  function getDaysLeft(endDate: string | Date | null) {
    if (!endDate) return null; // lifetime / free

    const diff = new Date(endDate).getTime() - Date.now();

    if (diff <= 0) return 0; // expired

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  const daysLeft = getDaysLeft(subscriptionData?.endDate || null);

  const TOTAL_DAYS = 30;

  const progress =
    daysLeft !== null
      ? Math.max(0, Math.min(100, (daysLeft / TOTAL_DAYS) * 100))
      : 0;

  const radius = 22;
  const stroke = 6;

  const size = radius * 2 + stroke;
  const center = size / 2;

  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - (progress / 100) * circumference;
  return (
    <div className="p-6 ">
      <h1 className="text-sm text-purple-600 font-semibold">Organization</h1>
      <h1 className=" text-lg font-semibold">My Organization</h1>
      <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3  gap-4 py-5 flex-wrap">
        <div className="flex gap-4 pl-4 pr-8 py-6 rounded-xl bg-white">
          <div className="bg-purple p-2 w-10 items-center flex justify-center h-10 bg-purple-300 rounded-full">
            <MdOutlineFiberSmartRecord />
          </div>
          <div>
            <h2 className=" text-gray-500 font-semibold text-[13px]">
              Average daily usage
            </h2>
            <div className="flex gap-2 items-center">
              <span className="font-semibold">
                {leftPlan?.averageDailyUsage}
              </span>
              <span className="text-sm  text-gray-500">
                {leftPlan?.averageDailyUsage}%
              </span>
              <CiCircleQuestion className="h-2.5 w-2.5" />
            </div>
          </div>
        </div>
        <div className="flex gap-4 pl-4 pr-8 py-6 rounded-xl bg-white">
          <div className="relative" style={{ width: size, height: size }}>
            <svg height={size} width={size}>
              {/* Background */}
              <circle
                stroke="#eee"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={center}
                cy={center}
              />

              {/* Progress */}
              <circle
                stroke="url(#gradient)"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={center}
                cy={center}
              />

              <defs>
                <linearGradient id="gradient">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold">
              {leftPlan?.creditsLeft}
            </div>
          </div>
          <div>
            <div className="flex gap-2 justify-between">
              <h2 className=" text-gray-500 wrap-break-word font-semibold text-[13px]">
                Credits left
              </h2>
              <button>
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <span className="font-semibold">{leftPlan?.creditsLeft}</span>
              <span className="text-sm  text-gray-500">
                /{activePlan?.credits}
              </span>
              <CiCircleQuestion className="h-2.5 w-2.5" />
            </div>
          </div>
        </div>
        <div className="flex gap-4 pl-4 pr-8 py-6 rounded-xl bg-white">
          <div className="relative" style={{ width: size, height: size }}>
            <svg height={size} width={size}>
              {/* Background */}
              <circle
                stroke="#eee"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={center}
                cy={center}
              />

              {/* Progress */}
              <circle
                stroke="url(#gradient)"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={center}
                cy={center}
              />

              <defs>
                <linearGradient id="gradient">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold">
              {daysLeft}
            </div>
          </div>

          <div>
            <h2 className=" text-gray-500 font-semibold text-[13px]">
              Usage reset in
            </h2>
            <div className="flex gap-2 items-center">
              <span className="font-semibold">{daysLeft} Days</span>
              <CiCircleQuestion className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="flex gap-4 pl-4 pr-6 py-6 rounded-xl bg-white">
          <div className="bg-purple p-2 w-10 items-center flex justify-center h-10 bg-purple-300 rounded-full">
            <Share2 />
          </div>
          <div>
            <div className="flex gap-2 justify-between">
              <h2 className=" text-gray-500 wrap-break-word font-semibold text-[13px]">
                Active scenario
              </h2>
              <button className="text-purple-500 border-2 text-[12px] border-purple-500 bg-transparent px-1 py-0 rounded-md box-border">
                Upgrade
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <span className="font-semibold">{leftPlan?.activeScenarios}</span>
              <span className="text-sm  text-gray-500">
                /{activePlan?.maxScenarios}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-medium text-lg">Suggest apps</h1>
            <p className="text-[12px]">
              Choose an app to explore more resources and start automating!
            </p>
          </div>
          <Link
            href="#"
            className="text-purple-600 flex items-center gap-3 text-sm font-semibold"
          >
            <img
              className="w-5 h-5"
              src="https://media.candulabs.com/1908/rocket_1770745659721.png"
              alt=""
            />{" "}
            More resources
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-5 gap-4">
          <div className="flex gap-3 px-4 py-3 rounded-md ring ring-gray-200">
            <img
              className="w-6 h-6"
              src="https://media.candulabs.com/1908/local-agent-logo-256x256-1_1770712559927.png"
              alt="agents"
            />
            <h1 className="text-medium ">Make AI Agents</h1>
          </div>
          <div className="flex gap-3 px-4 py-3 rounded-md ring ring-gray-200">
            <img
              className="w-6 h-6"
              src="https://media.candulabs.com/1908/make-ai-tools_1749479699962.png"
              alt="agents"
            />
            <h1 className="text-medium ">Make AI Tools</h1>
          </div>
          <div className="flex gap-3 px-4 py-3 rounded-md ring ring-gray-200">
            <img
              className="w-6 h-6"
              src="https://media.candulabs.com/1908/openai.png"
              alt="agents"
            />
            <h1 className="text-medium ">OpenAI</h1>
          </div>
          <div className="flex gap-3 px-4 py-3 rounded-md ring ring-gray-200">
            <img
              className="w-6 h-6"
              src="https://media.candulabs.com/1908/google-gemini-ai_1740992335355.png"
              alt="agents"
            />
            <h1 className="text-medium ">Google Gemini AI</h1>
          </div>
          <div className="flex gap-3 px-4 py-3 rounded-md ring ring-gray-200">
            <img
              className="w-6 h-6"
              src="https://media.candulabs.com/1908/perplexity.png"
              alt="agents"
            />
            <h1 className="text-medium ">Perplexity</h1>
          </div>
          <div className="flex gap-3 px-4 py-3 rounded-md ring ring-gray-200">
            <img
              className="w-6 h-6"
              src="https://media.candulabs.com/1908/sheets.png"
              alt="agents"
            />
            <h1 className="text-medium ">Google Sheets</h1>
          </div>
          <div className="flex gap-3 px-4 py-3 rounded-md ring ring-gray-200">
            <img
              className="w-6 h-6"
              src="https://media.candulabs.com/1908/slack.png"
              alt="agents"
            />
            <h1 className="text-medium ">Slack</h1>
          </div>
          <div className="flex gap-3 px-4 py-3 rounded-md ring ring-gray-200">
            <img
              className="w-6 h-6"
              src="https://media.candulabs.com/1908/gmail.png"
              alt="agents"
            />
            <h1 className="text-medium ">Gmail</h1>
          </div>
        </div>

        <div className="flex items-center py-5 justify-between">
          <h1 className="font-medium text-lg">Trending Agents</h1>
          <Link
            href="#"
            className="text-purple-600 flex items-center gap-3 text-sm font-semibold"
          >
            Explore library of agents →
          </Link>
        </div>

        <div className="flex gap-5 my-5 flex-wrap">
          <div className="w-45 border h-55 relative p-3 rounded-lg border-gray-200">
            {/* Avatar group */}
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full border-2 border-white"
                src="https://media.candulabs.com/1908/gmail.png"
                alt=""
              />
              <img
                className="h-10 w-10 rounded-full border-2 border-white -ml-3"
                src="https://media.candulabs.com/1908/local-agent-logo-256x256-1_1770712559927.png"
                alt=""
              />
              <img
                className="h-10 w-10 rounded-full border-2 border-white -ml-3"
                src="https://cdn.candu.ai/cdn-cgi/image/width=38px,dpr=2/https://media.candulabs.com/1908/frame-11_1770726186478.png"
                alt=""
              />
              <div className="h-10 w-10 -ml-3 bg-gray-300 flex items-center justify-center font-semibold text-gray-600 rounded-full border-2 border-white">
                +2
              </div>
            </div>

            {/* Content */}
            <div className="flex pt-6 flex-col justify-between h-[calc(100%-40px)]">
              <h1 className="text-gray-700 text-sm font-semibold">
                Sales Outreach Agent
              </h1>

              <button className="bg-gray-200 text-gray-600 py-2 font-semibold rounded-md border border-gray-300">
                Try Now
              </button>
            </div>
          </div>
          <div className="w-45 border h-55 relative p-3 rounded-lg border-gray-200">
            {/* Avatar group */}
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full border-2 border-white"
                src="https://media.candulabs.com/1908/youtube.png"
                alt=""
              />
              <img
                className="h-10 w-10 rounded-full border-2 border-white -ml-3"
                src="https://cdn.candu.ai/cdn-cgi/image/width=38px,dpr=2/https://media.candulabs.com/1908/airtable_1770714876780.png"
                alt=""
              />
              <img
                className="h-10 w-10 rounded-full border-2 border-white -ml-3"
                src="https://cdn.candu.ai/cdn-cgi/image/width=38px,dpr=2/https://media.candulabs.com/1908/local-agent-logo-256x256-1_1770712559927.png"
                alt=""
              />
              <div className="h-10 w-10 -ml-3 bg-gray-300 flex items-center justify-center font-semibold text-gray-600 rounded-full border-2 border-white">
                +1
              </div>
            </div>

            {/* Content */}
            <div className="flex pt-6 flex-col justify-between h-[calc(100%-40px)]">
              <h1 className="text-gray-700 text-sm wrap-break-word font-semibold">
                Social Media Comment Responder
              </h1>

              <button className="bg-gray-200 text-gray-600 py-2 font-semibold rounded-md border border-gray-300">
                Try Now
              </button>
            </div>
          </div>
          <div className="w-45 border h-55 relative p-3 rounded-lg border-gray-200">
            {/* Avatar group */}
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full border-2 border-white"
                src="https://cdn.candu.ai/cdn-cgi/image/width=38px,dpr=2/https://media.candulabs.com/1908/slack.png"
                alt=""
              />
              <img
                className="h-10 w-10 rounded-full border-2 border-white -ml-3"
                src="https://cdn.candu.ai/cdn-cgi/image/width=38px,dpr=2/https://media.candulabs.com/1908/local-agent-logo-256x256-1_1770712559927.png"
                alt=""
              />
              <img
                className="h-10 w-10 rounded-full border-2 border-white -ml-3"
                src="https://cdn.candu.ai/cdn-cgi/image/width=38px,dpr=2/https://media.candulabs.com/1908/sheets.png"
                alt=""
              />
            </div>

            {/* Content */}
            <div className="flex pt-6 flex-col justify-between h-[calc(100%-40px)]">
              <h1 className="text-gray-700 wrap-break-word text-sm font-semibold">
                Inventory and Order Management Agent
              </h1>

              <button className="bg-gray-200 text-gray-600 py-2 font-semibold rounded-md border border-gray-300">
                Try Now
              </button>
            </div>
          </div>
          <div className="w-45 border h-55 relative p-3 rounded-lg border-gray-200">
            {/* Avatar group */}
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full border-2 border-white"
                src="https://cdn.candu.ai/cdn-cgi/image/width=38px,dpr=2/https://media.candulabs.com/1908/frame-1_1770719571910.png"
                alt=""
              />
              <img
                className="h-10 w-10 rounded-full border-2 border-white -ml-3"
                src="https://cdn.candu.ai/cdn-cgi/image/width=38px,dpr=2/https://media.candulabs.com/1908/frame-1_1770719571910.png"
                alt=""
              />
              <img
                className="h-10 w-10 rounded-full border-2 border-white -ml-3"
                src="https://cdn.candu.ai/cdn-cgi/image/width=38px,dpr=2/https://media.candulabs.com/1908/airtable_1770714876780.png"
                alt=""
              />
              <div className="h-10 w-10 -ml-3 bg-gray-300 flex items-center justify-center font-semibold text-gray-600 rounded-full border-2 border-white">
                +2
              </div>
            </div>

            {/* Content */}
            <div className="flex pt-6 flex-col justify-between h-[calc(100%-40px)]">
              <h1 className="text-gray-700 text-sm font-semibold">
                Market Research Analyst
              </h1>

              <button className="bg-gray-200 text-gray-600 py-2 font-semibold rounded-md border border-gray-300">
                Try Now
              </button>
            </div>
          </div>
        </div>

        <div
          className="relative w-full sm:w-80  h-50 rounded-2xl p-5 
                      bg-[#220041]
                      shadow-xl overflow-hidden"
        >
          {/* Top Right Arrow */}
          <ArrowUpRight
            className="absolute top-3 right-3 text-white opacity-70"
            size={18}
          />

          {/* Center Hex Glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-24 h-24 rounded-2xl 
                          bg-purple-600/40 blur-2xl"
            ></div>
          </div>

          {/* Hexagon */}
          <div className="relative inset-0 flex items-center justify-center">
            <div
              className="w-25 h-25 bg-linear-to-br from-purple-500 to-indigo-500 
                          rounded-full flex items-center justify-center shadow-lg"
            >
              {/* Star */}
              <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center">
                <img
                  className="text-purple-600"
                  src="https://media.candulabs.com/1908/local-agent-logo-256x256-1_1770712559927.png"
                  alt=""
                />
              </div>
            </div>

            {/* Floating Icons */}
            <div
              className="absolute p-2 top-1 left-6 sm:top-1 sm:left-15 w-10 h-10 rounded-full 
                        bg-transparent ring ring-purple-700 backdrop-blur-md flex items-center justify-center text-white text-sm"
            >
              <SiGmail className="h-7 w-7 text-center" />
            </div>

            <div
              className="absolute p-2 sm:bottom-10 -top-1 sm:top-0 right-8 sm:right-15 w-10 h-10 rounded-full 
                        bg-transparent ring ring-purple-700 backdrop-blur-md flex items-center justify-center text-white text-sm"
            >
              <FaSlack className="h-7 w-7 text-center" />
            </div>

            <div
              className="absolute bottom-1 sm:-bottom-7 p-2 right-5 sm:right-0 sm:left-27 w-10 h-10 rounded-full 
                        bg-transparent ring ring-purple-700 backdrop-blur-md flex items-center justify-center text-white text-sm"
            >
              <TbWorld className="h-7 w-7 text-center" />
            </div>
          </div>

          {/* Bottom Text */}
          <div className="absolute bottom-5 left-5 text-white font-semibold text-lg">
            Make AI Agents Resources
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
