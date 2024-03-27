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

export const UBI_RANKED_URI_V2 = (spaceId, profileId, platform) =>
  `/spaces/${spaceId}/title/r6s/skill/full_profiles?profile_ids=${profileId}&platform_families=${platform}`;

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
