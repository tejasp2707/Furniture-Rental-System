const express = require("express");
const protect = require("../middleware/authMiddleware");
const controller = require("../controllers/furnitureController");

const router = express.Router();

router.post("/", protect, controller.createFurniture);
router.get("/", controller.getAvailableFurniture);
router.get("/:id", controller.getFurnitureById);
router.put("/:id", protect, controller.updateFurniture);
router.delete("/:id", protect, controller.deleteFurniture);
router.post("/:id/rent", protect, controller.rentFurniture);
router.post("/:id/return", protect, controller.returnFurniture);

module.exports = router;
