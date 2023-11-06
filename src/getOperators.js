import fetch from 'node-fetch';
import {
  UBI_DATADEV_SESSIONID,
  UBI_DATADEV_URI,
  UBI_GETSTATS,
  operator,
  spaceIdCheck,
} from './constants.js';
import getAuth from './auth.js';
import auth from './Auth.json' assert { type: 'json' };

const getOperators = async (userId, platform, view, aggregation, gameMode, teamRole, season) => {
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

  const response = await fetch(URI, {
    method: 'GET',
    headers: headers,
  });

  const data = await response.json();

  console.log(data);

  const allAttackers = Object.values(data.profileData[userId].platforms.PC.gameModes).reduce(
    (accumulator, gameMode) => {
      const attackers = gameMode.teamRoles.attacker.map(
        attacker =>
          new operator(
            attacker.type,
            attacker.statsType,
            attacker.statsDetail,
            attacker.seasonYear,
            attacker.seasonNumber,
            attacker.matchesPlayed,
            attacker.roundsPlayed,
            attacker.minutesPlayed,
            attacker.matchesWon,
            attacker.matchesLost,
            attacker.roundsWon,
            attacker.roundsLost,
            attacker.kills,
            attacker.assists,
            attacker.death,
            attacker.headshots,
            attacker.meleeKills,
            attacker.teamKills,
            attacker.openingKills,
            attacker.openingDeaths,
            attacker.trades,
            attacker.openingKillTrades,
            attacker.openingDeathTrades,
            attacker.revives,
            attacker.distanceTravelled,
            attacker.winLossRation,
            attacker.killDeathRatio,
            attacker.headshotAccuracy,
            attacker.killsPerRound,
            attacker.roundsWithAKill,
            attacker.roundsWithAMultiKill,
            attacker.roundsWithOpeningKill,
            attacker.roundsWithOpeningDeath,
            attacker.roundsWithKOST,
            attacker.roundsSurvived,
            attacker.roundsWithAnAce,
            attacker.roundsWithClutch,
            attacker.rimeAlivePerMatch,
            attacker.timeDeadPerMatch,
            attacker.distancePerRound
          )
      );
      return accumulator.concat(attackers);
    },
    []
  );

  return allAttackers;
};

export default getOperators;
