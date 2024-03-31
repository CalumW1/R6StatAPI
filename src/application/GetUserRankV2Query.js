import { GetUserRankV2QueryHandler } from '../infrastructure/GetUserRankV2QueryHandler.js';

export const GetUserRankV2Query = async (userId, platform) => {
  try {
    return await GetUserRankV2QueryHandler(userId, platform);
  } catch (error) {
    console.log(error);
  }
};
