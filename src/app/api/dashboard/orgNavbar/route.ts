import { authOptions } from "@/app/lib/auth";
import { client } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    const { orgName, timeZone, country, partnerLink, } = await req.json();
    if (!orgName || !timeZone || !country) {
        return NextResponse.json(
            { message: "All field require" },
            { status: 403 }
        )
    }

    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) {
            return NextResponse.json(
                { message: "User is not there please login again" },
                { status: 404 }
            )
        }

        const org = await client.org.findFirst({
            where: {
                dashboard: {
                    userId: userId
                }
            }
        });

        await client.org.update({
            where: {
                id: org?.id
            },
            data: {
                name: orgName,
                timeZone: timeZone,
                country: country,
                partnerLink: partnerLink
            }
        });


        return NextResponse.json(
            { message: "Organization data updated" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }

}