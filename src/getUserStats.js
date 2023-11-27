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

  const userStat = Object.values(data.profileData[userId].platforms.PC).reduce(
    (accumulator, gameModes) => {

      Object.entries(gameModes).map(([gameMode, data]) => {
        if(gameMode === 'ranked') {
          const ranked = mapValues(data, 'ranked')
          console.log(ranked)
          accumulator.push(ranked)
        }
        else if (gameMode === 'all'){
          const all = mapValues(data, 'all')
          accumulator.push(all)
        }
        else if (gameMode === 'casual') {
          const casual = mapValues(data)
          accumulator.push(casual);
        }    
      });
      return accumulator;
    }, []
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
      return acc;
    }, {})
  }
  return {};
}

export default getUserStats;
