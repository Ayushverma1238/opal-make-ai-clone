"use client"


import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      // ✅ store in localStorage
      localStorage.setItem("userId", session.user.id);

      // ✅ redirect AFTER storing
      router.push("/dashboard/Org");
    }
  }, [session, status, router]);

  // optional loading UI
  if (status === "loading") return <p>Loading...</p>;

  return null;
};

export default Dashboard;