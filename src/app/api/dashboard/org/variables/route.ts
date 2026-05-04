import { authOptions } from "@/app/lib/auth";
import { client } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";




export async function GET() {
    try {
        const session =await getServerSession(authOptions);
        const userId =session?.user?.id;
    
        if(!userId){
            return NextResponse.json(
                {message:"User id is require please login again"},
                {status: 404}
            )
        }
    
        const variables = await client.variable.findMany({
            where:{
                org:{
                    dashboard:{
                        userId
                    }
                }
            }
        })
    
        if(!variables){
            return NextResponse.json(
                {message:"There is no variable"},
                {status:402}
            )
        }

    
        return NextResponse.json(
            {message:"Variables fetch successfully",
                variables
            },
            {status:200}
        )
    } catch (error) {
        console.error("Error fetching variable")
        return NextResponse.json(
            {message:"Internal server error"},
            {status:500}
        )
    }
}