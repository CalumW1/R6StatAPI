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
exports.R6StatAPI = void 0;
const auth_1 = require("./methods/auth");
const getUserByUsername_1 = require("./methods/getUserByUsername");
const getUserByUserId_1 = require("./methods/getUserByUserId");
const getUserProgression_js_1 = require("./methods/getUserProgression.js");
const getServerStatus_1 = require("./methods/getServerStatus");
const getUserRank_js_1 = require("./methods/getUserRank.js");
const getOperator_1 = require("./methods/getOperator");
// import { GetUserStats, UserStats } from './methods/GetUserStats';
class R6StatAPI {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, auth_1.Auth)(email, password);
        });
    }
    getUserByUsername(username, platform) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getUserByUsername_1.GetUserByUsername)(username, platform);
        });
    }
    getUserByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getUserByUserId_1.GetUserByUserId)(userId);
        });
    }
    getUserProgression(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getUserProgression_js_1.GetUserProgression)(userId);
        });
    }
    getServerStatus(platform) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getServerStatus_1.GetServerStatus)(platform);
        });
    }
    getUserRank(userId, platform) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getUserRank_js_1.GetUserRank)(userId, platform);
        });
    }
    getUserOperators(userId, platform, view, aggregation, gameMode, teamRole, season) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, getOperator_1.GetOperator)(userId, platform, view, aggregation, gameMode, teamRole, season);
        });
    }
}
exports.R6StatAPI = R6StatAPI;
//# sourceMappingURL=index.js.map