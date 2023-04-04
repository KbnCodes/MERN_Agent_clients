const express = require("express");
const agencyController = require("../controllers/agencyController");

const router = express.Router();

router.post("/create",  agencyController.create);
router.get("/topclient", agencyController.topclient);

module.exports = router;
