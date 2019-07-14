import { S2API, S2APIResponse } from "@subscribeto/ts-api";
declare type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
declare type APIRequestMethod = <R>(requestMethod: HTTPMethod, endpoint: string, body?: any, token?: string) => Promise<S2APIResponse<R>>;
export declare class S2APIBrowserImplementation extends S2API {
    static readonly xhrImplementation: APIRequestMethod;
    static readonly fetchImplementation: APIRequestMethod;
    static use(): void;
}
export {};
