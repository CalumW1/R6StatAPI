import getAuth from './auth.js';

const email = 'calumwilson2000@gmail.com';
const password = 'Trivium19-';

const token = await getAuth(email, password);

console.log(token);
