import { AuthCommandHandler } from './AuthCommandHandler.js';
import {
  BASE_UBI_URI,
  UBI_RANKED_URI_V2,
  UBI_SPACEIDS,
  UBI_APPID,
  UBI_SESSIONID,
  Ranks,
} from '../utils/HelperFunctions.js';
import { ApiClient } from './ApiClient.js';

export const GetUserRankQueryHandler = async (userId, platform) => {
  const token = await AuthCommandHandler();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Ubi-SessionId': UBI_SESSIONID,
    'Content-Type': 'application/json',
  };

  const platformChange = platform === 'uplay' ? 'pc' : 'console';

  const URI = BASE_UBI_URI(2) + UBI_RANKED_URI_V2(userId, platformChange);

  const data = await ApiClient(URI, headers, 'GET');

  return extractValues(data);
};

function extractValues(data) {
  const {
    platform_families_full_profiles: [{ board_ids_full_profiles }],
  } = data;

  const extractedValues = {};

  board_ids_full_profiles.forEach(board => {
    const { board_id, full_profiles } = board;
    full_profiles.forEach(profile => {
      const {
        profile: {
          board_id: profile_board_id,
          id,
          max_rank,
          max_rank_points,
          platform_family,
          rank,
          rank_points,
          season_id,
          top_rank_position,
        },
        season_statistics: {
          deaths,
          kills,
          match_outcomes: { abandons, losses, wins },
        },
      } = profile;

      const profileData = {
        profile_board_id,
        id,
        max_rank,
        max_rank_points,
        platform_family,
        rank,
        rank_points,
        rank_name: Ranks.find(x => x.id === rank).name,
        season_id,
        top_rank_position,
        deaths,
        kills,
        abandons,
        losses,
        wins,
      };

      extractedValues[`${board_id}`] = profileData;
    });
  });

  return extractedValues;
}
