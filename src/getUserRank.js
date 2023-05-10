import fetch from 'node-fetch';
import { UBI_APPID, BASE_UBI_URI, UBI_PROFILEV2_URI } from './constants.js';
import getAuth from './auth.js';

const getUserRank = async (platforms, profileIds) => {
  const token = await getAuth();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Ubi-SessionId': '089aa129-cb3a-43d6-9455-e40a5e65f0e7',
    'Content-Type': 'application/json',
  };

  const URI = UBI_PROFILEV2_URI(profileIds, platforms);

  const response = await fetch(URI, {
    method: 'GET',
    headers: headers,
  });

  const data = await response.json();

  return data;
};

export default getUserRank;
