import {
  UBI_SERVER_IDS,
  UBI_APPID,
  UBI_SERVER_STATUS_URI,
  UBI_GETSERVERSTATUS,
} from '../constants';
import { CheckToken } from './Auth';
import { ApiClient } from './ApiClient';

export interface ServerStatus {
  MDM: string;
  SpaceID: string;
  Category: string;
  Name: string;
  platform: string;
  status: string;
  maintenance: string;
  impactedFeatures: string[];
}

export const GetServerStatus = async (platform: string): Promise<ServerStatus> => {
  const token = await CheckToken();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  const serverId = UBI_SERVER_IDS.find(x => x.id === platform);
  const URI = UBI_SERVER_STATUS_URI + UBI_GETSERVERSTATUS(serverId?.value as string);

  const response = await ApiClient(URI, headers, 'GET');

  return (await response.json()) as ServerStatus;
};
