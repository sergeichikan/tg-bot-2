import { request } from "https";

export const asyncRequest = async (options, ...bodies) => {
    return new Promise((resolve, reject) => {
        const req = request(options, (res) => {
            res.setEncoding("utf8");
            res.on("error", reject);
            const chunks = [];
            res.on("data", (chunk) => chunks.push(chunk));
            res.on("end", () => {
                const rawBody = chunks.join("");
                const body = JSON.parse(rawBody);
                resolve(body);
            });
        });
        req.on("error", reject);
        req.setHeader("Content-Type", "application/json");
        bodies
            .forEach((rawBody) => {
                const body = JSON.stringify(rawBody);
                req.write(body);
            });
        req.end();
    });
};
