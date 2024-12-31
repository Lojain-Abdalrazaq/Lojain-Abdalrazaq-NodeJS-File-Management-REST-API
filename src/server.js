const express = require("express");
const path = require("path");
const logger = require("./middleware/middlewareLogger");
const methodOverride = require("method-override");
const fileRouter = require("./routes/fileRoutes");


const app = express();
const PORT = 3000;

// middlewares to parse JSON bodies, URL encoded bodies, and method override
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger); 
app.use(methodOverride('_method'));

// setting up the tempalte engine
app.set("view engine", "ejs");                   // specifies the template engine that the server will use to render dynamic HTML views -> ejs
app.set("views", path.join(__dirname, "views")); // specifies the directory where the template engine (EJS) will look for view files
app.use(express.static(__dirname + '/public'));               // Serves static files (like CSS, JavaScript, images, etc.) from the public directory

// adding the file router
app.use("/", fileRouter);

// making the server listen on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
