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
exports.GetOperator = void 0;
const apiClient_1 = require("./apiClient");
const auth_1 = require("./auth");
const constants_1 = require("../constants");
const GetOperator = (userId, platform, view, aggregation, gameMode, teamRole, season) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    var token = yield (0, auth_1.CheckToken)();
    var expiration = yield (0, auth_1.GetExperation)();
    const headers = {
        Authorization: `ubi_v1 t=${token}`,
        'Ubi-SessionId': constants_1.UBI_RANKED_SESSIONID,
        'Ubi-AppId': constants_1.UBI_DATADEV_APPID,
        'Content-Type': 'application/json',
        expiration: expiration,
    };
    const platformChange = platform === 'uplay' ? 'PC' : 'CONSOLE';
    const spaceId = (_a = constants_1.RANKED_UBI_SPACEIDS.find(x => x.id === platformChange)) === null || _a === void 0 ? void 0 : _a.value;
    const URI = constants_1.UBI_DATADEV_URI +
        (0, constants_1.UBI_GETSTATS)(userId, spaceId, platformChange, view, aggregation, gameMode, teamRole, season);
    // https://prod.datadev.ubisoft.com/v1/users/488cd0dd-b8e0-4718-a9da-2767ea44c399/playerstats?spaceId=05bfb3f7-6c21-4c42-be1f-97a33fb5cf66&view=current&aggregation=operators&gameMode=all,ranked,casual,unranked&platformGroup=CONSOLE&teamRole=attacker,defender&seasons=Y9S2
    // https://prod.datadev.ubisoft.com/v1/users/488cd0dd-b8e0-4718-a9da-2767ea44c399/playerstats?spaceId=05bfb3f7-6c21-4c42-be1f-97a33fb5cf66&view=current&aggregation=operators&gameMode=ranked,casual&platformGroup=CONSOLE&teamRole=defender,attacker&seasons=Y9S2
    console.log(URI);
    const data = yield (0, apiClient_1.ApiClient)(URI, headers, 'GET');
    const operators = yield ExtractOperators(yield data.json(), userId, gameMode, platformChange);
    return operators;
});
exports.GetOperator = GetOperator;
const ExtractOperators = (data, userId, gameMode, platform) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const gameModes = {
        ranked: {
            attackers: [],
            defenders: [],
        },
        unranked: {
            attackers: [],
            defenders: [],
        },
        all: {
            attackers: [],
            defenders: [],
        },
        casual: {
            attackers: [],
            defenders: [],
        },
    };
    const splitGameModes = gameMode.split(',');
    for (const mode of splitGameModes) {
        var profile = (_b = (_a = data.profileData[`${userId}`].platforms[`${platform}`].gameModes[`${mode}`]) === null || _a === void 0 ? void 0 : _a.teamRoles) !== null && _b !== void 0 ? _b : [];
        const attackers = (_c = profile.Attacker) !== null && _c !== void 0 ? _c : {};
        const defenders = (_d = profile.Defender) !== null && _d !== void 0 ? _d : {};
        const selectMode = gameModes[mode];
        if (attackers.length > 0) {
            const attackersPromise = attackers.map((operator) => __awaiter(void 0, void 0, void 0, function* () {
                const operatorStats = yield BuildOperator(operator);
                return operatorStats;
            }));
            const resolvedAttackers = yield Promise.all(attackersPromise);
            selectMode.attackers.push(...resolvedAttackers);
        }
        if (defenders.length > 0) {
            const defendersPromise = defenders.map((operator) => __awaiter(void 0, void 0, void 0, function* () {
                const operatorStats = yield BuildOperator(operator);
                return operatorStats;
            }));
            const resolvedDefender = yield Promise.all(defendersPromise);
            selectMode.defenders.push(...resolvedDefender);
        }
    }
    return gameModes;
});
const BuildOperator = (operator) => __awaiter(void 0, void 0, void 0, function* () {
    const stats = {
        type: operator.type,
        statsType: operator.statsType,
        statsDetail: operator.statsDetail,
        matchesPlayed: operator.matchesPlayed,
        roundsPlayed: operator.roundsPlayed,
        minutesPlayed: operator.minutesPlayed,
        matchesWon: operator.matchesWon,
        matchesLost: operator.matchesLost,
        roundsWon: operator.roundsWon,
        roundsLost: operator.roundsLost,
        kills: operator.kills,
        assists: operator.assists,
        deaths: operator.death,
        headshots: operator.headshots,
        meleeKills: operator.meleeKills,
        teamKills: operator.teamKills,
        openingKills: operator.openingKills,
        trades: operator.trades,
        openingKillTrades: operator.openingKillTrades,
        openingDeathTrades: operator.openingDeathTrades,
        revives: operator.revives,
        distanceTravelled: operator.distanceTravelled,
        winLossRatio: operator.winLossRatio,
        killDeathRatio: operator.killDeathRatio.value,
        headshotAccuracy: operator.headshotAccuracy.value,
        killsPerRound: operator.killsPerRound.value,
        roundsWithAKill: operator.killsPerRound.value,
        roundsWithMultiKill: operator.roundsWithMultiKill.value,
        roundsWithOpeningKill: operator.roundsWithOpeningKill.value,
        roundsWithOpeningDeath: operator.roundsWithOpeningDeath.value,
        roundsWithKOST: operator.roundsWithKOST.value,
        roundsSurvived: operator.roundsSurvived.value,
        roundsWithAnAce: operator.roundsWithAnAce.value,
        roundsWithClutch: operator.roundsWithClutch.value,
        timeAlivePerMatch: operator.timeAlivePerMatch,
        timeDeadPerMatch: operator.timeDeadPerMatch,
        distancePerRound: operator.distancePerRound,
    };
    return stats;
});
//# sourceMappingURL=getOperator.js.map