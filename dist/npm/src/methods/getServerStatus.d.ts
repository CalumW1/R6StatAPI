export interface ServerStatus {
    MDM: string;
    SpaceID: string;
    Category: string;
    Name: string;
    platform: string;
    status: string;
    maintenance: string;
    impactedFeatures: string[];
}
export declare const GetServerStatus: (platform: string) => Promise<ServerStatus>;
