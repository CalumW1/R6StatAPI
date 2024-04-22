import { GetUserProgressionQueryHandler } from '../infrastructure/GetUserProgressionQueryHandler.js';

export const GetUserProgressionQuery = async (userId, platform) => {
  try {
    return await GetUserProgressionQueryHandler(userId, platform);
  } catch (error) {
    console.log(error);
  }
};
