import { client } from "@/app/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const templates = client.template.findMany({
            where:{
                templateType:"TEAM"
            }
        })
    
        if(!templates){
            return NextResponse.json(
                {message:"No template data available"},
                {status: 203}
            )
        }
    
        return NextResponse.json(
            {message:"Template data", 
                templates
            },{
                status:200
            }
        )
    } catch (error) {
        console.log("Error fetching template data")
        return NextResponse.json(
            {message:"Internal server error"},
            {status:500}
        )
    }
}