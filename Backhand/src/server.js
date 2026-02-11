const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db.js");
const notesRoutes = require("./routes/notesRoutes");
const ratelimiter = require("./middleware/rateLimiter.js");
const path = require("path");


dotenv.config();
console.log("NODE_ENV:", process.env.NODE_ENV);

const app = express();
const PORT = process.env.PORT || 5002;



// ✅ CORS FIRST
if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));
}

app.use(express.json());

// ✅ Rate limiter after CORS
app.use("/api", ratelimiter);



// Routes
if (process.env.NODE_ENV !== "production") {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running ✅" });
  });
}


app.use("/api/notes", notesRoutes);


if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../Frontend/dist");

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}



// DB + Server start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});
