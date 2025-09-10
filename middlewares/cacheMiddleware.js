import { createClient } from "redis";
import { promisify } from "util";

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => console.error("Redis Client Error", err));

client.connect();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const cacheRestaurants = async (req, res, next) => {
  const key = "restaurants";
  try {
    const cached = await getAsync(key);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    res.sendResponse = res.json;
    res.json = async (body) => {
      await setAsync(key, JSON.stringify(body), "EX", 60);
      res.sendResponse(body);
    };
    next();
  } catch (err) {
    console.error("Redis Cache Error", err);
    next();
  }
};

export default { cacheRestaurants };
