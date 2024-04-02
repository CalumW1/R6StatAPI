// import { AuthCommand } from './src/application/AuthCommand.js';
// import { GetServerStatusQuery } from './src/application/GetServerStatusQuery.js';
// import { GetUserByUsernameQuery } from './src/application/GetUserByUsernameQuery.js';
// import { GetUserProgressionQuery } from './src/application/GetUserProgressionQuery.js';
// import { GetOperatorQuery } from './src/application/GetOperatorsQuery.js';
// import { GetUserRankV2Query } from './src/application/GetUserRankV2Query.js';

// const test = async () => {
//   const auth = await AuthCommand('calumwilson2000@gmail.com', 'TriviumOpeth27-');
//   console.log(auth);

//   // const serverStatus = await GetServerStatusQuery('pc');
//   // console.log(serverStatus);

//   const getUserByUsername = await GetUserByUsernameQuery('MainIT.', 'uplay');
//   console.log(getUserByUsername);

//   const getUserProgression = await GetUserProgressionQuery(getUserByUsername.userId, 'uplay');
//   console.log(getUserProgression);

//   // const operator = await GetOperatorQuery(
//   //   getUserByUsername.userId,
//   //   'uplay',
//   //   'current',
//   //   'operators',
//   //   'ranked,casual',
//   //   'defender,attacker',
//   //   'Y9S1'
//   // );

//   // console.log(operator.ranked.attackers);

//   const getuserRank = await GetUserRankV2Query(getUserByUsername.userId, 'uplay');
//   console.log(getuserRank);
// };

// test();

import { getAuth } from './src/auth.js';
import getUserByUsername from './src/getUserByUsername.js';

const auth = await getAuth('calumwilson2000@gmail.com', 'TriviumOpeth27-');
console.log(auth);

const getUser = await getUserByUsername('CaleyW1', 'uplay');
console.log(getUser);
