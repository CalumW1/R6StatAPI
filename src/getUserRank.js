import fetch from 'node-fetch';
import { UBI_APPID, UBI_PROFILEV2_URI } from './constants.js';
import { getAuth } from './auth.js';
import { platformCheck } from './constants.js';

const getUserRank = async (platforms, profileIds) => {
  const token = await getAuth();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Ubi-SessionId': '089aa129-cb3a-43d6-9455-e40a5e65f0e7',
    'Content-Type': 'application/json',
  };

  const platform = platformCheck(platforms);

  const URI = UBI_PROFILEV2_URI(profileIds, platform);

  const response = await fetch(URI, {
    method: 'GET',
    headers: headers,
  });

  const data = await response.json();

  return data.platform_families_full_profiles.reduce((acc, platformFamily) => {
    platformFamily.board_ids_full_profiles.forEach(board => {
      acc.push(board.full_profiles[0]);
    });
    return acc;
  }, []);
};

export default getUserRank;
