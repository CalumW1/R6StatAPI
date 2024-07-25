import { Auth } from './methods/Auth';
import { GetUserByUsername, User } from './methods/GetUserByUsername';
import { GetUserByUserId } from './methods/GetUserByUserId';
import { GetUserProgression, Progression } from './methods/GetUserProgression';
import { GetServerStatus, ServerStatus } from './methods/GetServerStatus';

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
}
