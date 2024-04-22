import { GetOperatorQueryHandler } from '../infrastructure/GetOperatorQueryHandler.js';

export const GetOperatorQuery = async (
  userId,
  platform,
  view,
  aggregation,
  gameMode,
  teamRole,
  season
) => {
  try {
    return await GetOperatorQueryHandler(
      userId,
      platform,
      view,
      aggregation,
      gameMode,
      teamRole,
      season
    );
  } catch (error) {
    console.log(error);
  }
};
