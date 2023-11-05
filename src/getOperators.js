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

  const allAttackers = Object.values(jsonData.profileData[userId].platforms.PC.gameModes).reduce(
    (accumulator, gameMode) => {
      const attackers = gameMode.teamRoles.Attacker.map(
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
            attacker.matchesLost
          )
      );
      return accumulator.concat(attackers);
    },
    []
  );

  return allAttackers;
};

export default getOperators;
