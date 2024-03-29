import { ApiClient } from './ApiClient.js';
import { AuthCommand } from '../application/AuthCommand.js';
import {
  UBI_APPID,
  UBI_GETPLAYERPROGRESSION2,
  BASE_UBI_URI,
  UBI_SPACEIDS,
  UBI_SESSIONID,
} from '../utils/helperFunctions.js';

export const GetUserProgressionQueryHandler = async (userId, platform) => {
  const token = await AuthCommand();

  var spaceId = UBI_SPACEIDS.find(x => x.id === platform).value;

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Ubi-SessionId': UBI_SESSIONID,
    'Content-Type': 'application/json',
  };

  const URI = BASE_UBI_URI(1) + UBI_GETPLAYERPROGRESSION2(spaceId, userId);

  const data = await ApiClient(URI, headers, 'GET');

  return data;
};
