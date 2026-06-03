const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

// GET active profile
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne({ isActive: true });
    if (!profile) {
      return res.status(404).json({ success: false, error: "Profile not found" });
    }
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create profile
router.post("/", async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json({ success: true, data: profile });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT update profile
router.put("/:id", async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!profile) {
      return res.status(404).json({ success: false, error: "Profile not found" });
    }
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
