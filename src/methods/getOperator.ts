import { ApiClient } from './apiClient';
import { CheckToken, GetExperation } from './auth';
import {
  UBI_RANKED_SESSIONID,
  UBI_DATADEV_APPID,
  UBI_DATADEV_URI,
  UBI_GETSTATS,
  RANKED_UBI_SPACEIDS,
} from '../constants';
import { GameModes, OperatorStats, Operators } from '../interfaces/stats';

export const GetOperator = async (
  userId: string,
  platform: string,
  view: string,
  aggregation: string,
  gameMode: string,
  teamRole: string,
  season: string
): Promise<GameModes> => {
  if (userId || platform || view || aggregation || gameMode || teamRole || season === '')
    throw new Error(
      `Please check userId: ${userId}, platform: ${platform}, view: ${view}, aggregation: ${aggregation}, gameMode: ${gameMode}, teamRole: ${teamRole}, season: ${season}`
    );

  var token = await CheckToken();
  var expiration = await GetExperation();

  const header = {
    'Content-Type': 'application/json',
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-SessionId': UBI_RANKED_SESSIONID,
    'Ubi-AppId': UBI_DATADEV_APPID,
    expiration: expiration,
  };

  const platformChange = platform === 'uplay' ? 'PC' : 'CONSOLE';

  const spaceId: any = RANKED_UBI_SPACEIDS.find(x => x.id === platformChange)?.value;

  if (!spaceId) throw new Error('Unable to find spaceId');

  const URI =
    UBI_DATADEV_URI +
    UBI_GETSTATS(userId, spaceId, platformChange, view, aggregation, gameMode, teamRole, season);

  // https://prod.datadev.ubisoft.com/v1/users/488cd0dd-b8e0-4718-a9da-2767ea44c399/playerstats?spaceId=05bfb3f7-6c21-4c42-be1f-97a33fb5cf66&view=current&aggregation=operators&gameMode=all,ranked,casual,unranked&platformGroup=CONSOLE&teamRole=attacker,defender&seasons=Y9S2
  // https://prod.datadev.ubisoft.com/v1/users/488cd0dd-b8e0-4718-a9da-2767ea44c399/playerstats?spaceId=05bfb3f7-6c21-4c42-be1f-97a33fb5cf66&view=current&aggregation=operators&gameMode=ranked,casual&platformGroup=CONSOLE&teamRole=defender,attacker&seasons=Y9S2

  const data = await ApiClient(URI, header, 'GET');

  const operators: GameModes = await ExtractOperators(await data, userId, gameMode, platformChange);

  return operators;
};

const ExtractOperators = async (
  data: any,
  userId: string,
  gameMode: string,
  platform: string
): Promise<GameModes> => {
  const gameModes: GameModes = {
    ranked: {
      attackers: [],
      defenders: [],
    },
    unranked: {
      attackers: [],
      defenders: [],
    },
    all: {
      attackers: [],
      defenders: [],
    },
    casual: {
      attackers: [],
      defenders: [],
    },
  };

  const splitGameModes: string[] = gameMode.split(',');

  for (const mode of splitGameModes) {
    var profile =
      data.profileData[`${userId}`].platforms[`${platform}`].gameModes[`${mode}`]?.teamRoles ?? [];
    const attackers = profile.Attacker ?? {};
    const defenders = profile.Defender ?? {};

    const selectMode = gameModes[mode as keyof GameModes];

    if (attackers.length > 0) {
      const attackersPromise = attackers.map(async (operator: any) => {
        const operatorStats: OperatorStats = await BuildOperator(operator);
        return operatorStats;
      });

      const resolvedAttackers = await Promise.all(attackersPromise);
      selectMode.attackers.push(...resolvedAttackers);
    }

    if (defenders.length > 0) {
      const defendersPromise = defenders.map(async (operator: any) => {
        const operatorStats: OperatorStats = await BuildOperator(operator);
        return operatorStats;
      });

      const resolvedDefender = await Promise.all(defendersPromise);
      selectMode.defenders.push(...resolvedDefender);
    }
  }
  return gameModes;
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
    killDeathRatio: operator.killDeathRatio.value,
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
