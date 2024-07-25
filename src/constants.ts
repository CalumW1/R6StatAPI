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

export const BASE_UBI_URI = (version: number) => `https://public-ubiservices.ubi.com/v${version}`;

export const UBI_SERVER_STATUS_URI = 'https://game-status-api.ubisoft.com/v1';

export const UBI_DATADEV_URI = 'https://prod.datadev.ubisoft.com/v1';

export const UBI_GETUSERBYUSERNAME_URI = (userName: string, platform: string) =>
  `/profiles?namesOnPlatform=${userName}&platformType=${platform}`;

export const UBI_GETUSERBYID_URI = (userId: string) => `/profiles?userIds=${userId}`;

export const UBI_GETPLAYERPROGRESSION = (spaceId: string, sandbox: string, playerIds: string) =>
  `/spaces/${spaceId}/sandboxes/${sandbox}/r6playerprofile/playerprofile/progressions?profile_ids=${playerIds}`;

export const UBI_GETSERVERSTATUS = (serverId: string) => `/instances?appIds=${serverId}`;

export const UBI_RANKED_URI = (
  spaceId: string,
  sandboxId: string,
  boardId: string,
  seasons: string,
  regionId: string,
  profileIds: string
) =>
  `/spaces/${spaceId}/sandboxes/${sandboxId}/r6karma/player_skill_records?board_ids=${boardId}&season_ids=${seasons}&region_ids=${regionId}&profile_ids=${profileIds}`;

export const UBI_PROFILEV2_URI = (profileId: string, platform: string) =>
  `https://public-ubiservices.ubi.com/v2/spaces/0d2ae42d-4c27-4cb7-af6c-2099062302bb/title/r6s/skill/full_profiles?profile_ids=${profileId}&platform_families=${platform}`;

export const UBI_GETPLAYERPROGRESSION2 = (spaceId: string, userId: string) =>
  `/spaces/${spaceId}/title/r6s/rewards/public_profile?profile_id=${userId}`;

export const UBI_RANKED_URI_V2 = (profileId: string, platform: string) =>
  `/spaces/0d2ae42d-4c27-4cb7-af6c-2099062302bb/title/r6s/skill/full_profiles?profile_ids=${profileId}&platform_families=${platform}`;

export const UBI_GETSTATS = (
  userId: string,
  spaceId: string,
  platform: string,
  view: string,
  aggregation: string,
  gameMode: string,
  teamRole: string,
  seasons: string
) =>
  `/users/${userId}/playerstats?spaceId=${spaceId}&view=${view}&aggregation=${aggregation}&gameMode=${gameMode}&platformGroup=${platform}&teamRole=${teamRole}&seasons=${seasons}`;

export const AvatarURI = (userId: string, size: number) =>
  `https://avatars.ubisoft.com/${userId}/default_${
    size === 500 ? 'tall' : `${size}_${size}`
  }.png?appId=${UBI_DATADEV_APPID}`;

export const AvatarImages = (userId: string) => {
  return {
    146: AvatarURI(userId, 146),
    256: AvatarURI(userId, 256),
    500: AvatarURI(userId, 500),
  };
};

export const Ranks = [
  {
    id: 0,
    name: 'Unranked',
    minimumRankPoints: 0,
    maximumRankPoints: 999,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/unranked.png',
  },
  {
    id: 1,
    name: 'Copper 5',
    minimumRankPoints: 1000,
    maximumRankPoints: 1099,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/copperfive.png',
  },
  {
    id: 2,
    name: 'Copper 4',
    minimumRankPoints: 1100,
    maximumRankPoints: 1199,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/copperfour.png',
  },
  {
    id: 3,
    name: 'Copper 3',
    minimumRankPoints: 1200,
    maximumRankPoints: 1299,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/copperthree.png',
  },
  {
    id: 4,
    name: 'Copper 2',
    minimumRankPoints: 1300,
    maximumRankPoints: 1399,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/coppertwo.png',
  },
  {
    id: 5,
    name: 'Copper 1',
    minimumRankPoints: 1400,
    maximumRankPoints: 1499,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/copperone.png',
  },
  {
    id: 6,
    name: 'Bronze 5',
    minimumRankPoints: 1500,
    maximumRankPoints: 1599,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/bronzefive.png',
  },
  {
    id: 7,
    name: 'Bronze 4',
    minimumRankPoints: 1600,
    maximumRankPoints: 1699,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/bronzefour.png',
  },
  {
    id: 8,
    name: 'Bronze 3',
    minimumRankPoints: 1700,
    maximumRankPoints: 1799,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/bronzethree.png',
  },
  {
    id: 9,
    name: 'Bronze 2',
    minimumRankPoints: 1800,
    maximumRankPoints: 1899,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/bronzetwo.png',
  },
  {
    id: 10,
    name: 'Bronze 1',
    minimumRankPoints: 1900,
    maximumRankPoints: 1999,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/bronzeone.png',
  },
  {
    id: 11,
    name: 'Silver 5',
    minimumRankPoints: 2000,
    maximumRankPoints: 2099,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/silverfive.png',
  },
  {
    id: 12,
    name: 'Silver 4',
    minimumRankPoints: 2100,
    maximumRankPoints: 2199,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/silverfour.png',
  },
  {
    id: 13,
    name: 'Silver 3',
    minimumRankPoints: 2200,
    maximumRankPoints: 2299,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/silverthree.png',
  },
  {
    id: 14,
    name: 'Silver 2',
    minimumRankPoints: 2300,
    maximumRankPoints: 2399,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/silvertwo.png',
  },
  {
    id: 15,
    name: 'Silver 1',
    minimumRankPoints: 2400,
    maximumRankPoints: 2499,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/silverone.png',
  },
  {
    id: 16,
    name: 'Gold 5',
    minimumRankPoints: 2500,
    maximumRankPoints: 2599,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/goldfive.png',
  },
  {
    id: 17,
    name: 'Gold 4',
    minimumRankPoints: 2600,
    maximumRankPoints: 2699,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/goldfour.png',
  },
  {
    id: 18,
    name: 'Gold 3',
    minimumRankPoints: 2700,
    maximumRankPoints: 2799,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/goldthree.png',
  },
  {
    id: 19,
    name: 'Gold 2',
    minimumRankPoints: 2800,
    maximumRankPoints: 2899,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/goldtwo.png',
  },
  {
    id: 20,
    name: 'Gold 1',
    minimumRankPoints: 2900,
    maximumRankPoints: 2999,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/goldone.png',
  },
  {
    id: 21,
    name: 'Platinum 5',
    minimumRankPoints: 3000,
    maximumRankPoints: 3099,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/platinumfive.png',
  },
  {
    id: 22,
    name: 'Platinum 4',
    minimumRankPoints: 3100,
    maximumRankPoints: 3199,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/platinumfour.png',
  },
  {
    id: 23,
    name: 'Platinum 3',
    minimumRankPoints: 3200,
    maximumRankPoints: 3299,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/platinumthree.png',
  },
  {
    id: 24,
    name: 'Platinum 2',
    minimumRankPoints: 3300,
    maximumRankPoints: 3399,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/platinumtwo.png',
  },
  {
    id: 25,
    name: 'Platinum 1',
    minimumRankPoints: 3400,
    maximumRankPoints: 3499,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/platinumone.png',
  },
  {
    id: 26,
    name: 'Emerald 5',
    minimumRankPoints: 3500,
    maximumRankPoints: 3599,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/emeraldfive.png',
  },
  {
    id: 27,
    name: 'Emerald 4',
    minimumRankPoints: 3600,
    maximumRankPoints: 3699,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/emeraldfour.png',
  },
  {
    id: 28,
    name: 'Emerald 3',
    minimumRankPoints: 3700,
    maximumRankPoints: 3799,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/emeraldthree.png',
  },
  {
    id: 29,
    name: 'Emerald 2',
    minimumRankPoints: 3800,
    maximumRankPoints: 3899,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/emeraldtwo.png',
  },
  {
    id: 30,
    name: 'Emerald 1',
    minimumRankPoints: 3900,
    maximumRankPoints: 3999,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/emeraldone.png',
  },
  {
    id: 31,
    name: 'Diamond 5',
    minimumRankPoints: 4000,
    maximumRankPoints: 4099,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/diamondfive.png',
  },
  {
    id: 32,
    name: 'Diamond 4',
    minimumRankPoints: 4100,
    maximumRankPoints: 4199,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/diamondfour.png',
  },
  {
    id: 33,
    name: 'Diamond 3',
    minimumRankPoints: 4200,
    maximumRankPoints: 4299,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/diamondthree.png',
  },
  {
    id: 34,
    name: 'Diamond 2',
    minimumRankPoints: 4300,
    maximumRankPoints: 4399,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/diamondtwo.png',
  },
  {
    id: 35,
    name: 'Diamond 1',
    minimumRankPoints: 4400,
    maximumRankPoints: 4499,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/diamondone.png',
  },
  {
    id: 36,
    name: 'Champions',
    minimumRankPoints: 4500,
    maximumRankPoints: 9999,
    image: 'https://github.com/CalumW1/R6StatAPI/blob/main/assests/images/ranks/champion.png',
  },
];
