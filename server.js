const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const dataDirectory = path.join(__dirname, "data");

// middleware to parse JSON bodies
app.use(express.json());

// make sure data directory exists
if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory);
  console.log("Data directory created");
}

// 1. GET /: returns the list of files in the "data" directory
app.get("/", (req, res) => {
  fs.readdir(dataDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Error reading data directory" });
    }
    res.status(200).json(files);
  });
});

// 2. POST /: create a new file with the specified name and content in the "data" directory
app.post("/", (req, res) => {
  const { filename, content } = req.body;

  if (!filename || !content) {
    return res
      .status(400)
      .json({ error: "File name and content are required" });
  }

  const filePath = path.join(dataDirectory, filename);

  // Check if file already exists to avoid overwriting
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
      // 409 Conflict status code indicates that the request could not be completed
      return res.status(409).json({ error: "File already exists" });
    }

    fs.writeFile(filePath, content, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error creating the file" });
      }
      res.status(201).json({ message: "File created successfully" });
    });
  });
});

// 3. GET /files/:filename: returns the content of the file with the specified name
app.get("/files/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(dataDirectory, filename);

  // read the file content
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      // error when we can't find the file
      if (err.code === "ENOENT") {
        return res.status(404).json({ error: "File not found" });
      }
      // for ther errors like permission issues
      return res.status(500).json({ error: "Error reading file" });
    }
    res.status(200).json({ content: data });
  });
});

// 4. PUT /files/:filename: rename an existing file with the specified name
app.put("/files/:filename", (req, res) => {
  const oldFilename = req.params.filename;
  const { newFilename } = req.body;
  const oldFilePath = path.join(dataDirectory, oldFilename);
  const newFilePath = path.join(dataDirectory, newFilename);

  if (!newFilename) {
    return res.status(400).json({ error: "New file name is required" });
  }

  // check if the file exists before renaming
  fs.access(oldFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: "File not found" });
    }

    fs.rename(oldFilePath, newFilePath, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error renaming the file" });
      }
      res.status(200).json({ message: "File renamed successfully" });
    });
  });
});

// 5. DELETE /files/:filename: delete the file with the specified name
app.delete("/files/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(dataDirectory, filename);

  // check if the file exists before deleting
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: "File not found" });
    }

    // delete the file
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error deleting the file" });
      }
      res.status(200).json({ message: "File deleted successfully" });
    });
  });
});

// making the server listen on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
