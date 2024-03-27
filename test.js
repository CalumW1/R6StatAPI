import { AuthCommand } from './src/application/AuthCommand.js';

const test = async () => {
  const auth = await AuthCommand('calumwilson2000@gmail.com', 'TriviumOpeth27-');
  console.log(auth);
};

test();
