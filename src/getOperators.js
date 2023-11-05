import fetch from 'node-fetch';
import {
  UBI_DATADEV_SESSIONID,
  UBI_DATADEV_URI,
  UBI_GETOPERATORS,
  spaceIdCheck,
} from './constants.js';
import getAuth from './auth.js';
import auth from './Auth.json' assert { type: 'json' };

const getOperators = async (userId, platform, season) => {
  const token = await getAuth();

  const spaceId = await spaceIdCheck(platform);

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-SessionId': UBI_DATADEV_SESSIONID,
    'Content-Type': 'application/json',
    expiration: auth.expiration,
  };

  const URI = UBI_DATADEV_URI + UBI_GETOPERATORS(userId, spaceId, 'PC', season);

  const response = await fetch(URI, {
    method: 'GET',
    headers: headers,
  });

  console.log(response);

  const data = await response.json();

  console.log(data);
};

export default getOperators;
