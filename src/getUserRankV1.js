import fetch from 'node-fetch';
import {
  BASE_UBI_URI,
  UBI_APPID,
  UBI_RANKED_URI,
  sandboxCheck,
  spaceIdCheck,
  boardIdCheck,
  regionIdCheck,
} from './constants.js';
import { getAuth } from './auth.js';

const getUserRankV1 = async (platform, boardId, regionId, seasons, profileId) => {
  const token = await getAuth();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  var spaceId = platform === 'uplay' ? 'rankedUplay' : platform;

  var sandbox = await sandboxCheck(platform);
  var space = await spaceIdCheck(spaceId);
  var board = await boardIdCheck(boardId);
  var region = await regionIdCheck(regionId);

  const URI = BASE_UBI_URI(1) + UBI_RANKED_URI(space, sandbox, board, seasons, region, profileId);

  const response = await fetch(URI, {
    method: 'GET',
    headers: headers,
  });

  const data = await response.json();

  return extractValues(data);
};

function extractValues(data) {
  const {
    season_id,
    regions_player_skill_records: [
      {
        region_id,
        boards_player_skill_records: [
          {
            board_id,
            players_skill_records: [
              {
                max_mmr,
                skill_mean,
                deaths,
                profile_id,
                next_rank_mmr,
                rank,
                max_rank,
                skill_stdev,
                kills,
                last_match_skill_stdev_change,
                past_seasons_wins,
                update_time,
                last_match_mmr_change,
                abandons,
                season,
                past_seasons_losses,
                top_rank_position,
                last_match_skill_mean_change,
                mmr,
                previous_rank_mmr,
                last_match_result,
                past_seasons_abandons,
                wins,
                region: player_region,
                losses,
              },
            ],
          },
        ],
      },
    ],
  } = data.seasons_player_skill_records[0];

  return {
    season_id,
    region_id,
    board_id,
    profile_id,
    max_mmr,
    skill_mean,
    deaths,
    next_rank_mmr,
    rank,
    max_rank,
    skill_stdev,
    kills,
    last_match_skill_stdev_change,
    past_seasons_wins,
    update_time,
    last_match_mmr_change,
    abandons,
    season,
    past_seasons_losses,
    top_rank_position,
    last_match_skill_mean_change,
    mmr,
    previous_rank_mmr,
    last_match_result,
    past_seasons_abandons,
    wins,
    region: player_region,
    losses,
  };
}

export default getUserRankV1;
