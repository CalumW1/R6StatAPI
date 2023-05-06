import fetch from 'node-fetch';
import {
  UBI_APPID,
  UBI_GETPLAYERPROGRESSION,
  BASE_UBI_URI,
  UBI_SANDBOXES,
  UBI_SPACEIDS,
} from './constants.js';
import getAuth from './auth.js';

const getUserProgression = async (userId, platform) => {
  const token = await getAuth();

  const sandbox = UBI_SANDBOXES.find(x => x.id === platform).value;
  const spaceId = UBI_SPACEIDS.find(x => x.id === platform).value;

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  const URI = BASE_UBI_URI(1) + UBI_GETPLAYERPROGRESSION(spaceId, sandbox, userId);

  const response = await fetch(URI, {
    method: 'GET',
    headers: headers,
  });

  const data = await response.json();

  return data;
};

export default getUserProgression;
