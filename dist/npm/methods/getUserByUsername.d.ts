export interface User {
    profileId: string;
    userId: string;
    platformType: string;
    idOnPlatform: string;
    nameOnPlatform: string;
    avatars: Avatars;
}
interface Avatars {
    '146': string;
    '256': string;
    '500': string;
}
export declare const GetUserByUsername: (username: string, platform: string) => Promise<User>;
export {};
