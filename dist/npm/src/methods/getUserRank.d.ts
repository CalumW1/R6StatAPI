export interface UserRank {
    casual?: RankStats;
    event?: RankStats;
    warmup?: RankStats;
    standard?: RankStats;
    ranked?: RankStats;
}
interface RankStats {
    profile_board_id: string;
    id: string;
    max_rank: number;
    max_rank_points: number;
    platform_family: string;
    rank: number;
    rank_points: number;
    rank_name: string;
    season_id: number;
    top_rank_position: number;
    deaths: number;
    kills: number;
    abandons: number;
    losses: number;
    wins: number;
}
export declare const GetUserRank: (userId: string, platform: string) => Promise<UserRank>;
export {};
