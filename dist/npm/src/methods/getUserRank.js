"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserRank = void 0;
const apiClient_1 = require("./apiClient");
const auth_1 = require("./auth");
const constants_1 = require("../constants");
const GetUserRank = (userId, platform) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield (0, auth_1.CheckToken)();
    const headers = {
        Authorization: `ubi_v1 t=${token}`,
        'Ubi-AppId': constants_1.UBI_APPID,
        'Ubi-SessionId': constants_1.UBI_SESSIONID,
        'Content-Type': 'application/json',
    };
    const platformChange = platform === 'uplay' ? 'pc' : 'console';
    const URI = (0, constants_1.BASE_UBI_URI)(2) + (0, constants_1.UBI_RANKED_URI_V2)(userId, platformChange);
    const response = yield (0, apiClient_1.ApiClient)(URI, headers, 'GET');
    const result = yield extractValues(yield response.json());
    return result;
});
exports.GetUserRank = GetUserRank;
const extractValues = (profiles) => __awaiter(void 0, void 0, void 0, function* () {
    const ranks = {};
    profiles.platform_families_full_profiles.forEach((event) => {
        event.board_ids_full_profiles.forEach((profile) => {
            const boardId = profile.board_id;
            const fullProfile = profile.full_profiles[0].profile;
            const seasonStatistics = profile.full_profiles[0].season_statistics;
            const rank = {
                profile_board_id: boardId,
                id: fullProfile.board_id,
                max_rank: fullProfile.max_rank,
                max_rank_points: fullProfile.max_rank_points,
                platform_family: fullProfile.platform_family,
                rank: fullProfile.rank,
                rank_points: fullProfile.rank_points,
                rank_name: fullProfile.rank_name,
                season_id: fullProfile.season_id,
                top_rank_position: fullProfile.top_rank_position,
                deaths: seasonStatistics.deaths,
                kills: seasonStatistics.kills,
                abandons: seasonStatistics.match_outcomes.abandons,
                losses: seasonStatistics.match_outcomes.losses,
                wins: seasonStatistics.match_outcomes.wins,
            };
            ranks[boardId] = rank;
        });
    });
    return ranks;
});
//# sourceMappingURL=getUserRank.js.map