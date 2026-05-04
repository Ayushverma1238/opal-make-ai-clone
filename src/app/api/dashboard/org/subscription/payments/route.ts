import { authOptions } from "@/app/lib/auth";
import { client } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";




export async function GET () {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id

           if(!userId){
            return NextResponse.json(
                {message:"No userId please login again"},
                {status:403}
            )
        }

        const payments = await client.payment.findMany({
            where:{
                userId
            }

        })
        if(!payments){
            return NextResponse.json(
                {message:"No payment data yet"},
                {status:404}
            )
        }

        return NextResponse.json(
            {message:"Payment data get successfully",
                payments
            },
            {status:200}
        )
    } catch(error) {
        console.error("Payment fetch failed")
        return NextResponse.json(
            {message:"Internal server error"},
            {status:500}
        )
    }
}