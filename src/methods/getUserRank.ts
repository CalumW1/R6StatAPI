import { ApiClient } from './apiClient';
import { CheckToken } from './auth';
import {
  UBI_APPID,
  UBI_SESSIONID,
  BASE_UBI_URI,
  UBI_RANKED_URI_V2,
  GetRanksById,
} from '../constants';
import { RankStats, UserRank } from '../interfaces/stats';

export const GetUserRank = async (userId: string, platform: string): Promise<UserRank> => {
  if (!userId || !platform)
    throw new Error(`Please check userId: ${userId} and platform: ${platform}`);

  const token = await CheckToken();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Ubi-SessionId': UBI_SESSIONID,
    'Content-Type': 'application/json',
  };

  const platformChange = platform === 'uplay' ? 'pc' : 'console';

  const URI = BASE_UBI_URI(2) + UBI_RANKED_URI_V2(userId, platformChange);

  const response = await ApiClient(URI, headers, 'GET');

  const result: UserRank = await extractValues(await response);

  return result;
};

const extractValues = async (profiles: any): Promise<UserRank> => {
  const ranks: UserRank = {};

  profiles.platform_families_full_profiles.forEach((event: any) => {
    event.board_ids_full_profiles.forEach((profile: any) => {
      const boardId: string = profile.board_id;
      const fullProfile = profile.full_profiles[0].profile;
      const seasonStatistics = profile.full_profiles[0].season_statistics;

      const getRank = GetRanksById(fullProfile.rank);

      const rank: RankStats = {
        profile_board_id: boardId,
        id: fullProfile.board_id,
        max_rank: fullProfile.max_rank,
        max_rank_points: fullProfile.max_rank_points,
        platform_family: fullProfile.platform_family,
        rank: fullProfile.rank,
        rank_points: fullProfile.rank_points,
        rank_name: getRank?.name ?? '',
        season_id: fullProfile.season_id,
        top_rank_position: fullProfile.top_rank_position,
        deaths: seasonStatistics.deaths,
        kills: seasonStatistics.kills,
        abandons: seasonStatistics.match_outcomes.abandons,
        losses: seasonStatistics.match_outcomes.losses,
        wins: seasonStatistics.match_outcomes.wins,
        rankImage: getRank?.image ?? '',
      };
      (ranks as any)[boardId] = rank;
    });
  });
  return ranks;
};
