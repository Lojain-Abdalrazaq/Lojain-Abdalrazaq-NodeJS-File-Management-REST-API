const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const fileRouter = require("./routes/fileRoutes");

const app = express();
const PORT = 3000;

// middlewares to parse JSON bodies, URL encoded bodies, and method override
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// setting up the tempalte engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

// using the file router
app.use("/", fileRouter);

// making the server listen on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
