import { UBI_AUTH_URI, UBI_APPID, BASE_UBI_URI } from '../utils/helperFunctions.js';
import { ApiClient } from './ApiClient.js';
import fs from 'fs/promises';

const fileName = 'Auth.json';
let token = null;
let nextTokenRefresh = null;
let currentTime = new Date().getTime();
let expiration = null;

export const AuthCommandHandler = async (email, password) => {
  if (token !== null && currentTime < nextTokenRefresh) {
    return token;
  }
  var newToken = await getTokenFromUbi(email, password);
  return newToken;
};

const getTokenFromUbi = async (email, password) => {
  console.log('refreshing token');

  const headers = {
    Authorization: `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  const URI = BASE_UBI_URI(3) + UBI_AUTH_URI;
  const response = await ApiClient(URI, headers, 'POST');

  var data = response;

  token = data.ticket;
  nextTokenRefresh = new Date(data.expiration).getTime();
  expiration = data.expiration;

  fs.writeFile(fileName, JSON.stringify(data, null, 2), err => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  return data.ticket;
};
