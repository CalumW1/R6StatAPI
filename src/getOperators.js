import fetch from 'node-fetch';
import {
  UBI_DATADEV_SESSIONID,
  UBI_DATADEV_URI,
  UBI_GETSTATS,
  operator,
  spaceIdCheck,
} from './constants.js';
import { getAuth, getExpiryDate } from './auth.js';

const getOperators = async (userId, platform, view, aggregation, gameMode, teamRole, season) => {
  const token = await getAuth();
  const expiration = await getExpiryDate();

  const spaceId = await spaceIdCheck(platform);

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-SessionId': UBI_DATADEV_SESSIONID,
    'Content-Type': 'application/json',
    expiration: expiration,
  };

  const URI =
    UBI_DATADEV_URI +
    UBI_GETSTATS(userId, spaceId, 'PC', view, aggregation, gameMode, teamRole, season);

  const response = await fetch(URI, {
    method: 'GET',
    headers: headers,
  });

  const data = await response.json();

  const allAttackers = Object.values(data.profileData[userId].platforms.PC.gameModes).reduce(
    (accumulator, gameMode) => {
      const attackers = gameMode?.teamRoles?.Attacker;
      const defenders = gameMode?.teamRoles?.Defender;
      if (attackers && attackers.length > 0) {
        attackers.reduce((acc, att) => {
          const attacker = new operator(
            att.type,
            att.statsType,
            att.statsDetail,
            att.seasonYear,
            att.seasonNumber,
            att.matchesPlayed,
            att.roundsPlayed,
            att.minutesPlayed,
            att.matchesWon,
            att.matchesLost,
            att.roundsWon,
            att.roundsLost,
            att.kills,
            att.assists,
            att.death,
            att.headshots,
            att.meleeKills,
            att.teamKills,
            att.openingKills,
            att.openingDeaths,
            att.trades,
            att.openingKillTrades,
            att.openingDeathTrades,
            att.revives,
            att.distanceTravelled,
            att.winLossRation,
            att.killDeathRatio,
            att.headshotAccuracy,
            att.killsPerRound,
            att.roundsWithAKill,
            att.roundsWithAMultiKill,
            att.roundsWithOpeningKill,
            att.roundsWithOpeningDeath,
            att.roundsWithKOST,
            att.roundsSurvived,
            att.roundsWithAnAce,
            att.roundsWithClutch,
            att.rimeAlivePerMatch,
            att.timeDeadPerMatch,
            att.distancePerRound
          );
          return { ...acc, ...attacker };
        }, {});
      }

      if (defenders && defenders.length > 0) {
        defenders.reduce((acc, def) => {
          const defender = new operator(
            def.type,
            def.statsType,
            def.statsDetail,
            def.seasonYear,
            def.seasonNumber,
            def.matchesPlayed,
            def.roundsPlayed,
            def.minutesPlayed,
            def.matchesWon,
            def.matchesLost,
            def.roundsWon,
            def.roundsLost,
            def.kills,
            def.assists,
            def.death,
            def.headshots,
            def.meleeKills,
            def.teamKills,
            def.openingKills,
            def.openingDeaths,
            def.trades,
            def.openingKillTrades,
            def.openingDeathTrades,
            def.revives,
            def.distanceTravelled,
            def.winLossRation,
            def.killDeathRatio,
            def.headshotAccuracy,
            def.killsPerRound,
            def.roundsWithAKill,
            def.roundsWithAMultiKill,
            def.roundsWithOpeningKill,
            def.roundsWithOpeningDeath,
            def.roundsWithKOST,
            def.roundsSurvived,
            def.roundsWithAnAce,
            def.roundsWithClutch,
            def.rimeAlivePerMatch,
            def.timeDeadPerMatch,
            def.distancePerRound
          );
          return { ...acc, ...defender };
        }, {});
      }

      return accumulator
        .concat({ attacker: attackers ?? [] })
        .concat({ defender: defenders ?? [] });
    },
    []
  );

  return allAttackers;
};

export default getOperators;
