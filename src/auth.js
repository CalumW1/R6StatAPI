import fetch from 'node-fetch';
import { BASE_UBI_URI, UBI_APPID, UBI_AUTH_URI } from './constants.js';
import fs from 'fs';

async function getData(email, password) {
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

  fs.writeFile('Auth.json', JSON.stringify(data, null, 2), err => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

export default getData;
