const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db.js");
const notesRoutes = require("./routes/notesRoutes");
const ratelimiter = require("./middleware/rateLimiter.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// ✅ CORS FIRST
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// ✅ Rate limiter after CORS
app.use("/api", ratelimiter);



// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running ✅" });
});

app.use("/api/notes", notesRoutes);

// DB + Server start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});
