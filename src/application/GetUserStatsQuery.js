import { GetUserStatsQueryHandler } from '../infrastructure/GetUserStatsQueryHandler.js';

export const GetUserStatsQuery = async (
  userId,
  profileId,
  platform,
  view,
  aggregation,
  gameMode,
  teamRole,
  season
) => {
  try {
    return await GetUserStatsQueryHandler(
      userId,
      profileId,
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
