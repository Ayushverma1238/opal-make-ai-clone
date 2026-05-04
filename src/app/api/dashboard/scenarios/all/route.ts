import { authOptions } from "@/app/lib/auth";
import { client } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) {
            return NextResponse.json(
                { message: "User not authenticated" },
                { status: 401 }
            );
        }

        const scenarios = await client.scenario.findMany({
            where: {
                dashboard: {
                    userId: userId, // 👈 filter via relation
                },
                templateId: {
                    not: null, // optional (only if you want scenarios with template)
                },
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                template: true,
                dashboard: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        if (!scenarios.length) {
            return NextResponse.json(
                { message: "No scenarios found with templates" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Scenarios fetched successfully",
                scenarios,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching scenarios:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}