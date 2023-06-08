const { google } = require("googleapis");
const { authorize } = require("./authorize");
const { sendMessage } = require("./message");
const { getThreads } = require("./threads");

/**
 * An helper function which goes
 *
 * It takes the gmail service object as parameter
 */
async function helper(gmail) {
    console.log("Getting threads");
    const threads = await getThreads(gmail, 3);
    console.log("Threads fetched");

    threads.forEach(async (thread) => {
        const currThread = await gmail.users.threads.get({
            userId: "me",
            id: thread.id,
        });
        const messages = currThread.data.messages;
        messages.forEach((message) => {
            const byMe = message.payload.headers.find(
                (obj) =>
                    obj.name.toLowerCase() == "from" &&
                    (obj.value ==
                        "Siddharth Sahu <siddharth201820@gmail.com>" ||
                        obj.value == "siddharth201820@gmail.com")
            );
            if (!byMe) {
                sendMessage(gmail);
                console.log("Message Sent\n");
            } else {
                console.log("Message not Sent By Me\n");
            }
        });
    });
}

async function main() {
    const auth = await authorize();
    console.log("Authorized");
    const gmail = google.gmail({ version: "v1", auth });

    let max = 10,
        min = 5;

    const repeat = async () => {
        let delay = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log("\nStarted at", new Date().toLocaleString());
        console.log("Refresh in", delay, "seconds\n");
        setTimeout(repeat, delay * 1000);

        const res = await helper(gmail);
    };
    repeat();
}

main();
