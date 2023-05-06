import getAuth from './auth.js';
import getUserByUsername from './getUserByUsername.js';
import getUserByUserId from './getUserById.js';
import getUserProgression from './getUserProgression.js';

const email = 'calumwilson2000@gmail.com';
const password = 'Trivium19-';

// setInterval(async () => {
//     const token = await getAuth(email, password);
//     console.log(token);
// }, 60000)

const token = await getAuth(email, password);
console.log(token);

const player = await getUserByUsername('CaleyW1', 'uplay');
console.log(player);

const playerById = await getUserByUserId(player.profiles[0].userId);
console.log(playerById);

const progression = await getUserProgression(player.profiles[0].userId, 'uplay');
console.log(progression);
