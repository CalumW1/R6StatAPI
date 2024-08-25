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
exports.GetUserStats = void 0;
const apiClient_1 = require("./apiClient");
const auth_1 = require("./auth");
const constants_1 = require("../constants");
const getUserByUserId_1 = require("./getUserByUserId");
const GetUserStats = (userId, platform, view, aggregation, gameMode, teamRole, season) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = yield (0, auth_1.CheckToken)();
    const experation = yield (0, auth_1.GetExperation)();
    const headers = {
        Authorization: `ubi_v1 t=${token}`,
        'Ubi-SessionId': constants_1.UBI_DATADEV_SESSIONID,
        'Content-Type': 'application/json',
        expiration: experation,
    };
    const user = yield (0, getUserByUserId_1.GetUserByUserId)(userId);
    const platformTransformation = platform === 'uplay' ? 'PC' : 'CONSOLE';
    const spaceId = (_a = constants_1.RANKED_UBI_SPACEIDS.find(x => x.id === platformTransformation)) === null || _a === void 0 ? void 0 : _a.value;
    const URI = constants_1.UBI_DATADEV_URI +
        (0, constants_1.UBI_GETSTATS)(userId, spaceId, platformTransformation, view, aggregation, gameMode, teamRole, season);
    const response = yield (0, apiClient_1.ApiClient)(URI, headers, 'GET');
    const usersStats = yield BuildUserStats(yield response.json(), user, platformTransformation, platform);
    return usersStats;
});
exports.GetUserStats = GetUserStats;
const BuildUserStats = (data, user, plaform, originalPlatform) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const stats = {
        all: {},
        ranked: {},
        unranked: {},
        casual: {},
    };
    const id = originalPlatform === 'psn'
        ? (_b = (_a = user.find(x => x.platformType == originalPlatform)) === null || _a === void 0 ? void 0 : _a.profileId) !== null && _b !== void 0 ? _b : ''
        : user[0].userId;
    const ranked = data.profileData[id].platforms[plaform].gameModes.ranked;
    const unranked = data.profileData[id].platforms[plaform].gameModes.unranked;
    const all = data.profileData[id].platforms[plaform].gameModes.all;
    const casual = data.profileData[id].platforms[plaform].gameModes.casual;
    if (all !== undefined) {
        stats.all = yield BuildStats(all);
    }
    if (ranked !== undefined) {
        stats.ranked = yield BuildStats(ranked);
    }
    if (unranked !== undefined) {
        stats.unranked = yield BuildStats(unranked);
    }
    if (casual !== undefined) {
        stats.casual = yield BuildStats(casual);
    }
    return stats;
});
const BuildStats = (gameMode) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = {};
    const teamRoles = gameMode.teamRoles;
    if (Array.isArray(teamRoles.all) && teamRoles.all.length > 0) {
        roles.all = yield MapStats(teamRoles.all[0]);
    }
    if (Array.isArray(teamRoles.Attacker) && teamRoles.Attacker.length > 0) {
        roles.attackers = yield MapStats(teamRoles.Attacker[0]);
    }
    if (Array.isArray(teamRoles.Defender) && teamRoles.Defender.length > 0) {
        roles.defenders = yield MapStats(teamRoles.Defender[0]);
    }
    return roles;
});
const MapStats = (stat) => __awaiter(void 0, void 0, void 0, function* () {
    const stats = {
        type: stat.type,
        statsType: stat.statsType,
        statsDetail: stat.statsDetail,
        seasonYear: stat.seasonYear,
        seasonNumber: stat.seasonNumber,
        matchesPlayed: stat.matchesPlayed,
        roundsPlayed: stat.roundsPlayed,
        minutesPlayed: stat.minutesPlayed,
        matchesWon: stat.matchesWon,
        matchesLost: stat.matchesLost,
        roundsWon: stat.roundsWon,
        roundsLost: stat.roundsLost,
        kills: stat.kills,
        assists: stat.assists,
        deaths: stat.death,
        headshots: stat.headshots,
        meleeKills: stat.meleeKills,
        teamKills: stat.teamKills,
        openingKills: stat.openingKills,
        openingDeaths: stat.openingDeaths,
        trades: stat.trades,
        openingKillTrades: stat.openingKillTrades,
        openingDeathTrades: stat.openingDeathTrades,
        revives: stat.revives,
        distanceTravelled: stat.distanceTravelled,
        winLossRatio: stat.winLossRatio,
        killDeathRatio: stat.killDeathRatio.value,
        headshotAccuracy: stat.headshotAccuracy.value,
        killsPerRound: stat.killsPerRound.value,
        roundsWithAKill: stat.roundsWithAKill.value,
        roundsWithMultiKill: stat.roundsWithMultiKill.value,
        roundsWithOpeningKill: stat.roundsWithOpeningKill.value,
        roundsWithOpeningDeath: stat.roundsWithOpeningDeath.value,
        roundsWithKOST: stat.roundsWithKOST.value,
        roundsSurvived: stat.roundsSurvived.value,
        roundsWithAnAce: stat.roundsWithAnAce.value,
        roundsWithClutch: stat.roundsWithClutch.value,
        timeAlivePerMatch: stat.timeAlivePerMatch,
        timeDeadPerMatch: stat.timeDeadPerMatch,
        distancePerRound: stat.distancePerRound,
    };
    return stats;
});
//# sourceMappingURL=getUserStats.js.map