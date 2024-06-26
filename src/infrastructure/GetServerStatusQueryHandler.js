import { ApiClient } from './ApiClient.js';
import { AuthCommandHandler } from './AuthCommandHandler.js';
import {
  UBI_APPID,
  UBI_GETSERVERSTATUS,
  UBI_SERVER_IDS,
  UBI_SERVER_STATUS_URI,
} from '../utils/HelperFunctions.js';
import { ServerStatus } from '../domain/entitites/ServerStatus.js';

export async function GetServerStatusQueryHandler(platform) {
  const token = await AuthCommandHandler();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  const serverId = UBI_SERVER_IDS.find(x => x.id === platform).value;
  const URI = UBI_SERVER_STATUS_URI + UBI_GETSERVERSTATUS(serverId);

  const response = await ApiClient(URI, headers, 'GET');

  return transformData(response);
}

function transformData(data) {
  return data.reduce((acc, status) => {
    const object = new ServerStatus(
      status.Platform,
      status.Status,
      status.Maintenance,
      status.ImpactedFeatures
    );
    return { ...acc, ...object };
  }, {});
}
