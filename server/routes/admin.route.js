const { Router } = require("express");
const { admin } = require("../controllers/admin.controller");

const router = Router();

// POST /admin - Route for admin login
router.post("/admin", admin);

module.exports = router;
