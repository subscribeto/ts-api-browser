"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_api_1 = require("@subscribeto/ts-api");
class S2APIBrowserImplementation extends ts_api_1.S2API {
    static use() {
        ts_api_1.S2API.setNetworkImplementation(S2APIBrowserImplementation.xhrImplementation);
    }
}
S2APIBrowserImplementation.xhrImplementation = (requestMethod, endpoint, body, token) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                resolve(new ts_api_1.S2APIResponse(xhr.response, xhr.status));
            }
        });
        xhr.open(requestMethod, endpoint, true);
        if (token !== undefined)
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        if (body !== undefined) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(body));
        }
        else
            xhr.send();
    });
});
S2APIBrowserImplementation.fetchImplementation = (requestMethod, endpoint, body, token) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        let opts = {
            method: requestMethod,
            headers: {
                "Content-Type": "application/json"
            }
        };
        if (body !== undefined)
            opts.body = body;
        if (token !== undefined)
            opts.headers = Object.assign({}, opts.headers, { "Authorization": "Bearer " + token });
        fetch(endpoint, opts).then((response) => {
            resolve(new ts_api_1.S2APIResponse(response.json(), response.status));
        });
    });
});
exports.S2APIBrowserImplementation = S2APIBrowserImplementation;
//# sourceMappingURL=s2-api-browser-implementation.js.map