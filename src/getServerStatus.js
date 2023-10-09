import fetch from 'node-fetch';
import {ServerStatusDto, UBI_APPID, UBI_GETSERVERSTATUS, UBI_SERVER_IDS, UBI_SERVER_STATUS_URI,} from './constants.js';
import getAuth from './auth.js';

const getServerStatus = async plaform => {
  const token = await getAuth();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  const serverId = UBI_SERVER_IDS.find(x => x.id === plaform).value;

  const URI = UBI_SERVER_STATUS_URI + UBI_GETSERVERSTATUS(serverId);

  const response = await fetch(URI, {
    method: 'GET',
    headers: headers,
  });

  const data = await response.json();

  return data.reduce((acc, status) => {
    const object = new ServerStatusDto(
        status.Platform,
        status.Status,
        status.Maintenance,
        status.ImpactedFeatures
    );
    return {...acc, ...object}
  }, {});
};

export default getServerStatus;
