"use client";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { appDataUrl } from "@/app/utils/appData";
import Image from "next/image";

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

const PublicTemplates = () => {
  const [ptData, setPtData] = useState<Data[]>([]);
  const [appData, setAppData] = useState<appData[]>([]);

  const [publicTemplates, setPublicTemplates] = useState("");

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
      <div className="flex items-center sticky pt-6 top-36 z-100 bg-gray-100  sm:top-16  justify-between">
        <h1 className="text-lg font-semibold text-gray-700">
          Public Templates
        </h1>
        <div className="flex items-center gap-5">
          <input
            onChange={(e) => setPublicTemplates(e.target.value)}
            className="text-lg font-medium rounded-lg px-3 py-1 focus:ring focus:outline-none focus:ring-gray-200 bg-white text-gray-600"
            name="publicTemplate"
            type="text"
            value={publicTemplates}
            placeholder="Search by app or name "
          />
          <button className="px-3 py-1 rounded-lg flex gap-1 items-center bg-purple-700 text-white">
            <FaPlus /> New template
          </button>
        </div>
      </div>

      <div className="flex flex-wrap  items-start justify-center gap-5">
        {ptData
          .filter((app) =>
            app.title
              .toLowerCase()
              .startsWith((publicTemplates || "").toLowerCase()),
          )
          .map((item, index) => (
            <div
              key={index}
              className="group w-70 min-h-70 
  relative p-5 rounded-lg flex flex-col gap-6 bg-white border border-gray-200
  transition-transform duration-300 ease-in-out
  hover:z-50 hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)]
  hover:-translate-y-2 hover:scale-[1.05] origin-top"
            >
              {/* templatesApps */}
              <div
                className="flex items-center transition-all duration-300 
                      group-hover:opacity-0 group-hover:-translate-y-2"
              >
                {item.templateApps.map((d, i) => {
                  const app = appData.find((app) => app.name === d);

                  if (!app) return null;

                  return (
                    <div
                      key={i}
                      className={`p-2 ${
                        i !== 0 ? "-ml-3 border border-white" : "ml-0"
                      } h-12 w-12 rounded-full`}
                      style={{ backgroundColor: app.theme }}
                    >
                      <Image
                      width={32}
                          height={32}
                        className="h-8 w-8 rounded-full object-contain"
                        src={app.imageUrl}
                        alt={app.name}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Hover Image */}
              <Image
              
                className="h-0 group-hover:h-30   object-contain rounded-lg absolute opacity-0 
                   group-hover:opacity-100 group-hover:translate-y-0
                   transition-all duration-300 ease-in-out"
                src={item.imageUrl}
                alt={item.title}
              />

              <h1 className="text-lg group-hover:mt-9 font-semibold text-gray-700 ">
                {item.title}
              </h1>

              {/* descriptionription */}
              <p
                className="text-sm text-gray-500 wrap-break-word
  max-h-0 overflow-hidden opacity-0
  group-hover:max-h-30 group-hover:opacity-100
  transition-all duration-300 ease-in-out"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {item.description}
              </p>

              {/* Footer */}
              <div
                className="transition-all mt-auto group-hover:hidden duration-300 
                      group-hover:opacity-0"
              >
                <div className="h-px bg-gray-200 w-full" />
                <p className="text-gray-400 text-xs">
                  Used {item.usedCount} times
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PublicTemplates;
