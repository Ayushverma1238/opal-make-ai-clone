import { authOptions } from "@/app/lib/auth";
import { client } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
        return NextResponse.json(
            { message: "Please login again." },
            { status: 403 }
        )
    }
    try {

        const teams = await client.team.findMany({
            where: {
                org: {
                    dashboard: {
                        userId
                    }
                }
            }
        });


        if (teams.length == 0) {
            return NextResponse.json(
                { message: "Currently user have no team" },
                { status: 400 }
            )
        }

        return NextResponse.json(
            {
                message: "Team data",
                teams: teams
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error fetching team")
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }

}