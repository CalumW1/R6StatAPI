import fetch from 'node-fetch';
import {
  BASE_UBI_URI,
  UBI_APPID,
  UBI_RANKED_URI,
  UBI_SPACEIDS,
  UBI_SANDBOXES,
  UBI_BOARDID,
  UBI_REGIONID,
} from './constants.js';
import getAuth from './auth.js';
import { UserRankDtoV1 } from './constants.js';

const getUserRankV1 = async (platform, boardId, regionId, seasons, profileId) => {
  const token = await getAuth();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  const sandbox = UBI_SANDBOXES.find(x => x.id === platform).value;
  const spaceId = UBI_SPACEIDS.find(x => x.id === platform).value;

  const URI =
    BASE_UBI_URI(1) + UBI_RANKED_URI(spaceId, sandbox, boardId, seasons, regionId, profileId);

  const response = await fetch(URI, {
    method: 'GET',
    headers: headers,
  });

  const data = await response.json();

  const test = data.seasons_player_skill_records.flatMap(season => {
    return season.regions_player_skill_records.flatMap(region => {
      return region.boards_player_skill_records.flatMap(board => {
        return board.players_skill_records.flatMap(player => {
          return new UserRankDtoV1(
            player.max_mmr,
            player.skill_mean,
            player.deaths,
            player.profile_id,
            player.next_rank_mmr,
            player.rank,
            player.max_rank,
            player.board_id,
            player.skill_stdev,
            player.kills,
            player.last_match_skill_stdev_change,
            player.past_seasons_wins,
            player.update_time,
            player.last_match_mmr_change,
            player.abandons,
            player.season,
            player.past_seasons_losses,
            player.top_rank_position,
            player.last_match_skill_mean_change,
            player.mmr,
            player.previous_rank_mmr,
            player.last_match_result,
            player.past_seasons_abandons,
            player.wins,
            player.region,
            player.losses
          );
        });
      });
    });
  });

  console.log(test);

  return data;
};

export default getUserRankV1;
