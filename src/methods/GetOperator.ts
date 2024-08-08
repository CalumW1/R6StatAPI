import { ApiClient } from './ApiClient';
import { CheckToken, GetExperation } from './Auth';
import {
  UBI_RANKED_SESSIONID,
  UBI_DATADEV_APPID,
  UBI_DATADEV_URI,
  UBI_GETSTATS,
  RANKED_UBI_SPACEIDS,
} from '../constants';

export interface Operators {
  attackers: OperatorStats[];
  defenders: OperatorStats[];
}

interface OperatorStats {
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
  trades: number;
  openingKillTrades: number;
  openingDeathTrades: number;
  revives: number;
  distanceTravelled: number;
  winLossRatio: number;
  KillDeathRatio: number;
  headshotAccuracy: number;
  killsPerRound: number;
  roundsWithAkull: number;
  roundsWithAKill: number;
  roundsWithAMultiKill: number;
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

export const GetOperator = async (
  userId: string,
  platform: string,
  view: string,
  aggregation: string,
  gameMode: string,
  teamRole: string,
  season: string
): Promise<Operators> => {
  var token = await CheckToken();
  var expiration = await GetExperation();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-SessionId': UBI_RANKED_SESSIONID,
    'Ubi-AppId': UBI_DATADEV_APPID,
    'Content-Type': 'application/json',
    expiration: expiration,
  };

  const platformChange = platform === 'uplay' ? 'PC' : 'CONSOLE';

  const spaceId: any = RANKED_UBI_SPACEIDS.find(x => x.id === platformChange)?.value;

  console.log(`Experation token ${expiration}`);
  console.log(`spaceId ${spaceId}`);

  const URI =
    UBI_DATADEV_URI +
    UBI_GETSTATS(userId, spaceId, platformChange, view, aggregation, gameMode, teamRole, season);

  const data = await ApiClient(URI, headers, 'GET');

  console.log(JSON.stringify(data));

  const operators: Operators = {
    attackers: [],
    defenders: [],
  };

  return operators;
};
