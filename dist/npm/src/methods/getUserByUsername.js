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
exports.GetUserByUsername = void 0;
const constants_1 = require("../constants");
const auth_1 = require("./auth");
const apiClient_1 = require("./apiClient");
const GetUserByUsername = (username, platform) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO fix this, this is dumb
    var token = yield (0, auth_1.CheckToken)();
    const headers = {
        Authorization: `ubi_v1 t=${token}`,
        'Ubi-AppId': constants_1.UBI_APPID,
        'Content-Type': 'application/json',
    };
    const URI = (0, constants_1.BASE_UBI_URI)(3) + (0, constants_1.UBI_GETUSERBYUSERNAME_URI)(username, platform);
    const response = yield (0, apiClient_1.ApiClient)(URI, headers, 'GET');
    const data = (yield response.json());
    data.profiles = data.profiles.map(profile => (Object.assign(Object.assign({}, profile), { avatars: (0, constants_1.AvatarImages)(profile.userId) })));
    return data.profiles[0];
});
exports.GetUserByUsername = GetUserByUsername;
//# sourceMappingURL=getUserByUsername.js.map