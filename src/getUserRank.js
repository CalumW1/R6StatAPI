import fetch from 'node-fetch';
import { UBI_APPID, UBI_PROFILEV2_URI } from './constants.js';
import getAuth from './auth.js';
import { UserRankDtoV2 } from './constants.js';

const getUserRank = async (platforms, profileIds) => {
  const token = await getAuth();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Ubi-SessionId': '089aa129-cb3a-43d6-9455-e40a5e65f0e7',
    'Content-Type': 'application/json',
  };

  const URI = UBI_PROFILEV2_URI(profileIds, platforms);

  const response = await fetch(URI, {
    method: 'GET',
    headers: headers,
  });

  const data = await response.json();

  const dto = data.platform_families_full_profiles[0].board_ids_full_profiles.flatMap(board =>
    board.full_profiles.map(
      x =>
        new UserRankDtoV2(
          x.profile.board_id,
          x.profile.id,
          x.profile.max_rank,
          x.profile.max_rank_points,
          x.profile.platform_family,
          x.profile.rank,
          x.profile.rank_points,
          x.profile.season_id,
          x.profile.top_rank_position,
          x.season_statistics.deaths,
          x.season_statistics.kills,
          x.season_statistics.match_outcomes.abandons,
          x.season_statistics.match_outcomes.wins,
          x.season_statistics.match_outcomes.losses
        )
    )
  );

  return dto;
};

export default getUserRank;
