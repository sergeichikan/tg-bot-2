import { getUpdates } from "./get-updates.js";
import { sendMessage } from "./send-message.js";

let lastUpdateId;

const getMsg = (update) => {
    const text = update.message.text;
    let answer = "idk";
    if (text === "/start") {
        answer = "hello";
    } else if (text === "you bot?") {
        answer = "yes";
    }
    return {
        chat_id: update.message.chat.id,
        text: answer,
    };
};

const main = async (offset) => {
    const options = {
        offset: offset,
    };
    const body = await getUpdates(options);
    console.log(body);
    if (body.ok === false) {
        return;
    }
    const result = body.result;
    if (result.length <= 0) {
        return;
    }
    for (const update of result) {
        console.log(update.update_id, update.message.text);
        const msg = {
            chat_id: update.message.chat.id,
            text: "hello",
        };
        // const msg = getMsg(update);
        await sendMessage(msg);
    }
    lastUpdateId = result[result.length - 1].update_id + 1;
};

// main().catch(console.log);

setInterval(() => {
    console.log("[tick]", lastUpdateId);
    main(lastUpdateId);
    // .catch((error) => {
    //     console.log(error);
    // });
}, 5000);
