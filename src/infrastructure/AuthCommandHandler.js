import { UBI_AUTH_URI, UBI_APPID, BASE_UBI_URI } from '../utils/HelperFunctions.js';
import { ApiClient } from './ApiClient.js';
import fs from 'fs/promises';

const fileName = 'Auth.json';
let token = null;
let nextTokenRefresh = null;
let expiration = null;

export const AuthCommandHandler = async (email, password) => {
  const currentTime = new Date().toISOString();

  if (token !== null && currentTime < nextTokenRefresh) {
    return token;
  }

  if (email && password !== undefined) {
    process.env.email = email;
    process.env.password = password;
  }

  const newToken = await getTokenFromUbi(email, password);
  return newToken;
};

export const getExpiryDate = async () => {
  return expiration;
};

const startTokenRefreshTimer = () => {
  setInterval(AuthCommandHandler, 2 * 60 * 60 * 1000);
};

startTokenRefreshTimer(); // Start the timer

const getTokenFromUbi = async (email, password) => {
  console.log('Refreshing token...');

  const currentTime = new Date().toISOString();

  console.log(`Current Time: ${currentTime}`);

  const userEmail = email ?? process.env.email;
  const userPassword = password ?? process.env.password;

  const headers = {
    Authorization: `Basic ${Buffer.from(`${userEmail}:${userPassword}`).toString('base64')}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  const URI = BASE_UBI_URI(3) + UBI_AUTH_URI;
  const data = await ApiClient(URI, headers, 'post');

  token = data.ticket;
  nextTokenRefresh = data.expiration;
  expiration = data.expiration;

  fs.writeFile(fileName, JSON.stringify(data, null, 2), err => {
    if (err) throw err;
    console.log('Token data has been saved to file!');
  });

  return data.ticket;
};
