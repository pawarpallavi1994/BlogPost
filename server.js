// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");

// const postRoutes = require('./routes/posts');

dotenv.config();

// Connect to DB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
