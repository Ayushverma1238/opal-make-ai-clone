import { authOptions } from "@/app/lib/auth";
import { client } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
        return NextResponse.json(
            { message: "Session not exist! please login" },
            { status: 404 }
        )
    }

    try {
        const subscription = await client.subscription.findFirst({
            where: {
                userId,
                status: "ACTIVE",
                OR: [
                    { endDate: null },
                    { endDate: { gte: new Date() } },
                ],
            },
            include: {
                plan: true,
            },
        });

        if (!subscription) {
            return NextResponse.json(
                { message: "No active plan (expired or not found)" },
                { status: 403 }
            );
        }

        // 🔥 2. Usage (credits left)
        const usage = await client.usageStats.findFirst({
            where: {
                org: {
                    dashboard: {
                        userId: session.user.id,
                    },
                },
            },
        });


        if (!usage) {
            return NextResponse.json(
                { message: "No left data" },
                { status: 403 }
            )
        }


        return NextResponse.json(
            {
                plan: subscription?.plan || null,
                usage: usage || null,
                subscription: {
                    startDate: subscription.startDate,
                    endDate: subscription.endDate,
                    status: subscription.status,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching credit data");
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }


}