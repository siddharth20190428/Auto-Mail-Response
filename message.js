const { addLabelToEmail } = require("./labels");
const { Base64 } = require("js-base64");

function makeBody(to, from, subject, message) {
    let str = `to: ${to}\nfrom: ${from}\nContent-Type: text/html; charset=\"UTF-8\"\nsubject:${subject}\n\n${message}`;

    let encodedMail = Base64.encodeURI(str);
    return encodedMail;
}

async function sendMessage(gmail) {
    let raw = makeBody(
        "siddharth200721@gmail.com",
        "siddharth201820@gmail.com",
        "Thanks for Emailing",
        "<p>Since, I am on vacation. My bot is replying to you. I will be back soon.</p>"
    );
    gmail.users.messages
        .send({
            userId: "me",
            resource: {
                raw,
            },
        })
        .then((res) => {
            addLabelToEmail(gmail, res.data.id);
        });
}

module.exports = { sendMessage };
