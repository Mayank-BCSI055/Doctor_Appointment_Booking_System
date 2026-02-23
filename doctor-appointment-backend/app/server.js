const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// --------------------
// Environment
// --------------------
const PORT = process.env.PORT || 10000;
const FLASK_BACKEND_URL = process.env.FLASK_BACKEND_URL || "http://localhost:10000";

// -------------------------------
// CORS (Render + Prod Safe)
// -------------------------------
app.use(
  cors({
    origin: process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(",")
      : "*",
    credentials: true,
  })
);

app.use(express.json());

// --------------------
// Health Check
// --------------------
app.get("/health", (req, res) => {
  res.status(200).json({ status: "node-proxy-ok" });
});

// ----------------------------------
// Proxy ALL API traffic to Flask
// ----------------------------------
app.use(
  "/api",
  createProxyMiddleware({
    target: FLASK_BACKEND_URL,
    changeOrigin: true,
    secure: true,
  })
);

// --------------------
// Start Server
// --------------------
app.listen(PORT, () => {
  console.log(`🟢 Node proxy running on port ${PORT}`);
});
