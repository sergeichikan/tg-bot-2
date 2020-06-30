import { apiRequest } from "./api-request.js";

export const sendMessage = async (body) => {
    return apiRequest("sendMessage", body);
};
