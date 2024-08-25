import { ApiClient } from './apiClient';
import { CheckToken, GetExperation } from './auth';
import {
  RANKED_UBI_SPACEIDS,
  UBI_DATADEV_SESSIONID,
  UBI_DATADEV_URI,
  UBI_GETSTATS,
} from '../constants';
import { GetUserByUserId, User } from './getUserByUserId';

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
  if (userId || platform || view || aggregation || gameMode || teamRole || season === '')
    throw new Error(
      `Please check userId: ${userId}, platform: ${platform}, view: ${view}, aggregation: ${aggregation}, gameMode: ${gameMode}, teamRole: ${teamRole}, season: ${season}`
    );

  const token = await CheckToken();
  const experation = await GetExperation();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-SessionId': UBI_DATADEV_SESSIONID,
    'Content-Type': 'application/json',
    expiration: experation,
  };

  const user: User[] | [] = await GetUserByUserId(userId);

  const platformTransformation = platform === 'uplay' ? 'PC' : 'CONSOLE';

  const spaceId: any = RANKED_UBI_SPACEIDS.find(x => x.id === platformTransformation)?.value;

  if (spaceId === '') throw new Error('SpaceId was not found');

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
    user,
    platformTransformation,
    platform
  );

  return usersStats;
};

const BuildUserStats = async (
  data: any,
  user: User[] | [],
  plaform: any,
  originalPlatform: any
): Promise<UserStats> => {
  const stats: UserStats = {
    all: {},
    ranked: {},
    unranked: {},
    casual: {},
  };

  const id =
    originalPlatform === 'psn'
      ? user.find(x => x.platformType == originalPlatform)?.profileId ?? ''
      : user[0].userId;

  const ranked = data.profileData[id].platforms[plaform].gameModes.ranked;
  const unranked = data.profileData[id].platforms[plaform].gameModes.unranked;
  const all = data.profileData[id].platforms[plaform].gameModes.all;
  const casual = data.profileData[id].platforms[plaform].gameModes.casual;

  if (all !== undefined) {
    stats.all = await BuildStats(all);
  }

  if (ranked !== undefined) {
    stats.ranked = await BuildStats(ranked);
  }

  if (unranked !== undefined) {
    stats.unranked = await BuildStats(unranked);
  }

  if (casual !== undefined) {
    stats.casual = await BuildStats(casual);
  }

  return stats;
};

const BuildStats = async (gameMode: any): Promise<Role> => {
  const roles: Role = {};

  const teamRoles = gameMode.teamRoles;

  if (Array.isArray(teamRoles.all) && teamRoles.all.length > 0) {
    roles.all = await MapStats(teamRoles.all[0]);
  }

  if (Array.isArray(teamRoles.Attacker) && teamRoles.Attacker.length > 0) {
    roles.attackers = await MapStats(teamRoles.Attacker[0]);
  }

  if (Array.isArray(teamRoles.Defender) && teamRoles.Defender.length > 0) {
    roles.defenders = await MapStats(teamRoles.Defender[0]);
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
