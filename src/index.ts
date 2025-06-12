import { Redis } from "ioredis";
import { Hono } from "hono";

const app = new Hono();

app.get("/redis", async (c) => {
	try {
		const redisUrl = process.env.REDIS_URL;
		if (!redisUrl) {
			return c.json({ error: "REDIS_URL is not set" }, 500);
		}
		const redis = new Redis(redisUrl);
		await redis.set("test", "test");
		const value = await redis.get("test");
		return c.json({ value });
	} catch (error) {
		return c.json({ error }, 500);
	}
});

export default {
	fetch: app.fetch,
} satisfies ExportedHandler<Env>;
