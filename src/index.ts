import { Auth } from './methods/Auth';
import { GetUserByUsername, User } from './methods/GetUserByUsername';
import { GetUserByUserId } from './methods/GetUserByUserId';
import { GetUserProgression, Progression } from './methods/GetUserProgression';
import { GetServerStatus, ServerStatus } from './methods/GetServerStatus';
import { GetUserRank, UserRank } from './methods/GetUserRank';
import { GetOperator, GameModes } from './methods/GetOperator';

export class R6StatAPI {
  public async Login(email: string, password: string): Promise<string> {
    return await Auth(email, password);
  }

  public async GetUserByUsername(username: string, platform: string): Promise<User> {
    return await GetUserByUsername(username, platform);
  }

  public async GetUserByUserId(userId: string): Promise<User[] | null> {
    return await GetUserByUserId(userId);
  }

  public async GetUserProgression(userId: string): Promise<Progression> {
    return await GetUserProgression(userId);
  }

  public async GetServerStatus(platform: string): Promise<ServerStatus> {
    return await GetServerStatus(platform);
  }

  public async GetUserRank(userId: string, platform: string): Promise<UserRank> {
    return await GetUserRank(userId, platform);
  }

  public async GetUserOperators(
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
}
