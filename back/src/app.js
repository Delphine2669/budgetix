const fs = require("node:fs");
const path = require("node:path");
const cookieParser = require("cookie-parser");

const express = require("express");

const app = express();

app.use(express.json());
app.use(cookieParser());
const cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

const router = require("./router");

app.use(router);

// serve the `backend/public` folder for public resources4

app.use(express.static(path.join(__dirname, "../public")));

// serve REACT APP

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  // redirect all requests to the REACT index file

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}
// app.use(cookieParser());

module.exports = app;
