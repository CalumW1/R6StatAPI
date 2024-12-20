import { CheckToken } from './auth';
import { UBI_APPID, BASE_UBI_URI, UBI_GETUSERBYID_URI, AvatarImages } from '../constants';
import { ApiClient } from './apiClient';
import { Profiles, User } from '../interfaces/stats';

export const GetUserByUserId = async (userId: string): Promise<User[] | []> => {
  if (!userId) throw new Error('Please enter valid userId');

  var token = await CheckToken();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  const URI = BASE_UBI_URI(3) + UBI_GETUSERBYID_URI(userId);

  const response = await ApiClient(URI, headers, 'GET');

  const data = (await response) as Profiles;

  data.profiles = data.profiles.map(profile => ({
    ...profile,
    avatars: AvatarImages(profile.userId),
  }));

  return data.profiles;
};
