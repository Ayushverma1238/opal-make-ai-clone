import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "./prisma";
import bcrypt from "bcrypt";
import { buildOrgVariables } from "./generateVariableData";

export const authOptions: NextAuthOptions = {
  providers: [
    // 🔐 Credentials Login
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await client.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("No user found");
        }

        const isMatched = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatched) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),

    // 🐙 GitHub OAuth
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    // 🌐 Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    // 🚀 CREATE USER FOR OAUTH
    async signIn({ user, account }) {
      if (!user.email) return false;

      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 30);

      const existingUser = await client.user.findUnique({
        where: { email: user.email },
      });

      // ✅ ALWAYS update last login
      if (existingUser) {
        await client.user.update({
          where: { email: user.email },
          data: {
            lastLoginAt: new Date()
          }
        });
        return true;
      }

      // ✅ Only create for OAuth users
      if (account?.provider === "github" || account?.provider === "google") {
        const freePlan = await client.plan.findFirst({
          where: { name: "FREE" },
        });

        if (!freePlan) throw new Error("FREE plan not found");

        const createdUser = await client.user.create({
          data: {
            email: user.email,
            name: user.name,
            image: user.image,
            emailVerified: new Date(),
            lastLoginAt: new Date(),

            subscriptions: {
              create: {
                planId: freePlan.id,
                status: "ACTIVE",
                startDate: new Date(),
                endDate,
              },
            },

            dashboards: {
              create: {
                name: user.email + " My dashboard",
                orgs: {
                  create: {
                    name: "My Organization",
                    
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
                          connect: { email: user.email },
                        },
                        members: {
                          create: {
                            name: user.name ?? undefined,
                            email: user.email,
                            role: "ADMIN",
                            user: {
                              connect: { email: user.email },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },

          // ✅ ONLY HERE you use select/include
          select: {
            id:true,
            dashboards: {
              select: {
                orgs: {
                  select: {
                    id: true
                  }
                }
              }
            }
          }
        });

        const org = await client.org.findFirst({
          where: {
            dashboard: {
              userId: createdUser.id,
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
        const team = org.teams[0];

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

      }

      return true;
    },

    // 🧠 ATTACH DB USER ID TO TOKEN
    async jwt({ token, user }) {
      if (user) {
        // 🔥 get DB user
        const dbUser = await client.user.findUnique({
          where: { email: user.email! },
        });

        token.id = dbUser?.id;  // ✅ Prisma ID
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};