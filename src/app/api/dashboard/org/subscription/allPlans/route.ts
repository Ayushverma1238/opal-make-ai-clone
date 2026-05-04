import { client } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const plans = await client.plan.findMany({
            where: {
                name: "PRO"
            }
        });

        if (!plans) {
            return NextResponse.json(
                { message: "There is not pro plan yet" },
                { status: 400 }
            )
        }


        return NextResponse.json(
            {
                message: "All Pro plan",
                plans: plans
            },
            { status: 200 }
        )

    } catch (error) {
        console.error("Error fetching plan")
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}