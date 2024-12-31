const fs = require("fs");
const path = require("path");

const dataDirectory = path.join(__dirname, "../data");

// listing all files in the data directory
const listFiles = (req, res) => {
    fs.readdir(dataDirectory, (err, files) => {
        if (err) return res.status(500).send("Error reading data directory");

        // render the index.ejs template and pass the list of files
        res.render("index", { files });
    });
};

// reading the "create" form
const renderCreateForm = (req, res) => {
    res.render("create");
};

// creating a new file
const createFile = (req,res) =>{
    // log the request body in the console
    console.log('Request body:', req.body);
    const { filename, content } = req.body;
    const filePath = path.join(dataDirectory, filename);

    // write the content to the file with the specified name
    fs.writeFile(filePath, content, (err) => {
        if (err) return res.status(500).send("Error creating the file");
        res.redirect("/");
    });
};

// reading the file content
const readFile = (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(dataDirectory, filename);

    // read the file content
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) return res.status(500).send("Error reading file");
        res.render("detail", { filename, content: data });
    });
};

// renaming a file
const renameFile = (req, res) => {
    const oldFilename = req.params.filename;
    const { newFilename } = req.body;

    const oldFilePath = path.join(dataDirectory, oldFilename);
    const newFilePath = path.join(dataDirectory, newFilename);

    fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) return res.status(500).send("Error renaming the file");
        res.redirect("/"); // Redirect to the index page after renaming
    });
};

// deleting a file
const deleteFile = (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(dataDirectory, filename);

    fs.unlink(filePath, (err) => {
        if (err) return res.status(500).send("Error deleting the file");
        res.redirect("/"); // Redirect to the index page after deleting
    });
};

// exporting the functions of the controller
module.exports = {
    listFiles,
    renderCreateForm,
    createFile,
    readFile,
    renameFile,
    deleteFile
}