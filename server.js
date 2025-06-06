const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();

// HTTP request logger
app.use(morgan("combined"));

app.get("/track.png", (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const logEntry = {
    time: new Date().toISOString(),
    ip,
    userAgent
  };

  // Log to file
  fs.appendFileSync("log.txt", JSON.stringify(logEntry) + "\n");

  // Log to console
  console.log("Tracking request:", logEntry);

  // Transparent 1x1 PNG
  const img = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQIHWM=",
    "base64"
  );
  res.set("Content-Type", "image/png");
  res.send(img);
});

app.listen(3000, () => console.log("Tracker running on port 3000"));
