export type Plan = {
    title: string;
    price: number;
    credits: number;
    billing: "MONTHLY" | "YEARLY";
    maxScenarios: number;
    maxTeams: number;
};

export type Usage = {
    creditsLeft: number;
    averageDailyUsage: number;
    daysLeft: number;
    activeScenarios: number;
};


export type Subscription = {
    startDate:Date;
    endDate: Date | null;
    status: string;
};
