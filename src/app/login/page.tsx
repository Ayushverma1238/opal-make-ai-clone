"use client";

import { ChevronLeft } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

   useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

   const handleLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      alert("Login successful");
    } else {
      setError(res?.error || "Invalid credentials");
      alert("Invalid credentials");
    }
  };

  return (
    <div className=" flex bg-white">
      {/* LEFT SIDE */}
      <div className="flex items-center py-20 justify-center w-[45%] px-6">
        <div className="bg-white text-black p-8 overflow-y-auto rounded-2xl w-full max-w-md shadow-[0_0_25px_rgba(0,0,0,0.15)]">
          <div className="mb-6 flex gap-5 items-center justify-start">
            <button
              onClick={() => router.push("/")}
              className="p-2 rounded-full hover:bg-gray-200 mb-4"
            >
              <ChevronLeft className="text-xl " />
            </button>
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          </div>

          {!error && (
            <p className={`text-red-500 ${error? 'inline': 'hidden'} py-3 text-sm`}>{error}</p>
          )}
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-3 border rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-3 border rounded-xl"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Credentials Login */}
          <button
            onClick={handleLogin}
            className="w-full bg-linear-to-r  from-purple-600 to-pink-500 text-white p-3 rounded-xl hover:bg-purple-700 mb-4"
          >
            Sign in with Email
          </button>

          {/* Divider */}
          <div className="text-center flex items-center gap-2 text-gray-700 mb-4">
            <div className="h-px bg-gray-500 w-full"></div>
            Or <div className="h-px bg-gray-500 w-full"></div>
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

          <p className="py-10">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>

          <div className="flex items-center justify-center gap-2">
            <Link href="/resendEmail" className="text-gray-400">
              Resend verification email
            </Link>
            <div className="w-0.5 bg-gray-400 h-3.5"></div>
            <Link href="loginIssue" className="text-gray-400">
              Can't login? Click Here
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-[#220041] h-screen fixed top-0 right-0 w-[55%] flex flex-col items-end p-6">
        <Image src="/logo.png" className="w-60 h-35 object-contain" alt="logo" />
        <div className="text-left mt-10 space-y-4 max-w-150">
          <h1 className="text-6xl font-bold text-white">Design workflows</h1>
          <h1 className="text-6xl font-bold text-pink-500">#withOral</h1>
          <p className="text-gray-200">
            From tasks and workflows to apps and systems, build and automate
            anything in one powerful visual platform.
          </p>
          <p className="text-gray-200">
            Trusted by 500 000+ Makers | Free forever
          </p>
        </div>
      </div>
    </div>
  );
}
