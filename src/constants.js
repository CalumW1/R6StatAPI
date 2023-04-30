export const BASE_UBI_URI = version => `https://public-ubiservices.ubi.com/v${version}`;

export const UBI_APPID = '3587dcbb-7f81-457c-9781-0e3f29f6f56a';

export const UBI_AUTH_URI = '/profiles/sessions';

export const UBI_GETUSERBYUSERNAME_URI = (userName, platform) => `/profiles?namesOnPlatform=${userName}&platformType=${platform}`
