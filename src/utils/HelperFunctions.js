// export const UBI_APPID = '3587dcbb-7f81-457c-9781-0e3f29f6f56a';
export const UBI_APPID = 'e3d5ea9e-50bd-43b7-88bf-39794f4e3d40';

export const UBI_DATADEV_APPID = '3587dcbb-7f81-457c-9781-0e3f29f6f56a';

export const UBI_DATADEV_SESSIONID = '7d1ea7b3-023f-49d0-b51a-f2962c9ee041';

export const UBI_AUTH_URI = '/profiles/sessions';

export const UBI_SESSIONID = '089aa129-cb3a-43d6-9455-e40a5e65f0e7';

export const UBI_RANKED_SESSIONID = '9001da80-6689-453f-baec-d4903a48fdf0';

export const UBI_PROGRESSION_SPACEID = '0d2ae42d-4c27-4cb7-af6c-2099062302bb';

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
  { id: 'CONSOLE', value: '05bfb3f7-6c21-4c42-be1f-97a33fb5cf66' },
  { id: 'PC', value: '5172a557-50b5-4665-b7db-e3f2e8c5041d' },
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

export const Ranks = [
  {
    name: 'Unranked',
    minimumRankPoints: 0,
    maximumRankPoints: 999,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/unranked.png',
  },
  {
    name: 'Copper 5',
    minimumRankPoints: 1000,
    maximumRankPoints: 1099,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/copperfive.png',
  },
  {
    name: 'Copper 4',
    minimumRankPoints: 1100,
    maximumRankPoints: 1199,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/copperfour.png',
  },
  {
    name: 'Copper 3',
    minimumRankPoints: 1200,
    maximumRankPoints: 1299,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/copperthree.png',
  },
  {
    name: 'Copper 2',
    minimumRankPoints: 1300,
    maximumRankPoints: 1399,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/coppertwo.png',
  },
  {
    name: 'Copper 1',
    minimumRankPoints: 1400,
    maximumRankPoints: 1499,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/copperone.png',
  },
  {
    name: 'Bronze 5',
    minimumRankPoints: 1500,
    maximumRankPoints: 1599,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/bronzefive.png',
  },
  {
    name: 'Bronze 4',
    minimumRankPoints: 1600,
    maximumRankPoints: 1699,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/bronzefour.png',
  },
  {
    name: 'Bronze 3',
    minimumRankPoints: 1700,
    maximumRankPoints: 1799,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/bronzethree.png',
  },
  {
    name: 'Bronze 2',
    minimumRankPoints: 1800,
    maximumRankPoints: 1899,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/bronzetwo.png',
  },
  {
    name: 'Bronze 1',
    minimumRankPoints: 1900,
    maximumRankPoints: 1999,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/bronzeone.png',
  },
  {
    name: 'Silver 5',
    minimumRankPoints: 2000,
    maximumRankPoints: 2099,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/silverfive.png',
  },
  {
    name: 'Silver 4',
    minimumRankPoints: 2100,
    maximumRankPoints: 2199,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/silverfour.png',
  },
  {
    name: 'Silver 3',
    minimumRankPoints: 2200,
    maximumRankPoints: 2299,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/silverthree.png',
  },
  {
    name: 'Silver 2',
    minimumRankPoints: 2300,
    maximumRankPoints: 2399,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/silvertwo.png',
  },
  {
    name: 'Silver 1',
    minimumRankPoints: 2400,
    maximumRankPoints: 2499,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/silverone.png',
  },
  {
    name: 'Gold 5',
    minimumRankPoints: 2500,
    maximumRankPoints: 2599,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/goldfive.png',
  },
  {
    name: 'Gold 4',
    minimumRankPoints: 2600,
    maximumRankPoints: 2699,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/goldfour.png',
  },
  {
    name: 'Gold 3',
    minimumRankPoints: 2700,
    maximumRankPoints: 2799,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/goldthree.png',
  },
  {
    name: 'Gold 2',
    minimumRankPoints: 2800,
    maximumRankPoints: 2899,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/goldtwo.png',
  },
  {
    name: 'Gold 1',
    minimumRankPoints: 2900,
    maximumRankPoints: 2999,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/goldone.png',
  },
  {
    name: 'Platinum 5',
    minimumRankPoints: 3000,
    maximumRankPoints: 3099,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/platinumfive.png',
  },
  {
    name: 'Platinum 4',
    minimumRankPoints: 3100,
    maximumRankPoints: 3199,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/platinumfour.png',
  },
  {
    name: 'Platinum 3',
    minimumRankPoints: 3200,
    maximumRankPoints: 3299,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/platinumthree.png',
  },
  {
    name: 'Platinum 2',
    minimumRankPoints: 3300,
    maximumRankPoints: 3399,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/platinumtwo.png',
  },
  {
    name: 'Platinum 1',
    minimumRankPoints: 3400,
    maximumRankPoints: 3499,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/platinumone.png',
  },
  {
    name: 'Emerald 5',
    minimumRankPoints: 3500,
    maximumRankPoints: 3599,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/emeraldfive.png',
  },
  {
    name: 'Emerald 4',
    minimumRankPoints: 3600,
    maximumRankPoints: 3699,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/emeraldfour.png',
  },
  {
    name: 'Emerald 3',
    minimumRankPoints: 3700,
    maximumRankPoints: 3799,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/emeraldthree.png',
  },
  {
    name: 'Emerald 2',
    minimumRankPoints: 3800,
    maximumRankPoints: 3899,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/emeraldtwo.png',
  },
  {
    name: 'Emerald 1',
    minimumRankPoints: 3900,
    maximumRankPoints: 3999,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/emeraldone.png',
  },
  {
    name: 'Diamond 5',
    minimumRankPoints: 4000,
    maximumRankPoints: 4099,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/diamondfive.png',
  },
  {
    name: 'Diamond 4',
    minimumRankPoints: 4100,
    maximumRankPoints: 4199,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/diamondfour.png',
  },
  {
    name: 'Diamond 3',
    minimumRankPoints: 4200,
    maximumRankPoints: 4299,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/diamondthree.png',
  },
  {
    name: 'Diamond 2',
    minimumRankPoints: 4300,
    maximumRankPoints: 4399,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/diamondtwo.png',
  },
  {
    name: 'Diamond 1',
    minimumRankPoints: 4400,
    maximumRankPoints: 4499,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/diamondone.png',
  },
  {
    name: 'Champions',
    minimumRankPoints: 4500,
    maximumRankPoints: 9999,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/champion.png',
  },
];
