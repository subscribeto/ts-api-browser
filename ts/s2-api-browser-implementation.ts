/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:13 PM -- July 13th, 2019.
 *	Project: @subscribeto/ts-api-browser
 */

import { S2API, S2APIResponse } from "@subscribeto/ts-api";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type APIRequestMethod = <R>(requestMethod: HTTPMethod, endpoint: string, body?: any, token?: string) => Promise<S2APIResponse<R>>;

/**
 * A network request implementation for the browser.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class S2APIBrowserImplementation extends S2API {
	
	public static readonly xhrImplementation: APIRequestMethod = async <R>(requestMethod: HTTPMethod,
																		   endpoint: string,
																		   body?: any,
																		   token?: string): Promise<S2APIResponse<R>> => {
		
		return new Promise<S2APIResponse<R>>((resolve: (response: S2APIResponse<R>) => any, reject: () => any): void => {
			
			let xhr: XMLHttpRequest = new XMLHttpRequest();
			
			xhr.addEventListener("readystatechange", () => {
				
				if (xhr.readyState === XMLHttpRequest.DONE) {
					
					resolve(new S2APIResponse(xhr.response, xhr.status));
					
				}
				
			});
			
			xhr.open(requestMethod, endpoint, true);
			
			if (token !== undefined) xhr.setRequestHeader("Authorization", "Bearer " + token);
			
			if (body !== undefined) {
				
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.send(JSON.stringify(body));
				
			} else xhr.send();
			
		});
		
	};
	
	public static readonly fetchImplementation: APIRequestMethod = async <R>(requestMethod: HTTPMethod,
																			 endpoint: string,
																			 body?: any,
																			 token?: string): Promise<S2APIResponse<R>> => {
		
		return new Promise<S2APIResponse<R>>((resolve: (response: S2APIResponse<R>) => any, reject: () => any): void => {
			
			let opts: RequestInit = {
				method: requestMethod,
				headers: {
					"Content-Type": "application/json"
				}
			};
			
			if (body !== undefined) opts.body = body;
			if (token !== undefined) opts.headers = { ...opts.headers, "Authorization": "Bearer " + token };
			
			fetch(endpoint, opts).then((response: Response) => {
				
				resolve(new S2APIResponse(response.json() as unknown as R, response.status));
				
			});
			
		});
		
	};
	
	public static use(): void {
		
		S2API.setNetworkImplementation(S2APIBrowserImplementation.xhrImplementation);
		
	}
	
}