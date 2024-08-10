import { ApiClient } from './ApiClient';
import { CheckToken, GetExperation } from './Auth';
import {
  UBI_RANKED_SESSIONID,
  UBI_DATADEV_APPID,
  UBI_DATADEV_URI,
  UBI_GETSTATS,
  RANKED_UBI_SPACEIDS,
} from '../constants';

export interface Operators {
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
  KillDeathRatio: number;
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

export const GetOperator = async (
  userId: string,
  platform: string,
  view: string,
  aggregation: string,
  gameMode: string,
  teamRole: string,
  season: string
): Promise<Operators> => {
  var token = await CheckToken();
  var expiration = await GetExperation();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-SessionId': UBI_RANKED_SESSIONID,
    'Ubi-AppId': UBI_DATADEV_APPID,
    'Content-Type': 'application/json',
    expiration: expiration,
  };

  const platformChange = platform === 'uplay' ? 'PC' : 'CONSOLE';

  const spaceId: any = RANKED_UBI_SPACEIDS.find(x => x.id === platformChange)?.value;

  const URI =
    UBI_DATADEV_URI +
    UBI_GETSTATS(userId, spaceId, platformChange, view, aggregation, gameMode, teamRole, season);

  const data = await ApiClient(URI, headers, 'GET');

  const operators: Operators = await ExtractOperators(await data.json(), userId);

  return operators;
};

const ExtractOperators = async (data: any, userId: string): Promise<Operators> => {
  const operators: Operators = {
    attackers: [],
    defenders: [],
  };

  const profile = data.profileData[`${userId}`].platforms.PC.gameModes.ranked.teamRoles;
  const attackers = profile.attacker;
  const defenders = profile.defender;

  console.log(`Attackers count: ${attackers.length}, Defenders count: ${defenders.length}`);

  if (attackers.length > 0) {
    const attackersPromise = attackers.map(async (operator: any) => {
      const operatorStats: OperatorStats = await BuildOperator(operator);
      return operatorStats;
    });

    const resolvedAttackers = await Promise.all(attackersPromise);
    operators.attackers.push(...resolvedAttackers);
  }

  if (defenders.length > 0) {
    const defendersPromise = defenders.map(async (operator: any) => {
      const operatorStats: OperatorStats = await BuildOperator(operator);
      return operatorStats;
    });

    const resolvedDefender = await Promise.all(defendersPromise);
    operators.defenders.push(...resolvedDefender);
  }

  // console.log(`Attackers length: ${operators.attackers.length}`);
  // console.log(`Defenders length: ${operators.defenders.length}`);
  return operators;
};

const BuildOperator = async (operator: any): Promise<OperatorStats> => {
  const stats: OperatorStats = {
    type: operator.type,
    statsType: operator.statsType,
    statsDetail: operator.statsDetail,
    matchesPlayed: operator.matchesPlayed,
    roundsPlayed: operator.roundsPlayed,
    minutesPlayed: operator.minutesPlayed,
    matchesWon: operator.matchesWon,
    matchesLost: operator.matchesLost,
    roundsWon: operator.roundsWon,
    roundsLost: operator.roundsLost,
    kills: operator.kills,
    assists: operator.assists,
    deaths: operator.death,
    headshots: operator.headshots,
    meleeKills: operator.meleeKills,
    teamKills: operator.teamKills,
    openingKills: operator.openingKills,
    trades: operator.trades,
    openingKillTrades: operator.openingKillTrades,
    openingDeathTrades: operator.openingDeathTrades,
    revives: operator.revives,
    distanceTravelled: operator.distanceTravelled,
    winLossRatio: operator.winLossRatio,
    KillDeathRatio: operator.killDeathRatio.value,
    headshotAccuracy: operator.headshotAccuracy.value,
    killsPerRound: operator.killsPerRound.value,
    roundsWithAKill: operator.killsPerRound.value,
    roundsWithMultiKill: operator.roundsWithMultiKill.value,
    roundsWithOpeningKill: operator.roundsWithOpeningKill.value,
    roundsWithOpeningDeath: operator.roundsWithOpeningDeath.value,
    roundsWithKOST: operator.roundsWithKOST.value,
    roundsSurvived: operator.roundsSurvived.value,
    roundsWithAnAce: operator.roundsWithAnAce.value,
    roundsWithClutch: operator.roundsWithClutch.value,
    timeAlivePerMatch: operator.timeAlivePerMatch,
    timeDeadPerMatch: operator.timeDeadPerMatch,
    distancePerRound: operator.distancePerRound,
  };
  return stats;
};
