export interface GameModes {
    ranked: Operators;
    unranked: Operators;
    casual: Operators;
    all: Operators;
}
interface Operators {
    attackers: OperatorStats[];
    defenders: OperatorStats[];
}
interface OperatorStats {
    type: string;
    statsType: string;
    statsDetail: string;
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
export declare const GetOperator: (userId: string, platform: string, view: string, aggregation: string, gameMode: string, teamRole: string, season: string) => Promise<GameModes>;
export {};
