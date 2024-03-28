import { AuthCommand } from './src/application/AuthCommand.js';
import { GetServerStatusQuery } from './src/application/GetServerStatusQuery.js';

const test = async () => {
  const auth = await AuthCommand('calumwilson2000@gmail.com', 'TriviumOpeth27-');
  console.log(auth);

  const serverStatus = await GetServerStatusQuery('pc');
  console.log(serverStatus);
};

test();
