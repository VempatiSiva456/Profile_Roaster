const express = require("express");
const roastController = require("../controllers/roastController");

const router = express.Router();

router.post("/api/createRoast", roastController.createRoast);
router.get("/api/getRoasts", roastController.getRoasts);
router.post("/api/vote", roastController.upvoteRoast);

module.exports = router;
