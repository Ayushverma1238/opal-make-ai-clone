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
                { message: "UserId is not availale please login again" },
                { status: 404 }
            )
        }

        const activePlan = await client.subscription.findFirst({
            where: {
                status: "ACTIVE",
                userId: userId   // ✅ important fix
            },
            include: {
                plan: true
            }
        })

        const leftData = await client.usageStats.findFirst({
            where:{
                org:{
                    dashboard:{
                        userId
                    }
                }
            }
        });



        if (!activePlan) {
            return NextResponse.json(
                { message: "You don't have any active plan" },
                { status: 403 }
            )
        }


        return NextResponse.json(
            {
                message: "Active plan data",
                activePlan: activePlan,
                leftData
            },
            { status: 200 }
        )

    } catch (error) {
        console.error("Error fetching Active plan")
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}