const express = require("express"); 
const router = express.Router(); // create a new router
const fileController = require("../controllers/fileController"); // import the file controller

// define routes
router.get("/", fileController.listFiles);
router.get("/create", fileController.renderCreateForm);
router.post("/create", fileController.createFile);
router.get("/files/:filename", fileController.readFile);
router.put("/files/:filename", fileController.renameFile);
router.delete("/files/:filename", fileController.deleteFile);

// export the router
module.exports = router;