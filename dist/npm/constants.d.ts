export declare const UBI_APPID = "e3d5ea9e-50bd-43b7-88bf-39794f4e3d40";
export declare const UBI_DATADEV_APPID = "3587dcbb-7f81-457c-9781-0e3f29f6f56a";
export declare const UBI_DATADEV_SESSIONID = "7d1ea7b3-023f-49d0-b51a-f2962c9ee041";
export declare const UBI_AUTH_URI = "/profiles/sessions";
export declare const UBI_SESSIONID = "089aa129-cb3a-43d6-9455-e40a5e65f0e7";
export declare const UBI_RANKED_SESSIONID = "9001da80-6689-453f-baec-d4903a48fdf0";
export declare const UBI_PROGRESSION_SPACEID = "0d2ae42d-4c27-4cb7-af6c-2099062302bb";
export declare const UBI_SANDBOXES: {
    id: string;
    value: string;
}[];
export declare const UBI_SPACEIDS: {
    id: string;
    value: string;
}[];
export declare const RANKED_UBI_SPACEIDS: {
    id: string;
    value: string;
}[];
export declare const UBI_SERVER_IDS: {
    id: string;
    value: string;
}[];
export declare const UBI_REGIONID: string[];
export declare const UBI_BOARDID: string[];
export declare const BASE_UBI_URI: (version: number) => string;
export declare const UBI_SERVER_STATUS_URI = "https://game-status-api.ubisoft.com/v1";
export declare const UBI_DATADEV_URI = "https://prod.datadev.ubisoft.com/v1";
export declare const UBI_GETUSERBYUSERNAME_URI: (userName: string, platform: string) => string;
export declare const UBI_GETUSERBYID_URI: (userId: string) => string;
export declare const UBI_GETPLAYERPROGRESSION: (spaceId: string, sandbox: string, playerIds: string) => string;
export declare const UBI_GETSERVERSTATUS: (serverId: string) => string;
export declare const UBI_RANKED_URI: (spaceId: string, sandboxId: string, boardId: string, seasons: string, regionId: string, profileIds: string) => string;
export declare const UBI_PROFILEV2_URI: (profileId: string, platform: string) => string;
export declare const UBI_GETPLAYERPROGRESSION2: (spaceId: string, userId: string) => string;
export declare const UBI_RANKED_URI_V2: (profileId: string, platform: string) => string;
export declare const UBI_GETSTATS: (userId: string, spaceId: string, platform: string, view: string, aggregation: string, gameMode: string, teamRole: string, seasons: string) => string;
export declare const AvatarURI: (userId: string, size: number) => string;
export declare const AvatarImages: (userId: string) => {
    146: string;
    256: string;
    500: string;
};
export declare const Ranks: {
    id: number;
    name: string;
    minimumRankPoints: number;
    maximumRankPoints: number;
    image: string;
}[];
