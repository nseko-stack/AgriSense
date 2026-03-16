const express = require("express");
const router = express.Router();
const cropController = require("../controllers/cropController");

// CROP ROUTES
router.get("/", cropController.getAllCrops);
router.get("/:id", cropController.getCropById);
router.post("/", cropController.createCrop);
router.put("/:id", cropController.updateCrop);
router.delete("/:id", cropController.deleteCrop);

module.exports = router;