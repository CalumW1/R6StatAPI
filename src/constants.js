export const UBI_APPID = '3587dcbb-7f81-457c-9781-0e3f29f6f56a';

export const UBI_AUTH_URI = '/profiles/sessions';

export const UBI_SANDBOXES = [
  { id: 'uplay', value: 'OSBOR_PC_LNCH_A' },
  { id: 'psn', value: 'OSBOR_PS4_LNCH_A' },
  { id: 'xbl', value: 'OSBOR_XBOXONE_LNCH_A' },
];

export const UBI_SPACEIDS = [
  { id: 'uplay', value: '5172a557-50b5-4665-b7db-e3f2e8c5041d' },
  { id: 'psn', value: '05bfb3f7-6c21-4c42-be1f-97a33fb5cf66' },
  { id: 'xbl', value: '98a601e5-ca91-4440-b1c5-753f601a2c90' },
];

export const UBI_SERVER_IDS = [
  { id: 'pc', value: 'e3d5ea9e-50bd-43b7-88bf-39794f4e3d40' },
  { id: 'ps4', value: 'fb4cc4c9-2063-461d-a1e8-84a7d36525fc' },
  { id: 'xbox', value: '4008612d-3baf-49e4-957a-33066726a7bc' },
];

export const BASE_UBI_URI = version => `https://public-ubiservices.ubi.com/v${version}`;
export const UBI_SERVER_STATUS_URI = 'https://game-status-api.ubisoft.com/v1';

export const UBI_GETUSERBYUSERNAME_URI = (userName, platform) =>
  `/profiles?namesOnPlatform=${userName}&platformType=${platform}`;

export const UBI_GETUSERBYID_URI = userId => `/profiles?userIds=${userId}`;

export const UBI_GETPLAYERPROGRESSION = (spaceId, sandbox, playerIds) =>
  `/spaces/${spaceId}/sandboxes/${sandbox}/r6playerprofile/playerprofile/progressions?profile_ids=${playerIds}`;

export const UBI_GETSERVERSTATUS = serverId => `/instances?appIds=${serverId}`;
