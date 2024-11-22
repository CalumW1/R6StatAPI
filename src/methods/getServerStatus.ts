import {
  UBI_SERVER_IDS,
  UBI_APPID,
  UBI_SERVER_STATUS_URI,
  UBI_GETSERVERSTATUS,
} from '../constants';
import { CheckToken } from './auth';
import { ApiClient } from './apiClient';
import { ServerStatus } from '../interfaces/stats';

export const GetServerStatus = async (platform: string): Promise<ServerStatus> => {
  if (platform === '') throw new Error(`please check platform: ${platform}`);

  const token = await CheckToken();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  const serverId = UBI_SERVER_IDS.find(x => x.id === platform)?.value;

  if (!serverId) throw new Error('unable to find serverId');

  const URI = UBI_SERVER_STATUS_URI + UBI_GETSERVERSTATUS(serverId as string);

  const response = await ApiClient(URI, headers, 'GET');

  const data = await response;

  const serverStatus: ServerStatus = {
    MDM: data[0].MDM,
    SpaceID: data[0].SpaceID,
    Category: data[0].Category,
    Name: data[0].Name,
    platform: data[0].Platform,
    status: data[0].Status,
    maintenance: data[0].Maintenance,
    impactedFeatures: data[0].ImpactedFeatures,
  };

  return serverStatus;
};
