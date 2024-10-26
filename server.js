const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const dataDirectory = path.join(__dirname, "data");

// Middleware to parse JSON bodies
app.use(express.json());

// making sure that data directory exists
if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory);
  console.log("Data directory created");
}

// 1. GET /: returns the list of files in the "data" directory
app.get("/", (req, res) => {
  fs.readdir(dataDirectory, (err, files) => {
    if (err) {
      return res.status(500).send("Error reading data directory");
    } else {
      res.json(files);
    }
  });
});

// 2. POST /: create a new file with the specified name and content in the "data" directory
app.post("/", (req, res) => {
  const { filename, content } = req.body;

  if (!filename || !content) {
    return res.status(400).send("File name and content are required");
  }

  const filePath = path.join(dataDirectory, filename);

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      return res.status(500).send("Error creating the file");
    } else {
      res.status(201).send("File created successfully");
    }
  });
});

// Make the server listen on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
