import fetch from 'node-fetch';
import {
  BASE_UBI_URI,
  UBI_APPID,
  UBI_RANKED_URI,
  UBI_SPACEIDS,
  UBI_SANDBOXES,
} from './constants.js';
import getAuth from './auth.js';

const getUserRankV1 = async (platform, boardId, regionId, profileId) => {
  const token = await getAuth();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  const sandbox = UBI_SANDBOXES.find(x => x.id === platform).value;
  const spaceId = UBI_SPACEIDS.find(x => x.id === platform).value;
  const board = 'pvp_ranked';
  const region = 'ncsa';
  const seasons = '25';

  const URI = BASE_UBI_URI(1) + UBI_RANKED_URI(spaceId, sandbox, board, seasons, region, profileId);

  const response = await fetch(URI, {
    method: 'GET',
    headers: headers,
  });

  const data = await response.json();

  return data;
};

export default getUserRankV1;
