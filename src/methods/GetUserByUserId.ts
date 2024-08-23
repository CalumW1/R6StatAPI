import { CheckToken } from './Auth';
import { UBI_APPID, BASE_UBI_URI, UBI_GETUSERBYID_URI, AvatarImages } from '../constants';
import { ApiClient } from './ApiClient';

interface Profiles {
  profiles: User[];
}

export interface User {
  profileId: string;
  userId: string;
  platformType: string;
  idOnPlatform: string;
  nameOnPlatform: string;
  avatars: Avatars;
}

interface Avatars {
  '146': string;
  '256': string;
  '500': string;
}

export const GetUserByUserId = async (userId: string): Promise<User[] | []> => {
  var token = await CheckToken();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  const URI = BASE_UBI_URI(3) + UBI_GETUSERBYID_URI(userId);

  const response = await ApiClient(URI, headers, 'GET');

  const data = (await response.json()) as Profiles;

  data.profiles = data.profiles.map(profile => ({
    ...profile,
    avatars: AvatarImages(profile.userId),
  }));

  return data.profiles;
};
