import getAuth from './auth.js';
import getUserByUsername from './getUserByUsername.js';
import getUserByUserId from './getUserById.js';
import getUserProgression from './getUserProgression.js';
import getServerStatus from './getServerStatus.js';
import getUserRank from './getUserRank.js';
import getUserRankV1 from './getUserRankV1.js';

const email = 'calumwilson2000@gmail.com';
const password = 'Trivium19-';

// setInterval(async () => {
//     const token = await getAuth(email, password);
//     console.log(token);
// }, 60000)

const token = await getAuth(email, password);
console.log(token);

const player = await getUserByUsername('M0kA-', 'uplay');
console.log(player);

const playerById = await getUserByUserId(player.profiles[0].userId);
console.log(playerById);

const progression = await getUserProgression(player.profiles[0].userId, 'uplay');
console.log(progression);

const serverStatus = await getServerStatus('xbox');
console.log(serverStatus);

const rank = await getUserRank('pc', player.profiles[0].userId);
console.log(rank.platform_families_full_profiles[0].board_ids_full_profiles[3]);

const rankV1 = await getUserRankV1('uplay', 'pvp_ranked', '', player.profiles[0].userId);
console.log(rankV1);
