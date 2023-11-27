import api from './index.js';
import getUserByUsername from './getUserByUsername.js';
import getAuth from './auth.js';
import getServerStatus from './getServerStatus.js';
import getUserRank from './getUserRank.js';
import getUserRankV1 from './getUserRankV1.js';
import getUserProgression from './getUserProgression.js';
import getOperators from './getOperators.js';
import getUserStats from './getUserStats.js';

const email = 'calumwilson2000@gmail.com';
const password = 'Trivium19-';

setInterval(async () => {
  const token = await getAuth(email, password);
  console.log(token);
}, 600000);

const token = await getAuth(email, password);
console.log(token);

const player = await getUserByUsername('Valor....', 'uplay');
console.log(player);

// const operator = await getOperators(
//   player.userId,
//   'uplay',
//   'seasonal',
//   'operators',
//   'all',
//   'Defender,Attacker',
//   'Y6S3'
// );

// console.log(JSON.stringify(operator));

const userStats = await getUserStats(
  player.userId,
  'uplay',
  'seasonal',
  'summary',
  'all',
  'all',
  'Y8S3'
);
console.log(JSON.stringify(userStats));

// const playerById = await getUserByUserId(player.profiles[0].userId);
// console.log(playerById);

// const progression = await getUserProgression(player.userId, 'uplay');
// console.log(progression);

/*const serverStatus = await getServerStatus('pc');
console.log(serverStatus);*/

/*const rank = await getUserRank('pc', player.userId);
console.log(rank);*/

/*const rankV1 = await getUserRankV1('uplay', 'pvp_ranked', 'apac', '23', player.userId);
console.log(rankV1);*/

/*var newAPI = new api();

var test = await newAPI.auth(email, password);
console.log(test);*/
