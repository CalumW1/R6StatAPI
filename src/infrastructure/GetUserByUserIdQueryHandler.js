import { AuthCommandHandler } from './AuthCommandHandler.js';
import { ApiClient } from './ApiClient.js';
import { UBI_APPID, UBI_GETUSERBYID_URI, BASE_UBI_URI } from '../utils/helperFunctions.js';

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
    accumulator.push({
      profileId: x.profileId,
      userId: x.userId,
      platformType: x.platformType,
      idOnPlatform: x.idOnPlatform,
      nameOnPlatform: x.nameOnPlatform,
    });
    return accumulator;
  }, []);
};
