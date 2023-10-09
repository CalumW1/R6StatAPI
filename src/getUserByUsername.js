import fetch from 'node-fetch';
import {BASE_UBI_URI, UBI_APPID, UBI_GETUSERBYUSERNAME_URI, UserProfileDto} from './constants.js';
import getAuth from './auth.js';

const getUserByUsername = async (userName, platform) => {
  const token = await getAuth();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  const URI = BASE_UBI_URI(3) + UBI_GETUSERBYUSERNAME_URI(userName, platform);

  const response = await fetch(URI, {
    method: 'GET',
    headers: headers,
  });

  const data = await response.json();

  return data.profiles.reduce((acc, profile) => {
    const object = new UserProfileDto(
        profile.profileId,
        profile.userId,
        profile.platformType,
        profile.idOnPlatform,
        profile.nameOnPlatform
    );
    return {...acc, ...object};
  }, {});
};

export default getUserByUsername;
