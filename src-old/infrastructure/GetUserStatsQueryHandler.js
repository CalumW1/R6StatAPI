import { ApiClient } from './ApiClient.js';
import { AuthCommandHandler, getExpiryDate } from './AuthCommandHandler.js';
import {
  RANKED_UBI_SPACEIDS,
  UBI_DATADEV_SESSIONID,
  UBI_DATADEV_URI,
  UBI_GETSTATS,
} from '../utils/HelperFunctions.js';
import { UserStats } from '../domain/entitites/UserStats.js';

export const GetUserStatsQueryHandler = async (
  userId,
  profileId,
  platform,
  view,
  aggregation,
  gameMode,
  teamRole,
  season
) => {
  const token = await AuthCommandHandler();
  const expiration = await getExpiryDate();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-SessionId': UBI_DATADEV_SESSIONID,
    'Content-Type': 'application/json',
    expiration: expiration,
  };

  const platformTransformation = platform === 'uplay' ? 'PC' : 'CONSOLE';

  const spaceId = RANKED_UBI_SPACEIDS.find(x => x.id === platformTransformation).value;

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

  const userStat = Object.values(
    response.profileData[userId].platforms[platformTransformation]
  ).reduce((accumulator, gameModes) => {
    Object.entries(gameModes).map(([gameMode, data]) => {
      if (gameMode === 'ranked') {
        const ranked = mapValues(data, 'ranked');
        accumulator.push(ranked);
      } else if (gameMode === 'all') {
        const all = mapValues(data, 'all');
        accumulator.push(all);
      } else if (gameMode === 'unranked') {
        const unranked = mapValues(data, 'unranked');
        accumulator.push(unranked);
      } else if (gameMode === 'casual') {
        const casual = mapValues(data);
        accumulator.push(casual);
      }
    });
    return accumulator;
  }, []);
  return userStat;
};

const mapValues = (gameMode, mode) => {
  const allMode = gameMode?.teamRoles?.all;
  if (allMode && allMode.length > 0) {
    return allMode.reduce((acc, stats) => {
      acc = new UserStats(
        mode,
        stats.type,
        stats.statsType,
        stats.statsDetail,
        stats.seasonYear,
        stats.seasonNumber,
        stats.matchesPlayed,
        stats.roundsPlayed,
        stats.minutesPlayed,
        stats.matchesWon,
        stats.matchesLost,
        stats.roundsWon,
        stats.roundsLost,
        stats.kills,
        stats.assists,
        stats.death,
        stats.headshots,
        stats.meleeKills,
        stats.teamKills,
        stats.openingKills,
        stats.openingDeaths,
        stats.trades,
        stats.openingKillTrades,
        stats.openingDeathTrades,
        stats.revives,
        stats.distanceTravelled,
        stats.winLossRatio,
        stats.killDeathRatio,
        stats.headshotAccuracy,
        stats.killsPerRound,
        stats.roundsWithAKill,
        stats.roundsWithMultiKill,
        stats.roundsWithOpeningKill,
        stats.roundsWithOpeningDeath,
        stats.roundsWithKOST,
        stats.roundsSurvived,
        stats.roundsWithAnAce,
        stats.roundsWithClutch,
        stats.timeAlivePerMatch,
        stats.timeDeadPerMatch,
        stats.distancePerRound
      );
      return { ...acc };
    }, {});
  }
  return {};
};
