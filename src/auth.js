import fetch from 'node-fetch';
import { BASE_UBI_URI, UBI_APPID, UBI_AUTH_URI } from './constants.js';

const email = 'calumwilson2000@gmail.com';
const password = 'Trivium19-';

const headers = {
  Authorization: `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`,
  'Ubi-AppId': '3587dcbb-7f81-457c-9781-0e3f29f6f56a',
  'Content-Type': 'application/json',
};

const URI = BASE_UBI_URI + '/v1' + UBI_AUTH_URI;

console.log(URI);

async function getData() {
  const response = await fetch(URI, {
    method: 'post',
    headers: headers,
  });

  console.log(await response.json());
}

await getData();
