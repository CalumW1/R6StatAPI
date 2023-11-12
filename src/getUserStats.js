import fetch from 'node-fetch';
import {
  UBI_DATADEV_SESSIONID,
  UBI_DATADEV_URI,
  UBI_GETSTATS,
  spaceIdCheck,
  userStats,
} from './constants.js';
import getAuth from './auth.js';
import auth from './Auth.json' assert { type: 'json' };

const getUserStats = async (userId, platform, view, aggregation, gameMode, teamRole, season) => {
  const token = await getAuth();

  const spaceId = await spaceIdCheck(platform);

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-SessionId': UBI_DATADEV_SESSIONID,
    'Content-Type': 'application/json',
    expiration: auth.expiration,
  };

  const URI =
    UBI_DATADEV_URI +
    UBI_GETSTATS(userId, spaceId, 'PC', view, aggregation, gameMode, teamRole, season);

  const response = await fetch(URI, { method: 'GET', headers: headers });

  const data = await response.json();

  console.log(data);

  const userStats = Object.values(data.profileData[userId].platforms.PC.gameModes).reduce(
    (accumulator, gameMode) => {
      const allMode = gameMode?.teamRoles?.all;
      if (allMode && allMode.length > 0) {
        allMode.reduce((acc, stats) => {
          const user = new userStats(
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
          return { ...acc, ...user };
        }, {});
      }
      return { ...accumulator, ...allMode };
    }
  );
  return userStats;
};

export default getUserStats;
