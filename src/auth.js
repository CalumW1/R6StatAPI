import fetch from 'node-fetch';
import { BASE_UBI_URI, UBI_APPID, UBI_AUTH_URI } from './constants.js';
import fs from 'fs/promises';

const fileName = 'Auth.json';
const authFilePath = process.cwd() + '\\Auth.json';

const getAuth = async (email, password) => {
  const currentDate = new Date().toISOString();
  const experationDate = await getExperation();
  if (experationDate < currentDate || experationDate === undefined) {
    return await getTokenFromUbi(email, password);
  } else {
    return await getToken();
  }
};

async function getTokenFromUbi(email, password) {
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

  fs.writeFile(fileName, JSON.stringify(data, null, 2), err => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  return data.ticket;
}

async function getExperation() {
  try {
    const data = await fs.readFile(authFilePath);
    return JSON.parse(data).expiration;
  } catch {
    console.log('No token found');
  }
}

async function getToken() {
  try {
    const data = await fs.readFile(authFilePath);
    return JSON.parse(data).ticket;
  } catch {
    console.log('No token found');
  }
}

export default getAuth;
