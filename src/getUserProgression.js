import fetch from 'node-fetch';
import {
  UBI_APPID,
  UBI_GETPLAYERPROGRESSION,
  BASE_UBI_URI,
  spaceIdCheck,
  sandboxCheck,
} from './constants.js';
import getAuth from './auth.js';
import { ProgressionDto } from './constants.js';

const getUserProgression = async (userId, platform) => {
  const token = await getAuth();

  const sandbox = await sandboxCheck(platform);
  const spaceId = await spaceIdCheck(platform);

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  const URI = BASE_UBI_URI(1) + UBI_GETPLAYERPROGRESSION(spaceId, sandbox, userId);

  const response = await fetch(URI, {
    method: 'GET',
    headers: headers,
  });

  const data = await response.json();

  console.log(data);

  const dto = data['player_profiles'].reduce((acc, player) => {
    const object = new ProgressionDto(
      player.xp,
      userId,
      player['lootbox_probability'],
      player.level
    );
    return { ...acc, ...object };
  }, {});

  return dto;
};

export default getUserProgression;
