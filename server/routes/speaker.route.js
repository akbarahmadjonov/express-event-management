const { Router } = require("express");
const {
  speaker,
  getAllSpeakers,
} = require("../controllers/speaker.controller");

const router = Router();

// POST /speaker & speakers - Route for speaker login
router.post("/speaker", speaker);
router.get("/speakers", getAllSpeakers);

module.exports = router;
