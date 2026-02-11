const ratelimit = require("../config/upstash");

const ratelimiter = async (req, res, next) => {
    try {
        const key = req.ip || "default-key";

        const { success } = await ratelimit.limit(key);

        if (!success) {
            return res.status(429).json({
                message: "Too many requests",
            });
        }

        next();
    } catch (error) {
        console.error("Rate limiter error:", error);

        // ⚠️ Important: Don't crash server
        next();  // allow request instead of 500
    }
};

module.exports = ratelimiter;
