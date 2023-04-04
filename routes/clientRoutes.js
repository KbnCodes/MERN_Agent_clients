const express = require("express");
const clientController = require("../controllers/clientController");

const router = express.Router();

router.patch("/:id", clientController.updateClient);

module.exports = router;
