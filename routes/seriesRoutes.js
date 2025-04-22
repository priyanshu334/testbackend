const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const seriesController = require("../controllers/seriesController");

// Create with image
router.post("/", upload.single("image"), seriesController.createSeries);

// Update with image (optional)
router.put("/:id", upload.single("image"), seriesController.updateSeries);

// Other routes
router.get("/", seriesController.getAllSeries);
router.get("/:id", seriesController.getSeries);
router.delete("/:id", seriesController.deleteSeries);

module.exports = router;
