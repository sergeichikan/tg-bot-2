import { apiRequest } from "./api-request.js";

export const getUpdates = async (body) => {
    return apiRequest("getUpdates", body);
};
