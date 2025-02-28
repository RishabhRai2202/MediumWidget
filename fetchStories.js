const Parser = require('rss-parser');
const https = require('https');

const parser = new Parser({
    requestOptions: {
        agent: new https.Agent({ rejectUnauthorized: false }) // Ignore SSL errors
    }
});

const fetchMediumFeeds = async (topic) => {
    let feedUrl = `https://medium.com/feed/tag/${topic}`;

    try {
        let feed = await parser.parseURL(feedUrl);
        console.log(`Fetched ${feed.items.length} articles from Medium.`);
        return feed.items.map(item => ({
            title: item.title || "Untitled",
            link: item.link || "#",
            image: item.content?.match(/<img[^>]+src=["'](.*?)["']/i)?.[1] || '',
            summary: item.contentSnippet || "No description available."
        }));
    } catch (error) {
        console.error("Error fetching Medium feed:", error.message);
        return [];
    }
};

module.exports = { fetchMediumFeeds };