import getAuth from './auth.js';
import getUserByUsername from './getUserByUsername.js';

const email = 'calumwilson2000@gmail.com';
const password = 'Trivium19-';

// setInterval(async () => {
//     const token = await getAuth(email, password);
//     console.log(token);
// }, 60000)

const token = await getAuth(email, password);
console.log(token);

const player = await getUserByUsername("CaleyW1", "uplay");
console.log(player);