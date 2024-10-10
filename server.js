const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 8080;

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Custom middleware to handle file requests
app.use((req, res, next) => {
  const filePath = path.join(__dirname, "public", req.url);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
      // File exists, let Express handle it
      next();
    } else {
      // File doesn't exist, send error.html
      res.status(404).sendFile(path.join(__dirname, "public", "error.html"));
    }
  });
});

// Start the server

app.listen(port, () => {
  console.log(`Server running at 🚀🚀🚀 http://localhost:${port}/`);
});
