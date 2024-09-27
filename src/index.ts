import { Auth } from './methods/auth';
import { GetUserByUsername, User } from './methods/getUserByUsername';
import { GetUserByUserId } from './methods/getUserByUserId';
import { GetUserProgression, Progression } from './methods/getUserProgression.js';
import { GetServerStatus, ServerStatus } from './methods/getServerStatus';
import { GetUserRank, UserRank } from './methods/getUserRank.js';
import { GetOperator, GameModes } from './methods/getOperator';
// import { GetUserStats, UserStats } from './methods/GetUserStats';
import { Search } from './methods/searchMarketplace';
import { Items } from './interfaces/marketplace';
import { RecommendedItems } from './methods/recommendedItems';

export class R6StatAPI {
  public async login(email: string, password: string): Promise<string> {
    return await Auth(email, password);
  }

  public async getUserByUsername(username: string, platform: string): Promise<User> {
    return await GetUserByUsername(username, platform);
  }

  public async getUserByUserId(userId: string): Promise<User[] | []> {
    return await GetUserByUserId(userId);
  }

  public async getUserProgression(userId: string): Promise<Progression> {
    return await GetUserProgression(userId);
  }

  public async getServerStatus(platform: string): Promise<ServerStatus> {
    return await GetServerStatus(platform);
  }

  public async getUserRank(userId: string, platform: string): Promise<UserRank> {
    return await GetUserRank(userId, platform);
  }

  public async getUserOperators(
    userId: string,
    platform: string,
    view: string,
    aggregation: string,
    gameMode: string,
    teamRole: string,
    season: string
  ): Promise<GameModes> {
    return await GetOperator(userId, platform, view, aggregation, gameMode, teamRole, season);
  }

  // TODO fix this
  // public async getUserStats(
  //   userId: string,
  //   platform: string,
  //   view: string,
  //   aggregation: string,
  //   gameMode: string,
  //   teamRole: string,
  //   season: string
  // ): Promise<UserStats> {
  //   return await GetUserStats(userId, platform, view, aggregation, gameMode, teamRole, season);
  // }

  public async SearchMarketplace(searchQuery: string): Promise<Items> {
    return await Search(searchQuery);
  }

  public async getRecommendedItems(profileId: string): Promise<Items> {
    return await RecommendedItems(profileId);
  }
}
