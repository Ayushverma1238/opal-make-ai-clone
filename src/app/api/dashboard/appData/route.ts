import { client } from "@/app/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const apps = await client.app.findMany();

        if(!apps){
            return NextResponse.json(
                {message:"No app yet"},{
                    status:404
                }
            )
        }

        return NextResponse.json(
            {message:"App data ", 
                apps
            },{
                status:200
            }
        )
    } catch (error) {
        console.error("Error fetching app data")
        return NextResponse.json(
            {message:"Internal server error"},
            {status:500}
        )
    }
}