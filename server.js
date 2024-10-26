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
      res.status(200).json(files);
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

  // write file fucntion to create a new file if it does not exist, and overwrite it if it does
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      return res.status(500).send("Error creating the file");
    } else {
      res.status(201).send("File created successfully");
    }
  });
});


// 3. GET /files/:filename: returns the content of the file with the specified name
app.get("/files/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(dataDirectory, filename);

  // read file function to read the content of the file
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        // file does not exist
        return res.status(404).json({ error: "File not found", path: filePath });
      } else {
        // handle other potential errors
        return res.status(500).json({ error: "Error reading file" });
      }
    }

    // if no error, send the file content as JSON
    res.status(200).json({ content: data });
  });
});









});

// Make the server listen on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
