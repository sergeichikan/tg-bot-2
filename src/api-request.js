import { token } from "./token.js";
import { hostname } from "./hostname.js";
import { asyncRequest } from "./async-request.js";

export const apiRequest = async (api, ...bodies) => {
    const options = {
        method: "POST",
        hostname: hostname,
        path: `/bot${token}/${api}`,
    };
    return asyncRequest(options, ...bodies);
};
