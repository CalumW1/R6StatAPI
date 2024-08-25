export interface Authorise {
    platformType: string;
    ticket: string;
    twoFactorAuthenticationTicket: string;
    profileId: string;
    userId: string;
    nameOnPlatform: string;
    environment: string;
    expiration: string;
    spaceId: string;
    clientIp: string;
    clientIpCountry: string;
    serverTime: string;
    sessionId: string;
    sessionKey: string;
    rememberMeTicket: string;
}
export declare const Auth: (email: string, password: string) => Promise<string>;
export declare const CheckToken: () => Promise<string>;
export declare const GetExperation: () => Promise<string>;
