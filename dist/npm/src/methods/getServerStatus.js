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
exports.GetServerStatus = void 0;
const constants_1 = require("../constants");
const auth_1 = require("./auth");
const apiClient_1 = require("./apiClient");
const GetServerStatus = (platform) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield (0, auth_1.CheckToken)();
    const headers = {
        Authorization: `ubi_v1 t=${token}`,
        'Ubi-AppId': constants_1.UBI_APPID,
        'Content-Type': 'application/json',
    };
    const serverId = constants_1.UBI_SERVER_IDS.find(x => x.id === platform);
    const URI = constants_1.UBI_SERVER_STATUS_URI + (0, constants_1.UBI_GETSERVERSTATUS)(serverId === null || serverId === void 0 ? void 0 : serverId.value);
    const response = yield (0, apiClient_1.ApiClient)(URI, headers, 'GET');
    const data = yield response.json();
    const serverStatus = {
        MDM: data[0].MDM,
        SpaceID: data[0].SpaceID,
        Category: data[0].Category,
        Name: data[0].Name,
        platform: data[0].Platform,
        status: data[0].Status,
        maintenance: data[0].Maintenance,
        impactedFeatures: data[0].ImpactedFeatures,
    };
    return serverStatus;
});
exports.GetServerStatus = GetServerStatus;
//# sourceMappingURL=getServerStatus.js.map