export interface GameModes {
  ranked: Operators;
  unranked: Operators;
  casual: Operators;
  all: Operators;
}

export interface Operators {
  attackers: OperatorStats[];
  defenders: OperatorStats[];
}

export interface OperatorStats {
  type: string;
  statsType: string;
  statsDetail: string;
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
export interface ServerStatus {
  MDM: string;
  SpaceID: string;
  Category: string;
  Name: string;
  platform: string;
  status: string;
  maintenance: string;
  impactedFeatures: string[];
}

export interface Profiles {
  profiles: User[];
}

export interface User {
  profileId: string;
  userId: string;
  platformType: string;
  idOnPlatform: string;
  nameOnPlatform: string;
  avatars: Avatars;
}

interface Avatars {
  '146': string;
  '256': string;
  '500': string;
}

export interface Progression {
  level: number;
  xp: number;
}

export interface UserRank {
  casual?: RankStats;
  event?: RankStats;
  warmup?: RankStats;
  standard?: RankStats;
  ranked?: RankStats;
}

export interface RankStats {
  profile_board_id: string;
  id: string;
  max_rank: number;
  max_rank_points: number;
  platform_family: string;
  rank: number;
  rank_points: number;
  rank_name: string;
  season_id: number;
  top_rank_position: number;
  deaths: number;
  kills: number;
  abandons: number;
  losses: number;
  wins: number;
  rankImage: string;
}

export interface UserStats {
  all: Role;
  ranked: Role;
  unranked: Role;
  casual: Role;
}

export interface Role {
  attackers?: Stats;
  defenders?: Stats;
  all?: Stats;
}

export interface Stats {
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
