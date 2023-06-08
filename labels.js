/**
 * Lists the labels in the user's account.
 *
 * It takes the gmail service object as parameter
 * Returns an array of Labels
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

/**
 * Creates a label in the user's account.
 *
 * It takes the gmail service object and name as parameter
 * Returns an object of Created label
 */

async function createLabel(gmail, name) {
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

/**
 * Adds a label to an Email or Message
 *
 * It takes the gmail service object and message_id as parameter
 */
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
