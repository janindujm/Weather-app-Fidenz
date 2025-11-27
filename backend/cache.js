const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.connect().catch(console.error);
let lastCacheStatus = "";

async function getCachedData(key) {
    const data = await redisClient.get(key);
    lastCacheStatus = data ? "HIT" : "MISS";
    return data ? JSON.parse(data) : null;
}

async function setCachedData(key, value, expirationInSeconds = 300) {
    await redisClient.setEx(key, expirationInSeconds, JSON.stringify(value));
}

function getLastCacheStatus() {
    return lastCacheStatus;
}

module.exports = {
    redisClient,
    getCachedData,
    setCachedData,
    getLastCacheStatus
};