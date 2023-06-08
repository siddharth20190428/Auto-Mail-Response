async function getThreads(gmail) {
    const res = await gmail.users.threads.list({
        userId: "me",
        maxResults: 1,
    });

    const threads = res.data.threads;

    return threads;
}
module.exports = { getThreads };
