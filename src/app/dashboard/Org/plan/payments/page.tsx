"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

type Payment = {
  id?: number;
  date?: string;
  status?: string;
  product?: string;
  paymentMethod?: string;
  BillingPeriod?: string;
  amount?: string;
};

const CreditPage = () => {
  const [data, setData] = useState<Payment[]>([])

  useEffect(() => {
    const fetchPaymentData =async () => {
      try {
        const res = await fetch('/api/dashboard/org/subscription/payments',{method:"GET"})

        const {payments} = await res.json();
        if(res?.ok){
          setData(payments);
        }else{
          console.log("Error fetching payment data")
        }
      } catch (error) {
        console.error("Error fetching payment data");
      }
    }
    fetchPaymentData();
  },[])
  
  return (
    <div className="p-6 ">
      {/* Header */}
      <div className="flex items-center pb-6 justify-between pr-5">
        <h1 className="font-semibold text-lg">Payments</h1>
      </div>

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
            {!data.length ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-3 text-center font-semibold bg-gray-100 text-gray-800"
                >
                  No data
                </td>
              </tr>
            ) : (
              data.map((team, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium text-gray-800">
                    {team.id || "-"}
                  </td>
                  <td className="p-3">{team.date || "-"}</td>
                  <td className="p-3">{team.status || "-"}</td>
                  <td className="p-3">{team.product || "-"}</td>
                  <td className="p-3">{team.paymentMethod || "-"}</td>
                  <td className="p-3 text-right">
                    {team.BillingPeriod || "-"}
                  </td>
                  <td className="p-3">{team.amount || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreditPage;