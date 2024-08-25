export interface Progression {
    level: number;
    xp: number;
}
export declare const GetUserProgression: (userId: string) => Promise<Progression>;
