/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function getLabels(gmail) {
    console.log("Fetching Labels");
    const res = await gmail.users.labels.list({
        userId: "me",
    });
    console.log("Labels Fetched\n");

    let labels = res.data.labels;
    if (!labels || labels.length === 0) {
        console.log("No labels found.");
        return;
    }
    return labels;
}

async function createLabel(gmail, name = "Jaadu") {
    console.log("Creating Label");
    const label = await gmail.users.labels.create({
        userId: "me",
        resource: {
            name: name,
        },
    });
    console.log("Label Created\n");
    return label;
}

async function addLabelToEmail(gmail, message_id) {
    const labels = await getLabels(gmail);
    const labelName = "Vacation";
    const label = labels.find((label) => label.name === labelName);

    if (!label) label = await createLabel(gmail, labelName);

    gmail.users.messages.modify(
        {
            userId: "me",
            id: message_id,
            resource: { addLabelIds: [label.id] },
        },
        (err, res) => {
            if (res)
                console.log(labelName, "Label Added to", message_id, "mail");
            if (err) console.log(err);
        }
    );
}

module.exports = { getLabels, createLabel, addLabelToEmail };
