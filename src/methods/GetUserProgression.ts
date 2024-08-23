import {
  UBI_APPID,
  BASE_UBI_URI,
  UBI_GETPLAYERPROGRESSION2,
  UBI_PROGRESSION_SPACEID,
  UBI_SESSIONID,
} from '../constants';
import { CheckToken } from './Auth';
import { ApiClient } from './ApiClient';

export interface Progression {
  level: number;
  xp: number;
}

export const GetUserProgression = async (userId: string): Promise<Progression> => {
  var token = await CheckToken();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Ubi-SessionId': UBI_SESSIONID,
    'Content-Type': 'application/json',
  };

  const URI = BASE_UBI_URI(1) + UBI_GETPLAYERPROGRESSION2(UBI_PROGRESSION_SPACEID, userId);

  const response = await ApiClient(URI, headers, 'GET');

  return (await response.json()) as Progression;
};