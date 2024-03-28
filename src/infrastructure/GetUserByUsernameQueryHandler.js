import { AuthCommandHandler } from './AuthCommandHandler.js';
import { ApiClient } from './ApiClient.js';
import { UserProfileDto } from '../domain/entitites/userProfileDto.js';
import { BASE_UBI_URI, UBI_APPID, UBI_GETUSERBYUSERNAME_URI } from '../utils/helperFunctions.js';

export const GetUserByUsernameQueryHandler = async (username, platform) => {
  const token = await AuthCommandHandler();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  const URI = BASE_UBI_URI(3) + UBI_GETUSERBYUSERNAME_URI(username, platform);

  const data = await ApiClient(URI, headers, 'GET');

  return data.profiles.reduce((acc, profile) => {
    const object = new UserProfileDto(
      profile.profileId,
      profile.userId,
      profile.platformType,
      profile.idOnPlatform,
      profile.nameOnPlatform
    );
    return { ...acc, ...object };
  }, {});
};
