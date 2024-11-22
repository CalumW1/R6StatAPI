import { UBI_APPID, BASE_UBI_URI, UBI_GETUSERBYUSERNAME_URI, AvatarImages } from '../constants';
import { CheckToken } from './auth';
import { ApiClient } from './apiClient';
import { Profiles, User } from '../interfaces/stats';

export const GetUserByUsername = async (username: string, platform: string): Promise<User> => {
  if (!username || !platform)
    throw new Error(`Please check username: ${username} and platform: ${platform}`);

  var token = await CheckToken();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  const URI = BASE_UBI_URI(3) + UBI_GETUSERBYUSERNAME_URI(username, platform);

  const response = await ApiClient(URI, headers, 'GET');

  const data = (await response) as Profiles;

  data.profiles = data.profiles.map(profile => ({
    ...profile,
    avatars: AvatarImages(profile.userId),
  }));

  return data.profiles[0];
};
