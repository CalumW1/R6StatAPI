import fetch from 'node-fetch';
import { BASE_UBI_URI, UBI_APPID, UBI_AUTH_URI } from './constants.js';
import fs from 'fs/promises';

const fileName = 'Auth.json';
let token = null;
let nextTokenRefresh = null;
let currentTime = new Date().getTime();
let expiration = null;

export const getAuth = async (email, password) => {
  if (token !== null && currentTime < nextTokenRefresh) {
    return token;
  }
  var newToken = await getTokenFromUbi(email, password);
  return newToken;
};

export const getExpiryDate = async () => {
  return expiration;
}

const getTokenFromUbi = async (email, password) => {
  console.log('refreshing token');

  const headers = {
    Authorization: `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`,
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
  nextTokenRefresh = new Date(data.expiration).getTime();
  expiration = data.expiration;

  fs.writeFile(fileName, JSON.stringify(data, null, 2), err => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  return data.ticket;
};
