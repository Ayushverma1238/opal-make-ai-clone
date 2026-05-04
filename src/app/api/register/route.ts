import { NextResponse } from 'next/server'
import { client } from '../../lib/prisma'
import bcrypt from 'bcrypt'
import { AppMode, AppType } from '@prisma/client';
import { buildOrgVariables } from '@/app/lib/generateVariableData';

type appData = {
    appLogo: string;
    appName: string;
    modules: number;
    theme: string;
};

export const appExampleData: appData[] = [
    {
        appName: "AWS S3",
        appLogo: "https://eu1.make.com/static/img/packages/aws-s3_64.png",
        modules: 6,
        theme: '#e35d4b',
    },
    {
        appName: "CloudConvert",
        appLogo: "https://eu1.make.com/static/img/packages/cloudconvert_64.png",
        modules: 18,
        theme: '#b53836',
    },
    {
        appName: "Dropbox",
        appLogo: "https://eu1.make.com/static/img/packages/dropbox_64.png",
        modules: 22,
        theme: '#007ee6',
    },
    {
        appName: "MailerLite Classic",
        appLogo: "https://eu1.make.com/static/img/packages/mailerlite_64.png",
        modules: 26,
        theme: '#00a153',
    },
    {
        appName: "Ninox",
        appLogo: "https://eu1.make.com/static/img/packages/ninox_64.png",
        modules: 15,
        theme: '#3c98fa',
    },
    {
        appName: "Petoffice",
        appLogo: "https://eu1.make.com/static/img/packages/petoffice_64.png",
        modules: 11,
        theme: '#8ebd3e',
    },
    {
        appName: "QuickBooks",
        appLogo: "https://eu1.make.com/static/img/packages/quickbooks_64.png",
        modules: 94,
        theme: '#393a3d',
    },
    {
        appName: "Smartsheet",
        appLogo: "https://eu1.make.com/static/img/packages/smartsheet_64.png",
        modules: 37,
        theme: '#0e2947',
    },
    {
        appName: "Survey Monkey",
        appLogo: "https://eu1.make.com/static/img/packages/survey-monkey_64.png",
        modules: 10,
        theme: '#00bf70',
    },
    {
        appName: "Todoist",
        appLogo: "https://eu1.make.com/static/img/packages/todoist_64.png",
        modules: 43,
        theme: '#db4d40',
    },
];


export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { name, email, password, hostedRegion, country } = data;

        // 🔴 Validation
        if (!name || !email || !password || !hostedRegion || !country) {
            return NextResponse.json(
                { message: "All fields are required." },
                { status: 400 }
            );
        }

        // 🔍 Check if user already exists
        const userExist = await client.user.findUnique({
            where: { email },
        });

        if (userExist) {
            return NextResponse.json(
                { message: "User already exists with this email." },
                { status: 403 }
            );
        }

        // 🔐 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🔍 Get FREE plan
        const freePlan = await client.plan.findFirst({
            where: { name: "FREE" },
        });

        if (!freePlan) {
            throw new Error("FREE plan not found");
        }

        const now = new Date();

        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 30);

        // 🚀 Create user with full setup
        const newUser = await client.user.create({
            data: {
                email,
                name,
                password: hashedPassword,


                // ✅ Important fields
                emailVerified: now,
                lastLoginAt: now, // ⭐ ADDED HERE

                // ✅ Subscription
                subscriptions: {
                    create: {
                        planId: freePlan.id,
                        status: "ACTIVE",
                        startDate: now,
                        endDate,
                    },
                },

                // ✅ Dashboard + Org + Team
                dashboards: {
                    create: {
                        name: `${email} My dashboard`,

                        orgs: {
                            create: {
                                name: `My Organization`,
                                hostedRegion,
                                country,
                                
                                usage: {
                                    create: {
                                        creditsLeft: freePlan.credits,
                                        averageDailyUsage: 0,
                                        daysLeft: 30,
                                        activeScenarios: 0,
                                    },
                                },

                                teams: {
                                    create: {
                                        name: "My Team",

                                        owner: {
                                            connect: { email },
                                        },

                                        members: {
                                            create: {
                                                name,
                                                email,
                                                role: "ADMIN",
                                                user: {
                                                    connect: { email },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },

                        // ✅ Default apps
                        apps: {
                            create: appExampleData.map((app) => ({
                                appName: app.appName,
                                appLogo: app.appLogo,
                                module: app.modules,
                                theme: app.theme,
                                type: AppType.EXAMPLE,
                                mode: AppMode.READ_ONLY,
                            })),
                        },
                    },
                },
            },
        });

        const org = await client.org.findFirst({
            where: {
                dashboard: {
                    userId: newUser.id,
                },
            },
            include: {
                teams: true,
            },
        });

        if (!org) {
            throw new Error("Organization not found");
        }

        // ⚠️ teams is an array
        const team = org.teams[0]; // or pick based on condition

        if (!team) {
            throw new Error("Team not found");
        }

        const variables = buildOrgVariables(
            org.id,
            org.name,
            team.id,
            team.name
        );

        await client.variable.createMany({
            data: variables,
        });

        // ✅ Success response
        return NextResponse.json(
            {
                message: "User registered successfully",
                user: {
                    userId: newUser.id,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("REGISTER ERROR:", error);

        return NextResponse.json(
            { message: "Error registering user" },
            { status: 500 }
        );
    }
}