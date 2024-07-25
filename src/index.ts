import { Auth } from './methods/Auth';
import { GetUserByUsername, User } from './methods/GetUserByUsername';
import { GetUserByUserId } from './methods/GetUserByUserId';
import { GetUserProgression, Progression } from './methods/GetUserProgression';

export class R6StatAPI {
  public async Login(email: string, password: string): Promise<string> {
    return Auth(email, password);
  }

  public async GetUserByUsername(username: string, platform: string): Promise<User> {
    return GetUserByUsername(username, platform);
  }

  public async GetUserByUserId(userId: string): Promise<User[] | null> {
    return GetUserByUserId(userId);
  }

  public async GetUserProgression(userId: string): Promise<Progression> {
    return GetUserProgression(userId);
  }
}
