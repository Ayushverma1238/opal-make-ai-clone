import { authOptions } from "@/app/lib/auth";
import { client } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { folderName } = data;

        if (!folderName) {
            return NextResponse.json(
                { message: "Folder name must be there" },
                { status: 403 }
            )
        }

        const session = await getServerSession(authOptions);
        const userId = session?.user.id

        if (!userId) {
            return NextResponse.json(
                { message: "User id not found please login again" },
                { status: 404 }
            )
        }

        const dashboard = await client.dashboard.findFirst({
            where: {
                userId: userId,
            },
        });



        const folder = await client.folder.create({
            data: {
                name: folderName,
                dashboard: {
                    connect: { id: dashboard?.id },
                },
            },
        });

        if (!folder) {
            return NextResponse.json(
                { message: "Error folder cretion" },
                { status: 403 }
            )
        }

        return NextResponse.json(
            { message: "Folder created successfull" },
            { status: 200 }
        )

    } catch (error) {
        console.error("Error creating folder")
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}


export async function GET() {
    try {
      
        const session = await getServerSession(authOptions);
        const userId = session?.user.id

        if (!userId) {
            return NextResponse.json(
                { message: "User id not found please login again" },
                { status: 404 }
            )
        }


        const folders = await client.folder.findMany({
            where: {
                dashboard :{
                    userId
                }
            }
        });


        return NextResponse.json(
            { message: "Folder fetch successfull", folders },
            { status: 200 }
        )

    } catch (error) {
        console.error("Error creating folder")
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}