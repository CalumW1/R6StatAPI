import fetch from 'node-fetch';
import {
  UBI_APPID,
  UBI_GETPLAYERPROGRESSION2,
  BASE_UBI_URI,
  spaceIdCheck,
  UBI_SESSIONID,
} from './constants.js';
import { getAuth } from './auth.js';

const getUserProgression = async (userId, platform) => {
  const token = await getAuth();

  const spaceId = '0d2ae42d-4c27-4cb7-af6c-2099062302bb';

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Ubi-SessionId': UBI_SESSIONID,
    'Content-Type': 'application/json',
  };

  const URI = BASE_UBI_URI(1) + UBI_GETPLAYERPROGRESSION2(spaceId, userId);

  console.log(URI);

  const response = await fetch(URI, {
    method: 'GET',
    headers: headers,
  });

  const data = await response.json();

  return data;
};

export default getUserProgression;
