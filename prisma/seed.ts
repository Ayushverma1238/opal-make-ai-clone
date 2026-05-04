import "dotenv/config";
import { PrismaClient, PlanType, BillingCycle } from "@prisma/client";
import { client } from '../src/app/lib/prisma'
import { appsData, templatesData } from "./templatesData";

async function main() {
  console.log("🌱 Seeding started...");

  await client.plan.deleteMany({
    where: {
      name: PlanType.PRO,
    },
  });

  // ✅ 1. FREE PLAN (safe)
  await client.plan.upsert({
    where: {
      title_billing: {
        title: "Free Plan",
        billing: BillingCycle.MONTHLY,
      },
    },
    update: {},
    create: {
      name: PlanType.FREE,
      title: "Free Plan",
      price: 0,
      credits: 1000,
      billing: BillingCycle.MONTHLY,
      maxScenarios: 2,
      maxTeams: 1,
    },
  });

  // ✅ 2. PRO PLANS LIST
  // ✅ 2. PRO MONTHLY PLANS (UPDATED)
  const plans = [
    { credits: 5000, price: 10.59 },
    { credits: 10000, price: 18.82 },
    { credits: 20000, price: 34.12 },
    { credits: 40000, price: 62.35 },
    { credits: 80000, price: 107.06 },
    { credits: 150000, price: 180.53 },
    { credits: 300000, price: 315.93 },
    { credits: 500000, price: 482.67 },
    { credits: 750000, price: 678.75 },
    { credits: 1000000, price: 880.86 },
    { credits: 1500000, price: 1268.44 },
    { credits: 2000000, price: 1620.79 },
    { credits: 2500000, price: 2001.32 },
    { credits: 3000000, price: 2333.94 },
    { credits: 4000000, price: 3028.93 },
    { credits: 5000000, price: 3710.44 },
    { credits: 6000000, price: 4361.66 },
    { credits: 7000000, price: 5028.39 },
    { credits: 8000000, price: 5660.47 },
  ];

  // ✅ 3. UPSERT PRO PLANS (no duplicates)
  for (const p of plans) {
    const title = `${p.credits.toLocaleString()} credits/mo`;

    await client.plan.upsert({
      where: {
        title_billing: {
          title,
          billing: BillingCycle.MONTHLY,
        },
      },
      update: {
        price: p.price,
        credits: p.credits,
      },
      create: {
        name: PlanType.PRO,
        title,
        price: p.price,
        credits: p.credits,
        billing: BillingCycle.MONTHLY,
        maxScenarios: 100,
        maxTeams: 10,
      },
    });
  }

  console.log("✅ All plans seeded successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });


async function addTemplatesData() {
  await client.template.deleteMany({
    where: {
      templateType:"PUBLIC",
    },
  });
  await client.template.createMany({
    data:templatesData,
     skipDuplicates: true
  });

  await client.app.deleteMany();

  await client.app.createMany ({
    data:appsData,
    skipDuplicates:true
  })
}

addTemplatesData()
 .catch((e) => {
    console.error("❌ Templatedata error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });