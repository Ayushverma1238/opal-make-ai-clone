"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

type Data = {
  imageUrl: string;
  templateApps: string[];
  title: string;
  description: string;
  usedCount: number;
};

type appData = {
  imageUrl: string;
  name: string;
  theme: string;
};

const page = () => {
  const [teamTemplate, setTeamTemplate] = useState("");

  const [ptData, setPtData] = useState<Data[]>([]);
  const [appData, setAppData] = useState<appData[]>([]);

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const res = await fetch("/api/dashboard/template/public", {
          method: "GET",
        });
        const { templates } = await res.json();

        console.log("PUBLIC TEMPLATE", templates);
        if (res?.ok) {
          setPtData(templates);
        }
      } catch (error) {
        console.error("Error fetching public template data");
      }
    };
    fetchPublicData();
  }, []);

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const appsres = await fetch("/api/dashboard/appData", {
          method: "GET",
        });
        const { apps } = await appsres.json();
        if (appsres?.ok) {
          setAppData(apps);
        }
      } catch (error) {
        console.error("Error fetching public template data");
      }
    };
    fetchAppData();
  }, []);

  return (
    <div className="p-6 relative space-y-6">
      <div className="flex items-center sticky top-41 z-100 bg-gray-100 sm:top-21 justify-between">
        <h1 className="text-lg font-semibold text-gray-700">Team Templates</h1>
        <div className="flex items-center gap-5">
          <input
            onChange={(e) => setTeamTemplate(e.target.value)}
            className="text-lg font-medium rounded-lg px-3 py-1 focus:ring focus:outline-none focus:ring-gray-200 bg-white text-gray-600"
            name="publicTemplate"
            type="text"
            placeholder="Search by app or name "
          />
          <button className="px-3 py-1 rounded-lg flex gap-1 items-center bg-purple-700 text-white">
            <FaPlus /> New template
          </button>
        </div>
      </div>

      <div className="flex justify-center flex-col gap-5 p-6 max-w-2xl mx-auto items-center bg-white border border-gray-300 rounded-lg">
        <Image
          className="sm:h-25 h-20 sm:w-100 w-80 "
          src="https://eu1.make.com/static/img/empty_state_suggest_upgrade.png"
          alt="stateSuggest"
        />
        <h1 className="font-medium text-center text-gray-600">
          Templates for your team to share
        </h1>
        <p className="text-gray-500 text-sm text-center wrap-break-word">
          Team templates are a special feature of the Teams plan, letting you
          create and share templates exclusively with your team. Unlock this
          feature and take your efficiency and collaboration to the next level.
        </p>
        <button className="px-3 py-1 rounded-lg flex gap-1 items-center bg-purple-700 text-white">
          Upgrade to Teams
        </button>
      </div>
    </div>
  );
};

export default page;
