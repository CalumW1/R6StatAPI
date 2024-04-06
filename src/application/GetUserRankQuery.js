import { GetUserRankQueryHandler } from '../infrastructure/GetUserRankQueryHandler.js';

export const GetUserRankQuery = async (userId, platform) => {
  try {
    return await GetUserRankQueryHandler(userId, platform);
  } catch (error) {
    console.log(error);
  }
};
