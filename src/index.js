import { getUpdates } from "./get-updates.js";
import { sendMessage } from "./send-message.js";

let lastUpdateId = undefined;

const getMsg = (update) => {
    const text = update && update.message && update.message.text;
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
    // console.log(body.result[]);
    if (body.ok === false) {
        return;
    }
    const result = body.result;
    if (result.length <= 0) {
        return;
    }
    for (const update of result) {
        // console.log(update.update_id, update.message.text);
        console.log(update.message);
        // const msg = {
        //     chat_id: update.message.chat.id,
        //     text: "hello",
        // };
        const msg = getMsg(update);
        await sendMessage(msg);
    }
    const last = result.length - 1;
    lastUpdateId = result[last].update_id + 1;
};

const run = () => {
    console.log("[tick]", lastUpdateId);
    main(lastUpdateId)
        .catch((error) => {
            console.log(error);
        });
};

// run();

setInterval(run, 4000);
