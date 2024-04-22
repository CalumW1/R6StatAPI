import { AuthCommandHandler, getExpiryDate } from './AuthCommandHandler.js';
import { ApiClient } from './ApiClient.js';
import {
  RANKED_UBI_SPACEIDS,
  UBI_DATADEV_URI,
  UBI_GETSTATS,
  UBI_RANKED_SESSIONID,
  UBI_DATADEV_APPID,
} from '../utils/helperFunctions.js';
import { Operator } from '../domain/entitites/Operator.js';

export const GetOperatorQueryHandler = async (
  userId,
  platform,
  view,
  aggregation,
  gameMode,
  teamRole,
  season
) => {
  const token = await AuthCommandHandler();

  const expiration = await getExpiryDate();

  const platformChange = platform === 'uplay' ? 'PC' : 'CONSOLE';

  const spaceId = RANKED_UBI_SPACEIDS.find(x => x.id === platformChange).value;

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-SessionId': UBI_RANKED_SESSIONID,
    'Ubi-AppId': UBI_DATADEV_APPID,
    'Content-Type': 'application/json',
    expiration: expiration,
  };

  const URI =
    UBI_DATADEV_URI +
    UBI_GETSTATS(userId, spaceId, platformChange, view, aggregation, gameMode, teamRole, season);

  const data = await ApiClient(URI, headers, 'GET');

  const operatorsByMode = {};
  for (const [platform, platformData] of Object.entries(data.profileData)) {
    for (const [gameMode, modeData] of Object.entries(
      platformData.platforms[platformChange].gameModes
    )) {
      const attackers = [];
      const defenders = [];
      if (modeData.teamRoles) {
        for (const [role, operators] of Object.entries(modeData.teamRoles)) {
          for (const operator of operators) {
            if (role === 'attacker') {
              attackers.push(
                new Operator(
                  operator.type,
                  operator.statsType,
                  operator.statsDetail,
                  operator.matchesPlayed,
                  operator.roundsPlayed,
                  operator.minutesPlayed,
                  operator.matchesWon,
                  operator.matchesLost,
                  operator.roundsWon,
                  operator.roundsLost,
                  operator.kills,
                  operator.assists,
                  operator.death,
                  operator.headshots,
                  operator.meleeKills,
                  operator.teamKills,
                  operator.openingKills,
                  operator.openingDeaths,
                  operator.trades,
                  operator.openingKillTrades,
                  operator.openingDeathTrades,
                  operator.revives,
                  operator.distanceTravelled,
                  operator.winLossRatio,
                  operator.killDeathRatio,
                  operator.headshotAccuracy,
                  operator.killsPerRound,
                  operator.roundsWithAKill,
                  operator.roundsWithMultiKill,
                  operator.roundsWithOpeningKill,
                  operator.roundsWithOpeningDeath,
                  operator.roundsWithKOST,
                  operator.roundsSurvived,
                  operator.roundsWithAnAce,
                  operator.roundsWithClutch,
                  operator.timeAlivePerMatch,
                  operator.timeDeadPerMatch,
                  operator.distancePerRound
                )
              );
            } else if (role === 'defender') {
              defenders.push(
                new Operator(
                  operator.type,
                  operator.statsType,
                  operator.statsDetail,
                  operator.matchesPlayed,
                  operator.roundsPlayed,
                  operator.minutesPlayed,
                  operator.matchesWon,
                  operator.matchesLost,
                  operator.roundsWon,
                  operator.roundsLost,
                  operator.kills,
                  operator.assists,
                  operator.death,
                  operator.headshots,
                  operator.meleeKills,
                  operator.teamKills,
                  operator.openingKills,
                  operator.openingDeaths,
                  operator.trades,
                  operator.openingKillTrades,
                  operator.openingDeathTrades,
                  operator.revives,
                  operator.distanceTravelled,
                  operator.winLossRatio,
                  operator.killDeathRatio,
                  operator.headshotAccuracy,
                  operator.killsPerRound,
                  operator.roundsWithAKill,
                  operator.roundsWithMultiKill,
                  operator.roundsWithOpeningKill,
                  operator.roundsWithOpeningDeath,
                  operator.roundsWithKOST,
                  operator.roundsSurvived,
                  operator.roundsWithAnAce,
                  operator.roundsWithClutch,
                  operator.timeAlivePerMatch,
                  operator.timeDeadPerMatch,
                  operator.distancePerRound
                )
              );
            }
          }
        }
      }
      operatorsByMode[gameMode] = { attackers, defenders };
    }
  }

  return operatorsByMode;
};
