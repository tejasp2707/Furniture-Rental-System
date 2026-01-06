const express = require("express");
const protect = require("../middleware/authMiddleware");
const controller = require("../controllers/dashboardController");

const router = express.Router();

router.get("/user", protect, controller.userDashboard);
router.get("/system", protect, controller.systemDashboard);

module.exports = router;
