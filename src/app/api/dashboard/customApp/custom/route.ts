import { client } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/auth"
import { AppType } from "@prisma/client";



// GET all apps of a user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    // 1. Find user's dashboard
    const dashboard = await client.dashboard.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!dashboard) {
      return NextResponse.json(
        { error: "Dashboard not found" },
        { status: 404 }
      );
    }

    // 2. Get all apps (EXAMPLE + CUSTOM)
    const apps = await client.customApp.findMany({
      where: {
        dashboardId: dashboard.id,
        type:AppType.CUSTOM
      },
      orderBy: {
        appName: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: apps,
    });
  } catch (error) {
    console.error("GET USER APPS ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}