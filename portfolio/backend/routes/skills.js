const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");

// GET all skills grouped by category
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });

    // Group by category
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {});

    res.json({ success: true, data: skills, grouped });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create skill
router.post("/", async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// POST bulk create skills
router.post("/bulk", async (req, res) => {
  try {
    const skills = await Skill.insertMany(req.body.skills);
    res.status(201).json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
