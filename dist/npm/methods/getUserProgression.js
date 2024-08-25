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
exports.GetUserProgression = void 0;
const constants_1 = require("../constants");
const auth_1 = require("./auth");
const apiClient_1 = require("./apiClient");
const GetUserProgression = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var token = yield (0, auth_1.CheckToken)();
    const headers = {
        Authorization: `ubi_v1 t=${token}`,
        'Ubi-AppId': constants_1.UBI_APPID,
        'Ubi-SessionId': constants_1.UBI_SESSIONID,
        'Content-Type': 'application/json',
    };
    const URI = (0, constants_1.BASE_UBI_URI)(1) + (0, constants_1.UBI_GETPLAYERPROGRESSION2)(constants_1.UBI_PROGRESSION_SPACEID, userId);
    const response = yield (0, apiClient_1.ApiClient)(URI, headers, 'GET');
    return (yield response.json());
});
exports.GetUserProgression = GetUserProgression;
//# sourceMappingURL=getUserProgression.js.map