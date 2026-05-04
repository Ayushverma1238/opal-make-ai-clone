"use client";

import { useState } from "react";

const CreditPage = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center pb-6 justify-between pr-5">
          <h1 className="font-semibold text-lg">Notification options</h1>
        </div>
        <div className="flex flex-col gap-5 bg-white rounded-lg p-6 justify-center text-gray-700">
          <div className="flex w-full gap-7 justify-between items-center">
            <div>
              <h1 className="font-semibold wrap-break-word text-gray-800">
                Warning in scenario run
              </h1>
              <p className="text-sm wrap-break-word font-medium text-gray-500">
                Notifications for warnings that need your attention, such as a
                data store in your scenario reaching capacity.
              </p>
            </div>
            <div
              onClick={() => setEnabled(!enabled)}
              className={`w-9 h-5 flex items-center rounded-full p-1 cursor-pointer transition ${
                enabled ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  enabled ? "translate-x-3" : "translate-x-0"
                }`}
              ></div>
            </div>
          </div>
          <div className="h-px bg-gray-200  w-full" />
          <div className="flex w-full gap-7 justify-between items-center">
            <div>
              <h1 className="font-semibold wrap-break-word text-gray-800">
                Errors in scenario run
              </h1>
              <p className="text-sm wrap-break-word font-medium text-gray-500">
                Notifications for errors that stop your scenarios from running
                smoothly, such as an app receiving a connection error.
              </p>
            </div>
            <div
              onClick={() => setEnabled(!enabled)}
              className={`w-9 h-5 flex items-center rounded-full p-1 cursor-pointer transition ${
                enabled ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  enabled ? "translate-x-3" : "translate-x-0"
                }`}
              ></div>
            </div>
          </div>
          <div className="h-px bg-gray-200 w-full" />
          <div className="flex w-full gap-7 justify-between items-center">
            <div>
              <h1 className="font-semibold wrap-break-word text-gray-800">
                Scenario deactivation
              </h1>
              <p className="text-sm wrap-break-word font-medium text-gray-500">
                Notifications for scenarios that are deactivated due to critical
                issues, such as multiple consecutive errors. If turned off,
                admins will still be notified for scenarios deactivated due to
                running out of credits.
              </p>
            </div>
            <div
              onClick={() => setEnabled(!enabled)}
              className={`w-9 h-5 flex items-center rounded-full p-1 cursor-pointer transition ${
                enabled ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  enabled ? "translate-x-3" : "translate-x-0"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditPage;
