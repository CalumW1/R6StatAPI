import fetch from 'node-fetch';
import { BASE_UBI_URI, UBI_APPID, UBI_AUTH_URI } from './constants.js';
import fs from 'fs/promises';

const fileName = 'Auth.json';
let token = null;
let nextTokenRefresh = null;
let currentTime = new Date().toISOString();
let expiration = null;

export const getAuth = async (email, password) => {
  if (token !== null && currentTime < nextTokenRefresh) {
    return token;
  }

  if (email && password !== undefined) {
    process.env.email = email;
    process.env.password = password;
  }

  var newToken = await getTokenFromUbi(email, password);
  return newToken;
};

export const getExpiryDate = async () => {
  return expiration;
};

const getTokenFromUbi = async (email, password) => {
  console.log('refreshing token');

  console.log(`Current Time ${currentTime}`);

  const userEmail = email ?? process.env.email;
  const userPassword = password ?? process.env.password;

  const headers = {
    Authorization: `Basic ${Buffer.from(`${userEmail}:${userPassword}`).toString('base64')}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  const URI = BASE_UBI_URI(3) + UBI_AUTH_URI;
  const response = await fetch(URI, {
    method: 'post',
    headers: headers,
  });

  const data = await response.json();

  token = data.ticket;
  nextTokenRefresh = data.expiration;
  expiration = data.expiration;

  fs.writeFile(fileName, JSON.stringify(data, null, 2), err => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  return data.ticket;
};
