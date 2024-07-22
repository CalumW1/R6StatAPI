import { Auth, Authorise } from './methods/auth';

export class R6StatAPI {
  public async Login(email: string, password: string): Promise<string> {
    return Auth(email, password);
  }
}
