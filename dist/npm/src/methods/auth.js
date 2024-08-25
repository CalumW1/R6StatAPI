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
exports.GetExperation = exports.CheckToken = exports.Auth = void 0;
const constants_1 = require("../constants");
const fs_1 = require("fs");
const apiClient_1 = require("./apiClient");
const FileName = 'Auth.json';
let Email = '';
let Password = '';
let Token = '';
let NextRefresh = '';
let Experation = '';
const Auth = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = new Date().toISOString();
    if (Token !== '' && currentTime < NextRefresh) {
        return Token;
    }
    if (email && password !== undefined) {
        Email = email;
        Password = password;
    }
    const newToken = yield RequestToken(Email, Password);
    return newToken.ticket;
});
exports.Auth = Auth;
const RequestToken = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Refreshing Token...');
    const headers = {
        Authorization: `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`,
        'Ubi-AppId': constants_1.UBI_APPID,
        'Content-Type': 'application/json',
    };
    const URI = (0, constants_1.BASE_UBI_URI)(3) + constants_1.UBI_AUTH_URI;
    const response = yield (0, apiClient_1.ApiClient)(URI, headers, 'POST');
    const data = (yield response.json());
    Token = data.ticket;
    NextRefresh = data.expiration;
    Experation = data.expiration;
    (0, fs_1.writeFile)(FileName, JSON.stringify(data, null, 2), err => {
        if (err) {
            console.error('Error writing to file', err);
        }
        else {
            console.log('Token data has been saved to file!');
        }
    });
    return data;
});
const CheckToken = () => __awaiter(void 0, void 0, void 0, function* () {
    var currentTime = new Date().toISOString();
    if (Token !== '' && currentTime < NextRefresh) {
        console.log('Retreving token from memory');
        return Token;
    }
    else
        return (yield RequestToken(Email, Password)).ticket;
});
exports.CheckToken = CheckToken;
const GetExperation = () => __awaiter(void 0, void 0, void 0, function* () {
    return Experation;
});
exports.GetExperation = GetExperation;
//# sourceMappingURL=auth.js.map