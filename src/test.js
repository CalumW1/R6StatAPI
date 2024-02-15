import api from './index.js';
import getUserByUsername from './getUserByUsername.js';
import { getAuth } from './auth.js';
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

const player = await getUserByUsername('Bernord_ACG', 'psn');
console.log(player);

// const progression = await getUserProgression(player.userId, 'uplay');
// console.log(progression);

//   const operator = await getOperators(
//   player.userId,
//   'uplay',
//   'seasonal',
//   'operators',
//   'all',
//   'Defender,Attacker',
//   'Y7S4'
// );

// console.log(operator);

// var operatorName = 'iq'

// var attacker = operator.attackers.find(x => x.statsDetail.toLowerCase() === operatorName);
// var defender = operator.defenders.find(x => x.statsDetail.toLowerCase() === operatorName);

// var foundOperator = attacker ?? defender;
// console.log(foundOperator)

// const userStats = await getUserStats(
//   player.userId,
//   'uplay',
//   'seasonal',
//   'summary',
//   'ranked,casual',
//   'all',
//   'Y8S3'
// );
// const test = userStats.find(x => x.gameMode === 'ranked')
// console.log(test);

// const playerById = await getUserByUserId(player.profiles[0].userId);
// console.log(playerById);

// const progression = await getUserProgression(player.userId, 'xbl');
// console.log(progression);

/*const serverStatus = await getServerStatus('pc');
console.log(serverStatus);*/

const rank = await getUserRank('Console', player.userId);
console.log(rank);

/*const rankV1 = await getUserRankV1('uplay', 'pvp_ranked', 'apac', '23', player.userId);
console.log(rankV1);*/

/*var newAPI = new api();

var test = await newAPI.auth(email, password);
console.log(test);*/
