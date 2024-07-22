import fetch from 'node-fetch';
import { UBI_APPID, BASE_UBI_URI, UBI_AUTH_URI } from '../constants';
import fs from 'fs/promises';

export interface Authorise {
  platformType: string;
  ticket: string;
  twoFactorAuthenticationTicket: string;
  profileId: string;
  userId: string;
  nameOnPlatform: string;
  environment: string;
  experation: string;
  spaceId: string;
  clientIp: string;
  clientIpCountry: string;
  serverTime: string;
  sessionId: string;
  sessionKey: string;
  rememberMeTicket: string;
}

export const Auth = async (email: string, password: string): Promise<Authorise> => {
  const headers = {
    Authorization: `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  const URI = BASE_UBI_URI(3) + UBI_AUTH_URI;

  const response = await fetch(URI, {
    method: 'POST',
    headers: headers,
  });

  if (!response.ok) throw Error('Login was not successful');

  const data = (await response.json()) as Authorise;

  return data;
};
