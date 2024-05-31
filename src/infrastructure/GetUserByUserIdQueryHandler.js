import { AuthCommandHandler } from './AuthCommandHandler.js';
import { ApiClient } from './ApiClient.js';
import {
  UBI_APPID,
  UBI_GETUSERBYID_URI,
  BASE_UBI_URI,
  AvatarImages,
} from '../utils/HelperFunctions.js';
import { UserProfile } from '../domain/entitites/UserProfile.js';

export const GetUserByUserIdQueryHandler = async userId => {
  const token = await AuthCommandHandler();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  const URI = BASE_UBI_URI(3) + UBI_GETUSERBYID_URI(userId);

  const data = await ApiClient(URI, headers, 'GET');

  return data.profiles.reduce((accumulator, x) => {
    accumulator.push(
      new UserProfile(
        x.profileId,
        x.userId,
        x.platformType,
        x.idOnPlatform,
        x.nameOnPlatform,
        AvatarImages(x.userId)
      )
    );
    return accumulator;
  }, []);
};
