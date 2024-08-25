import { User } from './methods/getUserByUsername';
import { Progression } from './methods/getUserProgression.js';
import { ServerStatus } from './methods/getServerStatus';
import { UserRank } from './methods/getUserRank.js';
import { GameModes } from './methods/getOperator';
export declare class R6StatAPI {
    login(email: string, password: string): Promise<string>;
    getUserByUsername(username: string, platform: string): Promise<User>;
    getUserByUserId(userId: string): Promise<User[] | []>;
    getUserProgression(userId: string): Promise<Progression>;
    getServerStatus(platform: string): Promise<ServerStatus>;
    getUserRank(userId: string, platform: string): Promise<UserRank>;
    getUserOperators(userId: string, platform: string, view: string, aggregation: string, gameMode: string, teamRole: string, season: string): Promise<GameModes>;
}
