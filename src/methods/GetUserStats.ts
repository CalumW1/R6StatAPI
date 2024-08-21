import { ApiClient } from './ApiClient';
import { CheckToken, GetExperation } from './Auth';
import {
  RANKED_UBI_SPACEIDS,
  UBI_DATADEV_SESSIONID,
  UBI_DATADEV_URI,
  UBI_GETSTATS,
} from '../constants';

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

export const GetUserStats = async (
  userId: string,
  platform: string,
  view: string,
  aggregation: string,
  gameMode: string,
  teamRole: string,
  season: string
): Promise<UserStats> => {
  const token = await CheckToken();
  const experation = await GetExperation();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-SessionId': UBI_DATADEV_SESSIONID,
    'Content-Type': 'application/json',
    expiration: experation,
  };

  const platformTransformation = platform === 'uplay' ? 'PC' : 'CONSOLE';

  const spaceId: any = RANKED_UBI_SPACEIDS.find(x => x.id === platformTransformation)?.value;

  const URI =
    UBI_DATADEV_URI +
    UBI_GETSTATS(
      userId,
      spaceId,
      platformTransformation,
      view,
      aggregation,
      gameMode,
      teamRole,
      season
    );

  const response = await ApiClient(URI, headers, 'GET');

  const usersStats: UserStats = await BuildUserStats(
    await response.json(),
    userId,
    platformTransformation
  );

  return usersStats;
};

const BuildUserStats = async (data: any, userId: any, plaform: any): Promise<UserStats> => {
  const stats: UserStats = {
    all: {},
    ranked: {},
    unranked: {},
    casual: {},
  };

  const ranked = data.profileData[userId].platforms[plaform].gameModes.ranked;
  const unranked = data.profileData[userId].platforms[plaform].gameModes.unranked;
  const all = data.profileData[userId].platforms[plaform].gameModes.all;
  const casual = data.profileData[userId].platforms[plaform].gameModes.casual;

  stats.all = await BuildStats(all);
  stats.ranked = await BuildStats(ranked);
  stats.unranked = await BuildStats(unranked);
  stats.casual = await BuildStats(casual);

  return stats;
};

const BuildStats = async (gameMode: any): Promise<Role> => {
  const roles: Role = {};

  const all = gameMode.teamRoles.all[0];
  const attackers = gameMode.teamRoles.Attacker[0];
  const defenders = gameMode.teamRoles.Defender[0];

  if (all !== undefined) {
    roles.all = await MapStats(all);
  }

  if (attackers !== undefined) {
    roles.attackers = await MapStats(attackers);
  }

  if (defenders !== undefined) {
    roles.defenders = await MapStats(defenders);
  }

  return roles;
};

const MapStats = async (stat: any): Promise<Stats> => {
  const stats: Stats = {
    type: stat.type,
    statsType: stat.statsType,
    statsDetail: stat.statsDetail,
    seasonYear: stat.seasonYear,
    seasonNumber: stat.seasonNumber,
    matchesPlayed: stat.matchesPlayed,
    roundsPlayed: stat.roundsPlayed,
    minutesPlayed: stat.minutesPlayed,
    matchesWon: stat.matchesWon,
    matchesLost: stat.matchesLost,
    roundsWon: stat.roundsWon,
    roundsLost: stat.roundsLost,
    kills: stat.kills,
    assists: stat.assists,
    deaths: stat.death,
    headshots: stat.headshots,
    meleeKills: stat.meleeKills,
    teamKills: stat.teamKills,
    openingKills: stat.openingKills,
    openingDeaths: stat.openingDeaths,
    trades: stat.trades,
    openingKillTrades: stat.openingKillTrades,
    openingDeathTrades: stat.openingDeathTrades,
    revives: stat.revives,
    distanceTravelled: stat.distanceTravelled,
    winLossRatio: stat.winLossRatio,
    killDeathRatio: stat.killDeathRatio.value,
    headshotAccuracy: stat.headshotAccuracy.value,
    killsPerRound: stat.killsPerRound.value,
    roundsWithAKill: stat.roundsWithAKill.value,
    roundsWithMultiKill: stat.roundsWithMultiKill.value,
    roundsWithOpeningKill: stat.roundsWithOpeningKill.value,
    roundsWithOpeningDeath: stat.roundsWithOpeningDeath.value,
    roundsWithKOST: stat.roundsWithKOST.value,
    roundsSurvived: stat.roundsSurvived.value,
    roundsWithAnAce: stat.roundsWithAnAce.value,
    roundsWithClutch: stat.roundsWithClutch.value,
    timeAlivePerMatch: stat.timeAlivePerMatch,
    timeDeadPerMatch: stat.timeDeadPerMatch,
    distancePerRound: stat.distancePerRound,
  };

  return stats;
};
