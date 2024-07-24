import fetch from 'node-fetch';
import { UBI_APPID, BASE_UBI_URI, UBI_AUTH_URI } from '../constants';
import { writeFile } from 'fs';
import { promises } from 'dns';

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

const FileName = 'Auth.json';

let Email: string = '';
let Password: string = '';
let Token: string = '';
let NextRefresh: string = '';
let Experation: string = '';

export const Auth = async (email: string, password: string): Promise<string> => {
  const currentTime = new Date().toISOString();

  if (Token !== '' && currentTime < NextRefresh) {
    return Token;
  }

  if (email && password !== undefined) {
    Email = email;
    Password = password;
  }

  const newToken = await RequestToken(Email, Password);

  return newToken.ticket;
};

const RequestToken = async (email: string, password: string): Promise<Authorise> => {
  console.log('Refreshing Token...');

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

  Token = data.ticket;
  NextRefresh = data.experation;
  Experation = data.experation;

  writeFile(FileName, JSON.stringify(data, null, 2), err => {
    if (err) {
      console.error('Error writing to file', err);
    } else {
      console.log('Token data has been saved to file!');
    }
  });

  return data;
};

export const CheckToken = async (): Promise<string> => {
  var currentTime = new Date().toISOString();

  if (Token !== '' && currentTime < NextRefresh) {
    console.log('Retreving token from memory');
    return Token;
  } else return (await RequestToken(Email, Password)).ticket;
};
