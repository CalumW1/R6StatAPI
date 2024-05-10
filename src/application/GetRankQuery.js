import { GetRankQueryHandler } from '../infrastructure/GetRankQueryHandler.js';

export const GetRankQuery = async rank => {
  try {
    return await GetRankQueryHandler(rank);
  } catch (error) {
    console.log(error);
  }
};
