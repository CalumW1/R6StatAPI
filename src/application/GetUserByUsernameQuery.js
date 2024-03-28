import { GetUserByUsernameQueryHandler } from '../infrastructure/GetUserByUsernameQueryHandler.js';

export const GetUserByUsernameQuery = async (username, platform) => {
  try {
    return await GetUserByUsernameQueryHandler(username, platform);
  } catch (error) {
    console.log(error);
  }
};
