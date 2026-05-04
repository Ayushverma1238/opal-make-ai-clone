import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { client } from "@/app/lib/prisma";

type CustomAppData = {
    appName: string;
    appLogo: string;
    label: string;
    description: string;
    theme: string;
    language: string;
    audience: string;
    country: string;
};

export async function POST(req: NextRequest) {
    const data: CustomAppData = await req.json();

    const {
        appName,
        appLogo,
        label,
        description,
        theme,
        language,
        audience,
        country,
    } = data;

    console.log("Backend receive data",data)
    // ✅ Correct validation (ANY missing field)
    if (!appName || !appLogo || !label || !theme || !language || !audience) {
        return NextResponse.json(
            { message: "All fields are required" },
            { status: 400 }
        );
    }

    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            );
        }

        // ✅ Find dashboard
        const dashboard = await client.dashboard.findFirst({
            where: { userId },
        });

        if (!dashboard) {
            return NextResponse.json(
                { error: "Dashboard not found" },
                { status: 404 }
            );
        }

        // ❗ Use create (not upsert)
        const app = await client.customApp.create({
            data: {
                appName,
                appLogo,
                label,
                description,
                theme,
                language,
                audience,
                country,
                dashboardId: dashboard.id, // ✅ important
            },
        });

        return NextResponse.json(
            { message: "App created successfully", app },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error creating app", error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}