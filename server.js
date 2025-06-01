const express = require("express");
const fs = require("fs");
const app = express();

app.get("/track.png", (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const logEntry = {
    time: new Date().toISOString(),
    ip,
    userAgent
  };

  fs.appendFileSync("log.txt", JSON.stringify(logEntry) + "\n");

  // Transparent 1x1 PNG
  const img = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQIHWM=",
    "base64"
  );
  res.set("Content-Type", "image/png");
  res.send(img);
});

app.listen(3000, () => console.log("Tracker running on port 3000"));
