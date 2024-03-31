// export const UBI_APPID = '3587dcbb-7f81-457c-9781-0e3f29f6f56a';
export const UBI_APPID = 'e3d5ea9e-50bd-43b7-88bf-39794f4e3d40';

export const UBI_DATADEV_APPID = '3587dcbb-7f81-457c-9781-0e3f29f6f56a';

export const UBI_DATADEV_SESSIONID = '7d1ea7b3-023f-49d0-b51a-f2962c9ee041';

export const UBI_AUTH_URI = '/profiles/sessions';

export const UBI_SESSIONID = '089aa129-cb3a-43d6-9455-e40a5e65f0e7';

export const UBI_SANDBOXES = [
  { id: 'uplay', value: 'OSBOR_PC_LNCH_A' },
  { id: 'psn', value: 'OSBOR_PS4_LNCH_A' },
  { id: 'xbl', value: 'OSBOR_XBOXONE_LNCH_A' },
];

export const UBI_SPACEIDS = [
  { id: 'uplay', value: '0d2ae42d-4c27-4cb7-af6c-2099062302bb' },
  { id: 'psn', value: '05bfb3f7-6c21-4c42-be1f-97a33fb5cf66' },
  { id: 'xbl', value: '98a601e5-ca91-4440-b1c5-753f601a2c90' },
];

export const RANKED_UBI_SPACEIDS = [
  { id: 'console', value: '05bfb3f7-6c21-4c42-be1f-97a33fb5cf66' },
  { id: 'pc', value: '5172a557-50b5-4665-b7db-e3f2e8c5041d' },
];

export const UBI_SERVER_IDS = [
  { id: 'pc', value: 'e3d5ea9e-50bd-43b7-88bf-39794f4e3d40' },
  { id: 'psn', value: 'fb4cc4c9-2063-461d-a1e8-84a7d36525fc' },
  { id: 'xbl', value: '4008612d-3baf-49e4-957a-33066726a7bc' },
];

export const UBI_REGIONID = ['emea', 'ncsa', 'apac'];

export const UBI_BOARDID = ['pvp_ranked', 'pvp_casual', 'pvp_newcomer', 'pvp_event'];

export const BASE_UBI_URI = version => `https://public-ubiservices.ubi.com/v${version}`;

export const UBI_SERVER_STATUS_URI = 'https://game-status-api.ubisoft.com/v1';

export const UBI_DATADEV_URI = 'https://prod.datadev.ubisoft.com/v1';

export const UBI_GETUSERBYUSERNAME_URI = (userName, platform) =>
  `/profiles?namesOnPlatform=${userName}&platformType=${platform}`;

export const UBI_GETUSERBYID_URI = userId => `/profiles?userIds=${userId}`;

export const UBI_GETPLAYERPROGRESSION = (spaceId, sandbox, playerIds) =>
  `/spaces/${spaceId}/sandboxes/${sandbox}/r6playerprofile/playerprofile/progressions?profile_ids=${playerIds}`;

export const UBI_GETSERVERSTATUS = serverId => `/instances?appIds=${serverId}`;

export const UBI_RANKED_URI = (spaceId, sandboxId, boardId, seasons, regionId, profileIds) =>
  `/spaces/${spaceId}/sandboxes/${sandboxId}/r6karma/player_skill_records?board_ids=${boardId}&season_ids=${seasons}&region_ids=${regionId}&profile_ids=${profileIds}`;

export const UBI_PROFILEV2_URI = (profileId, platform) =>
  `https://public-ubiservices.ubi.com/v2/spaces/0d2ae42d-4c27-4cb7-af6c-2099062302bb/title/r6s/skill/full_profiles?profile_ids=${profileId}&platform_families=${platform}`;

export const UBI_GETPLAYERPROGRESSION2 = (spaceId, playerId) =>
  `/spaces/${spaceId}/title/r6s/rewards/public_profile?profile_id=${playerId}`;

export const UBI_RANKED_URI_V2 = (profileId, platform) =>
  `/spaces/0d2ae42d-4c27-4cb7-af6c-2099062302bb/title/r6s/skill/full_profiles?profile_ids=${profileId}&platform_families=${platform}`;

export const UBI_GETSTATS = (
  userId,
  spaceId,
  platform,
  view,
  aggregation,
  gameMode,
  teamRole,
  seasons
) =>
  `/users/${userId}/playerstats?spaceId=${spaceId}&view=${view}&aggregation=${aggregation}&gameMode=${gameMode}&platformGroup=${platform}&teamRole=${teamRole}&seasons=${seasons}`;

// Helper Functions

export const platformCheck = platform => (platform === 'xbl' || 'psn' ? 'console' : platform);

// DTOs
export class ProgressionDto {
  constructor(xp, profileId, lootboxProbability, level) {
    (this.xp = xp),
      (this.profileId = profileId),
      (this.lootboxProbability = lootboxProbability),
      (this.level = level);
  }
}

export class ServerStatusDto {
  constructor(platform, status, maintenance, impactedFeatures) {
    (this.platform = platform),
      (this.status = status),
      (this.maintenance = maintenance),
      (this.impactedFeatures = impactedFeatures);
  }
}

export class UserProfileDto {
  constructor(profileId, userId, platformType, idOnPlatform, nameOnPlatform) {
    (this.profileId = profileId),
      (this.userId = userId),
      (this.platformType = platformType),
      (this.idOnPlatform = idOnPlatform),
      (this.nameOnPlatform = nameOnPlatform);
  }
}

export class UserRankDtoV1 {
  constructor(
    maxMMR,
    skillMean,
    deaths,
    profileId,
    nextRankMMR,
    rank,
    maxRank,
    boardId,
    skillStdev,
    kills,
    lastMatchSkillStdevChange,
    pastSeasonWins,
    updateTime,
    lastMatchMMRChange,
    abandons,
    season,
    pastSeasonsLosses,
    topRankPosition,
    lastMatchSkillMeanChange,
    MMR,
    previousRankMMR,
    lastMatchResult,
    pastSeasonsAbandons,
    wins,
    region,
    losses
  ) {
    (this.maxMMR = maxMMR), (this.skillMean = skillMean);
    (this.deaths = deaths),
      (this.profileId = profileId),
      (this.nextRankMMR = nextRankMMR),
      (this.rank = rank),
      (this.maxRank = maxRank),
      (this.boardId = boardId),
      (this.skillStdev = skillStdev),
      (this.kills = kills),
      (this.lastMatchSkillStdevChange = lastMatchSkillStdevChange),
      (this.pastSeasonWins = pastSeasonWins),
      (this.updateTime = updateTime),
      (this.lastMatchMMRChange = lastMatchMMRChange),
      (this.abandons = abandons),
      (this.season = season),
      (this.pastSeasonsLosses = pastSeasonsLosses),
      (this.topRankPosition = topRankPosition),
      (this.lastMatchSkillMeanChange = lastMatchSkillMeanChange),
      (this.MMR = MMR),
      (this.previousRankMMR = previousRankMMR),
      (this.lastMatchResult = lastMatchResult),
      (this.pastSeasonsAbandons = pastSeasonsAbandons),
      (this.wins = wins),
      (this.region = region),
      (this.losses = losses);
  }
}

export class UserRankDtoV2 {
  constructor(
    boardId,
    id,
    maxRank,
    maxRankPoints,
    platformFamily,
    rank,
    rankPoints,
    seasonId,
    topRankPosition,
    deaths,
    kills,
    abandons,
    wins,
    losses
  ) {
    (this.boardId = boardId),
      (this.id = id),
      (this.maxRank = maxRank),
      (this.maxRankPoints = maxRankPoints),
      (this.platformFamily = platformFamily),
      (this.rank = rank),
      (this.rankPoints = rankPoints),
      (this.seasonId = seasonId),
      (this.topRankPosition = topRankPosition),
      (this.deaths = deaths),
      (this.kills = kills),
      (this.abandons = abandons),
      (this.wins = wins),
      (this.losses = losses);
  }
}

export class operator {
  constructor(
    type,
    statsType,
    statsDetail,
    seasonYear,
    seasonNumber,
    matchesPlayed,
    roundsPlayed,
    minutesPlayed,
    matchesWon,
    matchesLost,
    roundsWon,
    roundsLost,
    kills,
    assists,
    death,
    headshots,
    meleeKills,
    teamKills,
    openingKills,
    openingDeaths,
    trades,
    openingKillTrades,
    openingDeathTrades,
    revives,
    distanceTravelled,
    winLossRatio,
    killDeathRatio,
    headshotAccuracy,
    killsPerRound,
    roundsWithAKill,
    roundsWithAMultiKill,
    roundsWithOpeningKill,
    roundsWithOpeningDeath,
    roundsWithKOST,
    roundsSurvived,
    roundsWithAnAce,
    roundsWithClutch,
    timeAlivePerMatch,
    timeDeadPerMatch,
    distancePerRound
  ) {
    (this.type = type),
      (this.statsType = statsType),
      (this.statsDetail = statsDetail),
      (this.seasonYear = seasonYear),
      (this.seasonNumber = seasonNumber),
      (this.matchesPlayed = matchesPlayed),
      (this.roundsPlayed = roundsPlayed),
      (this.minutesPlayed = minutesPlayed),
      (this.matchesWon = matchesWon),
      (this.matchesLost = matchesLost),
      (this.roundsWon = roundsWon),
      (this.roundsLost = roundsLost),
      (this.kills = kills),
      (this.assists = assists),
      (this.death = death),
      (this.headshots = headshots),
      (this.meleeKills = meleeKills),
      (this.teamKills = teamKills),
      (this.openingKills = openingKills),
      (this.openingDeaths = openingDeaths),
      (this.trades = trades),
      (this.openingKillTrades = openingKillTrades),
      (this.openingDeathTrades = openingDeathTrades),
      (this.revives = revives),
      (this.distanceTravelled = distanceTravelled),
      (this.winLossRatio = winLossRatio),
      (this.killDeathRatio = killDeathRatio),
      (this.headshotAccuracy = headshotAccuracy),
      (this.killsPerRound = killsPerRound),
      (this.roundsWithAKill = roundsWithAKill),
      (this.roundsWithAMultiKill = roundsWithAMultiKill),
      (this.roundsWithOpeningKill = roundsWithOpeningKill),
      (this.roundsWithOpeningDeath = roundsWithOpeningDeath),
      (this.roundsWithKOST = roundsWithKOST),
      (this.roundsSurvived = roundsSurvived),
      (this.roundsWithAnAce = roundsWithAnAce),
      (this.roundsWithClutch = roundsWithClutch),
      (this.timeAlivePerMatch = timeAlivePerMatch),
      (this.timeDeadPerMatch = timeDeadPerMatch),
      (this.distancePerRound = distancePerRound);
  }
}

export class userStats {
  constructor(
    gameMode,
    type,
    statsType,
    statsDetail,
    seasonYear,
    seasonNumber,
    matchesPlayed,
    roundsPlayed,
    minutesPlayed,
    matchesWon,
    matchesLost,
    roundsWon,
    roundsLost,
    kills,
    assists,
    death,
    headshots,
    meleeKills,
    teamKills,
    openingKills,
    openingDeaths,
    trades,
    openingKillTrades,
    openingDeathTrades,
    revives,
    distanceTravelled,
    winLossRatio,
    killDeathRatio,
    headshotAccuracy,
    killsPerRound,
    roundsWithAKill,
    roundsWithAMultiKill,
    roundsWithOpeningKill,
    roundsWithOpeningDeath,
    roundsWithKOST,
    roundsSurvived,
    roundsWithAnAce,
    roundsWithClutch,
    timeAlivePerMatch,
    timeDeadPerMatch,
    distancePerRound
  ) {
    (this.gameMode = gameMode),
      (this.type = type),
      (this.statsType = statsType),
      (this.statsDetail = statsDetail),
      (this.seasonYear = seasonYear),
      (this.seasonNumber = seasonNumber),
      (this.matchesPlayed = matchesPlayed),
      (this.roundsPlayed = roundsPlayed),
      (this.minutesPlayed = minutesPlayed),
      (this.matchesWon = matchesWon),
      (this.matchesLost = matchesLost),
      (this.roundsWon = roundsWon),
      (this.roundsLost = roundsLost),
      (this.kills = kills),
      (this.assists = assists),
      (this.death = death),
      (this.headshots = headshots),
      (this.meleeKills = meleeKills),
      (this.teamKills = teamKills),
      (this.openingKills = openingKills),
      (this.openingDeaths = openingDeaths),
      (this.trades = trades),
      (this.openingKillTrades = openingKillTrades),
      (this.openingDeathTrades = openingDeathTrades),
      (this.revives = revives),
      (this.distanceTravelled = distanceTravelled),
      (this.winLossRatio = winLossRatio),
      (this.killDeathRatio = killDeathRatio),
      (this.headshotAccuracy = headshotAccuracy),
      (this.killsPerRound = killsPerRound),
      (this.roundsWithAKill = roundsWithAKill),
      (this.roundsWithAMultiKill = roundsWithAMultiKill),
      (this.roundsWithOpeningKill = roundsWithOpeningKill),
      (this.roundsWithOpeningDeath = roundsWithOpeningDeath),
      (this.roundsWithKOST = roundsWithKOST),
      (this.roundsSurvived = roundsSurvived),
      (this.roundsWithAnAce = roundsWithAnAce),
      (this.roundsWithClutch = roundsWithClutch),
      (this.timeAlivePerMatch = timeAlivePerMatch),
      (this.timeDeadPerMatch = timeDeadPerMatch),
      (this.distancePerRound = distancePerRound);
  }
}

// error handling

export const sandboxCheck = async sandboxId => {
  const sandbox = UBI_SANDBOXES.find(x => x.id === sandboxId).value;

  if (!sandbox) {
    throw new Error(`Sandbox ${sandboxId} doesn't exist`);
  }

  return sandbox;
};

export const spaceIdCheck = async spaceId => {
  const space = UBI_SPACEIDS.find(x => x.id === spaceId).value;

  if (!space) {
    throw new Error(`SpaceId ${spaceId} doesn't exist`);
  }

  return space;
};

export const boardIdCheck = async boardId => {
  const board = UBI_BOARDID.find(x => x === boardId);

  if (!board) {
    throw new Error(`BoardId ${boardId} doesn't exist`);
  }

  return board;
};

export const regionIdCheck = async regionId => {
  const region = UBI_REGIONID.find(x => x === regionId);

  if (!region) {
    throw new Error(`RegionId ${regionId} doesn't exist`);
  }

  return region;
};
