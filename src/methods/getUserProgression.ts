import {
  UBI_APPID,
  BASE_UBI_URI,
  UBI_GETPLAYERPROGRESSION2,
  UBI_PROGRESSION_SPACEID,
  UBI_SESSIONID,
} from '../constants';
import { CheckToken } from './auth';
import { ApiClient } from './apiClient';
import { Progression } from '../interfaces/stats';

export const GetUserProgression = async (userId: string): Promise<Progression> => {
  if (!userId) throw new Error('Please check userId');

  var token = await CheckToken();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Ubi-SessionId': UBI_SESSIONID,
    'Content-Type': 'application/json',
  };

  const URI = BASE_UBI_URI(1) + UBI_GETPLAYERPROGRESSION2(UBI_PROGRESSION_SPACEID, userId);

  const response = await ApiClient(URI, headers, 'GET');

  return (await response) as Progression;
};
