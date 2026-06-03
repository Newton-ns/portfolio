const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    tagline: { type: String },
    bio: { type: String },
    email: { type: String },
    location: { type: String },
    avatarUrl: { type: String },
    resumeUrl: { type: String },
    social: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      website: { type: String, default: "" }
    },
    stats: {
      yearsExperience: { type: Number, default: 0 },
      projectsCompleted: { type: Number, default: 0 },
      happyClients: { type: Number, default: 0 }
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
