const express = require("express");
const fs = require("fs");
const path = require("path");
const methodOverride = require('method-override');

const app = express();
const PORT = 3000;
// const dataDirectory = path.join(__dirname, "data");

// middleware to parse JSON bodies and URL encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Use method-override middleware
app.use(methodOverride('_method'));

// setting up EJS as the templating engine in an Express application and setting the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));


// GET endpoint to list all files
/* app.get("/", (req, res) => {
  fs.readdir(dataDirectory, (err, files) => {
    if (err) return res.status(500).send("Error reading data directory");

    // render the index.ejs template and pass the list of files
    res.render("index", { files });
  });
}); */

/* app.get("/create", (req, res) => {
  res.render("create");
}); */

/* // POST endpoint to create a new file
app.post("/create", (req, res) => {
  const { filename, content } = req.body;
  const filePath = path.join(dataDirectory, filename);

  // write the content to the file with the specified name
  fs.writeFile(filePath, content, (err) => {
    if (err) return res.status(500).send("Error creating the file");
    res.redirect("/");
  });
}); */

/* // GET endpoint to read file content
app.get("/files/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(dataDirectory, filename);

  // read the file content
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) return res.status(500).send("Error reading file");
    res.render("detail", { filename, content: data });
  });
}); */

/* // PUT endpoint
app.put("/files/:filename", (req, res) => {
  const oldFilename = req.params.filename;
  const { newFilename } = req.body;

  const oldFilePath = path.join(dataDirectory, oldFilename);
  const newFilePath = path.join(dataDirectory, newFilename);

  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) return res.status(500).send("Error renaming the file");
    res.redirect("/"); // Redirect to the index page after renaming
  });
}); */

/* // DELETE File endpoint
app.delete("/files/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(dataDirectory, filename);

  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).send("Error deleting the file");
    res.redirect("/"); // Redirect to the index page after deletion
  });
}); */

// making the server listen on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// MVC
// Middlewares
// routing -> implemetation of the endpoints
// controller -> fucntions 
// error 