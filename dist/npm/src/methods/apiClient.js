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
exports.ApiClient = void 0;
const ApiClient = (url, header, method) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url, {
        method: method,
        headers: header,
    });
    if (!response.ok) {
        throw new Error('Error with response');
    }
    return response;
});
exports.ApiClient = ApiClient;
//# sourceMappingURL=apiClient.js.map