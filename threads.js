/**
 * Gets count number of Threads from the users Inbox
 *
 * It takes the gmail service object and count of threads as parameter
 * Returns an array of Thread objects
 */

async function getThreads(gmail, count) {
    const res = await gmail.users.threads.list({
        userId: "me",
        maxResults: count,
    });

    const threads = res.data.threads;

    return threads;
}
module.exports = { getThreads };
