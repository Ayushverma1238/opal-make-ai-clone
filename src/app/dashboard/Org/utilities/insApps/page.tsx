"use client";

import Link from "next/link";
import { CiSearch } from "react-icons/ci";

type Payment = {
  id?: number;
  data?: string;
  status?: string;
  product?: string;
  paymentMethod?: string;
  billingPeriod?: string;
  amount?: string;
};

const CreditPage = () => {
  const data: Payment[] = [];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center pb-6 justify-between pr-5">
        <h1 className="font-semibold text-lg">Payments</h1>
      </div>
        <div className="flex justify-center text-gray-700">
          <h1>No app were install in this organization.</h1>
        </div>
    </div>
  );
};

export default CreditPage;