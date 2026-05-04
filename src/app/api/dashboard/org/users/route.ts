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
        );
    }

    try {
        const users = await client.dashboardUser.findMany({
            where: {
                team: {
                    members: {
                        some: { userId }
                    }
                }
            },
            include: {
                team: true,
                user: true
            }
        });

        const formatted = users.map((item) => ({
            name: item.name,
            email: item.email,
            role: item.role,
            lastLoginAt: item.user?.lastLoginAt,
            team_name: item.team?.name,
        }));

        return NextResponse.json({
            message: "All team users",
            users:formatted
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, note, role } = data;

    // 🔴 Validation
    if (!name || !email || !role) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 403 }
      );
    }

    // 🔐 Get logged-in user
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "UserId is required, please login again" },
        { status: 404 }
      );
    }

    // 🔍 Find logged-in user's team (owner)
    const team = await client.team.findFirst({
      where: {
        ownerId: userId,
      },
    });

    if (!team) {
      return NextResponse.json(
        { message: "Team not found" },
        { status: 404 }
      );
    }

    // 🔍 Check if user already exists
    let existingUser = await client.user.findUnique({
      where: { email },
    });

    // 👇 If not exist, create user
    if (!existingUser) {
      existingUser = await client.user.create({
        data: {
          name,
          email,
          role: "USER",
          emailVerified: new Date(),
        },
      });
    }

    // 🚫 Prevent duplicate team member
    const alreadyMember = await client.dashboardUser.findFirst({
      where: {
        teamId: team.id,
        userId: existingUser.id,
      },
    });

    if (alreadyMember) {
      return NextResponse.json(
        { message: "User already in team" },
        { status: 409 }
      );
    }

    // ✅ Create team member
    const newMember = await client.dashboardUser.create({
      data: {
        name,
        email,
        role,
        note, // ✅ your new field
        teamId: team.id,
        userId: existingUser.id,
      },
    });

    return NextResponse.json(
      {
        message: "Team member added successfully",
        member: newMember,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding new team:", error);
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
}