import { getAuth } from './auth.js';
import getUserByUsername from './getUserByUsername.js';
import getUserByUserId from './getUserById.js';
import getUserProgression from './getUserProgression.js';
import getServerStatus from './getServerStatus.js';
import getUserRank from './getUserRank.js';
import getUserRankV1 from './getUserRankV1.js';
import getOperators from './getOperators.js';
import getUserStats from './getUserStats.js';

class api {
  constructor() {
    this.auth = async (email, password) => {
      return await getAuth(email, password);
    };

    this.getUserByUserName = async (userName, platform) => {
      return await getUserByUsername(userName, platform);
    };

    this.getUserByUserId = async userId => {
      return await getUserByUserId(userId);
    };

    this.getUserProgression = async (userId, platform) => {
      return await getUserProgression(userId, platform);
    };

    this.serverStatus = async platform => {
      return await getServerStatus(platform);
    };

    this.getUserRank = async (userId, platform) => {
      return await getUserRank(platform, userId);
    };

    this.getUserRankV2 = async (platform, boardId, regionId, userId) => {
      return await getUserRankV1(platform, boardId, regionId, userId);
    };

    this.getOperators = async(userId, platform, view, aggregation, gameMode, teamRole, season) => {
      return await getOperators(userId, platform, view, aggregation, gameMode, teamRole, season);   
    };

    this.getUserStats = async(userId, platform, view, aggregation, gameMode, teamRole, season) => {
      return await getUserStats(userId, platform, view, aggregation, gameMode, teamRole, season);
    }
  }
}
export default api;
