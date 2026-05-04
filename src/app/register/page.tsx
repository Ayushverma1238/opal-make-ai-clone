"use client";

import { ChevronLeft } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { countries } from "../utils/countryData";
import Image from "next/image";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [eyeClick, setEyeClick] = useState(false);
  const [hostedRegion, setHostingRegion] = useState("EU");
  const [country, setSelectedCountry] = useState("India");
  const [error, setError] = useState("")

  const router = useRouter();

  const handleRegister = async () => {
  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        hostedRegion,
        country,
      }),
    });

    const data = await res.json();

    console.log("Register Response:", data);

    if (res.status === 201) {
      localStorage.setItem("userId", JSON.stringify(data.user));
      alert("Register successful");
      router.push("/dashboard");
    } else {
      setError(data?.error || "All filed required")
      alert(data.message || "Registration failed");
    }
  } catch (error) {
    setError("Error registering user")

    console.error(error);
    alert("Something went wrong");
  }
};

  return (
    <div className="flex bg-white">
      {/* LEFT SIDE */}
      <div className="flex items-center py-20 justify-center w-[45%] px-6">
        <div className="bg-white text-black p-8 overflow-y-auto rounded-2xl w-full max-w-md shadow-[0_0_25px_rgba(0,0,0,0.15)]">
          {" "}
          <div className="mb-6 flex gap-5 items-center justify-start">
            <button
              onClick={() => router.push("/")}
              className="p-2 rounded-full hover:bg-gray-200 mb-4"
            >
              <ChevronLeft className="text-xl " />
            </button>
            <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
          </div>
          {/* GitHub */}
          <button
            onClick={() => signIn("github", {callbackUrl:'/dashboard'})}
            className="w-full bg-black text-white p-3 rounded-xl mb-3 hover:opacity-90"
          >
            Continue with GitHub
          </button>
          {/* Google */}
          <button
            onClick={() => signIn("google", {callbackUrl:'/dashboard'})}
            className="w-full bg-red-500 text-white p-3 rounded-xl hover:opacity-90"
          >
            Continue with Google
          </button>
          {/* Divider */}
          <div className="text-center flex items-center gap-2 py-4 text-gray-700 mb-4">
            <div className="h-px bg-gray-500 w-full"></div>
            Or <div className="h-px bg-gray-500 w-full"></div>
          </div>

           {!error && (
            <p className={`text-red-500 ${error? 'inline': 'hidden'} py-3 text-sm`}>{error}</p>
          )}

          {/* Email */}
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Name
          </label>
          <input
            type="name"
            placeholder="Name"
            className="w-full mb-4 p-3 border rounded-xl"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-3 border rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password */}
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <div className="relative mb-4 w-full">
            <input
              type={eyeClick ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setEyeClick(!eyeClick)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              {eyeClick ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <div className=" flex gap-5 mb-4">
            <div className="w-full max-w-md flex flex-col">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hosting Region *
              </label>

              <select
                onChange={(e) => setHostingRegion(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="EU">EU</option>
                <option value="US">US</option>
              </select>
            </div>
            <div className="w-full max-w-md flex flex-col">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Country *
              </label>

              <select
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {countries.map((countryName, index) => (
                  <option key={index} value={countryName}>
                    {countryName}
                  </option>
                ))}
                ;
              </select>
            </div>
          </div>
          {/* Credentials Login */}
          <button
            onClick={handleRegister}
            className="w-full bg-linear-to-r  from-purple-600 to-pink-500 text-white p-3 rounded-xl hover:bg-purple-700 mb-4"
          >
            Sign in with Email
          </button>
          <p className="text-gray-500">
            By creating your account, you agree to the{" "}
            <Link className="text-purple-400 hover:underline" href="#">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link className="text-purple-400 hover:underline" href="#">
              Privacy Notice.
            </Link>{" "}
          </p>
          <p className="py-10">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-500 hover:underline">
              Click here to sign In
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-[#220041] hidden h-screen fixed top-0 right-0 w-[55%] md:flex flex-col items-end p-6">
        <Image height={140} width={240} src="/logo.png" className="w-60 h-35 object-contain" alt="logo" />
        <div className="text-left mt-10 space-y-4 max-w-150">
          <h1 className="text-6xl font-bold text-white">Bring Idea to Life</h1>
          <h1 className="text-6xl font-bold text-pink-500">#withOpal</h1>
          <p className="text-gray-200">
            From tasks and workflows to apps and systems, build and automate
            anything in one powerful visual platform.
          </p>
          <p className="text-gray-200">
            Trusted by 500 000+ Makers | Free forever{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
