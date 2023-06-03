import fetch from 'node-fetch';
import { UBI_APPID, UBI_GETUSERBYID_URI, BASE_UBI_URI } from './constants.js';
import getAuth from './auth.js';
import { UserProfileDto } from './constants.js';

const getUserByUserId = async userId => {
  const token = await getAuth();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  const URI = BASE_UBI_URI(3) + UBI_GETUSERBYID_URI(userId);

  const response = await fetch(URI, {
    method: 'GET',
    headers: headers,
  });

  const data = await response.json();

  var dto = [];

  for (var profile in data.profiles) {
    var newObject = new UserProfileDto(
      profile.profileId,
      profile.userId,
      profile.platformType,
      profile.idOnPlatform,
      profile.nameOnPLatform
    );
    dto.push(newObject);
  }

  return dto;
};

export default getUserByUserId;
