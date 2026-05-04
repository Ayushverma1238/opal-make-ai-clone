"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiGift } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { GoQuestion } from "react-icons/go";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuExternalLink } from "react-icons/lu";
import { MdOutlineFiberSmartRecord } from "react-icons/md";
import dayjs from "dayjs";

const SubscriptionPage = () => {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [planData, setPlanData] = useState<any[]>([]);
  const [leftData, setLeftData] = useState<any | null>(null);
  const [activePlan, setActivePlan] = useState<any | null>(null);
  const [selected, setSelected] = useState<any | null>(null);
 

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const res = await fetch("/api/dashboard/org/subscription/allPlans", {
          method: "GET",
        });
        const { plans } = await res.json();
        if (res?.ok) {
          setPlanData(plans);
          setSelected(plans[0]);
        } else {
          console.log("Error plans data");
        }
      } catch (error) {
        console.error("Error fetching plan data");
      }
    };

    const fetchCurrentPlan = async () => {
      try {
        const res = await fetch("/api/dashboard/org/subscription", {
          method: "GET",
        });

        const { activePlan, leftData } = await res.json();

        if (res?.ok) {
          console.log("Active plan", activePlan);
          setActivePlan(activePlan);
          setLeftData(leftData);

        }
      } catch (error) {
        console.log("Error active plan");
      }
    };
    fetchPlanData();
    fetchCurrentPlan();
  }, []);

  

  const creditsleft = activePlan?.plan?.credits - leftData?.creditsLeft;

  const formattedResetDate = activePlan?.updatedAt
    ? dayjs(activePlan.updatedAt).format("MMM DD, YYYY")
    : "N/A";
  const dataUsagePer = (creditsleft * 100) / activePlan?.plan?.credits;

  return (
    <div className="p-6 space-y-6 ">
      <h1 className="font-semibold text-lg">Subscription</h1>

      <div className="bg-white space-y-4 p-5 rounded-xl ">
        <div className="font-semibold text-gray-600 flex items-center  justify-between">
          <div className="flex items-center justify-between w-1/2 gap-5 md:gap-10">
            <h1 className="">My Plans</h1>
            <div className=" flex items-center gap-3">
              <span className="px-2 text-sm rounded-2xl bg-gray-700 text-white">
                {activePlan?.plan?.name}
              </span>
              <p>{activePlan?.plan?.credits} credits/month</p>
            </div>
          </div>
          <button className="px-3 py-1 flex items-center gap-2 rounded-lg text-gray-500 font-medium bg-transparent border border-gray-200">
            {" "}
            <BiGift /> Reedem coupon
          </button>
        </div>
        <div className="h-px bg-gray-200 w-full" />
        <div className="font-semibold text-gray-600 flex items-center  justify-between">
          <div className="flex items-center justify-between w-1/2 gap-5 md:gap-10">
            <h1 className="">Billing</h1>
            <div className=" flex items-center gap-3">
              <p>$0.00 billed monthly</p>
            </div>
          </div>
          <button className="px-3 py-1 flex items-center gap-2 rounded-lg text-gray-500 font-medium bg-transparent border border-gray-200">
            Add payment method
          </button>
        </div>
        <div className="h-px bg-gray-200 w-full" />
        <div className="font-semibold text-gray-600 flex  justify-between">
          <div className="flex items-center justify-between w-1/2 gap-5 md:gap-10">
            <div className="flex flex-col gap-1">
              <h1 className="">Credit</h1>
              <Link
                href="#"
                className="font-medium text-purple-500 text-sm flex items-center gap-2"
              >
                <GoQuestion /> How do credits work?
              </Link>
            </div>
            <div className=" flex flex-col items-center gap-1">
              <div className="px-2 text-sm flex gap-2 items-center">
                <MdOutlineFiberSmartRecord />{" "}
                <span className="font-semibold">
                  {creditsleft} / {activePlan?.plan?.credits} credits used (
                  {dataUsagePer}%)
                </span>
              </div>
              <div className="h-1 rounded-2xl bg-gray-400 w-full" />
              <p className="text-sm font-normal">
                Usage resets on {formattedResetDate}
              </p>
            </div>
          </div>
          <button
            disabled
            className="px-3 py-1 flex items-center gap-2 disabled:bg-gray-400 rounded-lg text-gray-500 font-medium bg-transparent border border-gray-200"
          >
            {" "}
            <MdOutlineFiberSmartRecord /> Buy extra
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 ">
        <div className="flex justify-between pb-5 items-center">
          <h1 className="font-semibold text-gray-800">Pricing</h1>
          <div className="flex text-sm  items-center gap-4 text-gray-500">
            <span className="text-green-500">Save up to 15%</span>with annual
            <div
              onClick={() => setEnabled(!enabled)}
              className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition ${
                enabled ? "bg-purple-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  enabled ? "translate-x-5" : "translate-x-0"
                }`}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 grid-cols:1 md:grid-cols-2 pb-5 lg:grid-cols-3">
          <div className="flex flex-col bg-gray-50 border border-gray-200 rounded-xl px-5 py-8 items-center gap-5">
            <div className="flex flex-col h-50 w-full justify-between items-center">
              <div className="flex flex-col items-center gap-5">
                <h1 className="text-lg font-semibold">Free</h1>
                <h2 className="text-2xl  font-bold">
                  $0{" "}
                  <sup className="text-gray-400 text-sm font-medium">/mo</sup>
                </h2>
              </div>

              <div className="flex flex-col gap-5 w-full">
                <button
                  disabled
                  className="w-full rounded-lg font-semibold py-1 text-gray-300 disabled:bg-gray-400"
                >
                  Your Plan
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <span className="font-bold text-gray-800 text-sm">FREE</span>{" "}
                plan feature
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck /> No-code workflow builder
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />
                3000+ standard apps
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />
                Unlimited users
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />2 active scenarios
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck /> 5min scenario execution time
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />5 MB file size
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck /> 15min interval between scheduled scenario executions
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck /> Real-time execution monitoring
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck /> Custom apps
              </p>
            </div>
          </div>

          <div className="flex flex-col bg-linear-to-b from-pink-50 ring ring-purple-400 to-gray-50 border border-gray-200 rounded-xl px-5 py-8 items-center gap-5">
            <div className="flex h-50  flex-col w-full justify-between items-center">
              <div className="flex flex-col items-center gap-5">
                <h1 className="text-lg font-semibold">Make Plan</h1>
                <h2 className="text-2xl  font-bold">
                  ${enabled ? (selected?.price * 85/100).toFixed(2) : selected?.price}{" "}
                  <sup className="text-gray-400 text-sm font-medium">/mo</sup>
                </h2>
              </div>
              <div className="flex flex-col gap-5 w-full">
                <div className="relative w-full">
                  {/* Selected box */}
                  <div
                    onClick={() => {
                      setOpen(!open);
                      setIsClicked(!isClicked);
                    }}
                    className="w-full px-3 flex justify-between items-center py-2 border border-gray-600 rounded-lg cursor-pointer bg-white"
                  >
                    {selected
                      ? `${selected?.credits} credits/mo - $${enabled ? (selected?.price * 85 /100).toFixed(2) :selected?.price}`
                      : "Select Plan"}

                    {isClicked ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>

                  {/* Dropdown */}
                  {open && (
                    <div className="absolute w-full mt-1 h-75 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                      {planData.map((data, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setSelected(data);
                            setOpen(false);
                          }}
                          className="px-3 py-1 hover:bg-gray-100 border-b border-gray-100 cursor-pointer "
                        >
                          <h2 className="font-semibold text-gray-800">
                            {data.credits} credits/mo
                          </h2>
                          <p className="text-purple-500 font-semibold">
                            ${enabled ? (data?.price * 85/100).toFixed(2) :data.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button className="w-full rounded-lg font-semibold py-1 text-white bg-purple-600">
                  Upgrade
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                Additionally to{" "}
                <span className="font-bold text-gray-800 text-sm">FREE</span>
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />
                Unlimited number of active scenarios
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />
                40min scenario execution time
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />
                1min interval between scheduled scenario executions
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />
                Access to 300+ Make API endpoints
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck /> Full-text execution log search
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />
                Credits usage flexibility with yearly billing
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck /> Teams and team Roles
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck /> Create & share scenario templates
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />
                500 MB file size
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />
                High priority scenario execution
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />
                Access to enterprise apps
              </p>
            </div>
          </div>

          <div className="flex flex-col bg-gray-50 border border-gray-200 rounded-xl px-5 py-8 items-center gap-5">
            <div className="flex flex-col h-50 w-full justify-between items-center">
              <div className="flex flex-col items-center gap-5">
                <h1 className="text-lg font-semibold">Company</h1>
                <h2 className="text-2xl  font-bold">Custome Pricing</h2>
              </div>

              <div className="flex flex-col gap-5 w-full">
                <button className="w-full rounded-lg font-semibold py-1 text-gray-500 bg-white border border-gray-300">
                  Talk to Sales
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                Additionally to{" "}
                <span className="font-bold text-gray-800 text-sm">
                  MAKE PLAN
                </span>
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />
                Access to enterprise apps
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />
                Information security compliance support (ISO 27001)
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />
                1000 MB file size
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />
                Company single sign-on (SSO) access control
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />
                Credit overage protection
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />
                Custom functions
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />
                Access to Technical Account Manager
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />
                Highest priority customer support
              </p>
              <p className="text-[12px] wrap-break-word text-gray-400 flex gap-2">
                <FaCheck />
                Execution Log Storage for 60 days
              </p>
            </div>
          </div>
        </div>

        <Link
          href="#"
          className="items-center text-sm flex justify-center hover:underine gap-3 text-purple-500"
        >
          Compare all plan features <LuExternalLink />{" "}
        </Link>
      </div>
    </div>
  );
};

export default SubscriptionPage;
