import fetch from 'node-fetch';
import {
  UBI_DATADEV_SESSIONID,
  UBI_DATADEV_URI,
  UBI_GETSTATS,
  userStats,
  RANKED_UBI_SPACEIDS,
} from './constants.js';
import { getAuth, getExpiryDate } from './auth.js';

const getUserStats = async (
  userId,
  profileId,
  platform,
  view,
  aggregation,
  gameMode,
  teamRole,
  season
) => {
  const token = await getAuth();
  const expiration = await getExpiryDate();

  console.log(expiration);

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-SessionId': UBI_DATADEV_SESSIONID,
    'Content-Type': 'application/json',
    expiration: expiration,
  };

  const platformTransformation = platform === 'uplay' ? 'PC' : 'CONSOLE';
  console.log(platformTransformation);

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

  const response = await fetch(URI, { method: 'GET', headers: headers });

  const data = await response.json();

  const id = platformTransformation === 'PC' ? userId : profileId;

  const userStat = Object.values(data.profileData[id].platforms[platformTransformation]).reduce(
    (accumulator, gameModes) => {
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
    },
    []
  );
  return userStat;
};

const mapValues = (gameMode, mode) => {
  const allMode = gameMode?.teamRoles?.all;
  if (allMode && allMode.length > 0) {
    return allMode.reduce((acc, stats) => {
      acc = new userStats(
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
        stats.winLossRation,
        stats.killDeathRatio,
        stats.headshotAccuracy,
        stats.killsPerRound,
        stats.roundsWithAKill,
        stats.roundsWithAMultiKill,
        stats.roundsWithOpeningKill,
        stats.roundsWithOpeningDeath,
        stats.roundsWithKOST,
        stats.roundsSurvived,
        stats.roundsWithAnAce,
        stats.roundsWithClutch,
        stats.rimeAlivePerMatch,
        stats.timeDeadPerMatch,
        stats.distancePerRound
      );
      return { ...acc };
    }, {});
  }
  return {};
};

export default getUserStats;
