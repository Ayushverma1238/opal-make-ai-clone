"use client";

import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";

type Payment = {
  id?: number;
  data?: string;
  status?: string;
  product?: string;
  paymentMethod?: string;
  billingPeriod?: string;
  amount?: string;
};

const CredentialRequest = () => {
  const data: Payment[] = [];

  return (
    <div className="p-6 min-h-screen flex flex-col ">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 pr-5">
        <div className="flex gap-3 items-center">
          <h1 className="font-semibold text-lg">Credential Request</h1>
          <Link
            href="#"
            className="text-xs font-semibold text-purple-500 flex gap-1 items-center"
          >
            <MdOutlineMessage /> Share feedback
          </Link>
        </div>
        <div className="flex px-3 py-1 gap-1 border items-center border-gray-300 bg-white">
          <IoIosSearch />
          <input
            type="text"
            name="requestSearch"
            className="outline-none"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="relative">
        <h1 className="font-semibold text-gray-600">Request</h1>
        <div className="h-0.5 bg-purple-700 w-20 rounded-full absolute left-0"></div>
      </div>
      <div className="w-full h-px bg-gray-300 rounded-full  mb-7"></div>

      {data.length === 0 ? (
        <div className="flex flex-col text-gray-400 text-center items-center ">
           <Image height={72} width={108} className="h-18 object-cover w-27" src="/digitalInterface.png" alt="digital Interface" />
          <h3 className="font-semibold text-gray-700">No requests received</h3>
          <p>Credential requests sent to you will appear here.</p>
          <Link href="#" className="underline">Learn more</Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-sm text-left">
            {/* Header */}
            <thead className="text-gray-700 bg-gray-200">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">DATA</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">PRODUCT</th>
                <th className="p-3">PAYMENT METHOD</th>
                <th className="p-3 text-right">BILLING PERIOD</th>
                <th className="p-3 text-right">AMOUNT</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {data.map((team, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium text-gray-800">
                    {team.id || "-"}
                  </td>
                  <td className="p-3">{team.data || "-"}</td>
                  <td className="p-3">{team.status || "-"}</td>
                  <td className="p-3">{team.product || "-"}</td>
                  <td className="p-3">{team.paymentMethod || "-"}</td>
                  <td className="p-3 text-right">
                    {team.billingPeriod || "-"}
                  </td>
                  <td className="p-3">{team.amount || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      <p className="text-gray-500 mt-auto text-center">
        If you lose access to this organization, you can revoke Make's permissions directly within the third-party service or by deleting your Make account.
      </p>
    </div>
  );
};

export default CredentialRequest;
