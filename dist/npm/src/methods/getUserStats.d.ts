export interface UserStats {
    all: Role;
    ranked: Role;
    unranked: Role;
    casual: Role;
}
interface Role {
    attackers?: Stats;
    defenders?: Stats;
    all?: Stats;
}
interface Stats {
    type: string;
    statsType: string;
    statsDetail: string;
    seasonYear: string;
    seasonNumber: string;
    matchesPlayed: number;
    roundsPlayed: number;
    minutesPlayed: number;
    matchesWon: number;
    matchesLost: number;
    roundsWon: number;
    roundsLost: number;
    kills: number;
    assists: number;
    deaths: number;
    headshots: number;
    meleeKills: number;
    teamKills: number;
    openingKills: number;
    openingDeaths: number;
    trades: number;
    openingKillTrades: number;
    openingDeathTrades: number;
    revives: number;
    distanceTravelled: number;
    winLossRatio: number;
    killDeathRatio: number;
    headshotAccuracy: number;
    killsPerRound: number;
    roundsWithAKill: number;
    roundsWithMultiKill: number;
    roundsWithOpeningKill: number;
    roundsWithOpeningDeath: number;
    roundsWithKOST: number;
    roundsSurvived: number;
    roundsWithAnAce: number;
    roundsWithClutch: number;
    timeAlivePerMatch: number;
    timeDeadPerMatch: number;
    distancePerRound: number;
}
export declare const GetUserStats: (userId: string, platform: string, view: string, aggregation: string, gameMode: string, teamRole: string, season: string) => Promise<UserStats>;
export {};
