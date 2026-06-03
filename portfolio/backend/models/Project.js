const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"]
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [500, "Description cannot exceed 500 characters"]
    },
    longDescription: {
      type: String,
      maxlength: [2000, "Long description cannot exceed 2000 characters"]
    },
    techStack: [{ type: String, trim: true }],
    imageUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    category: {
      type: String,
      enum: ["web", "mobile", "backend", "ml", "other"],
      default: "web"
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["completed", "in-progress", "archived"],
      default: "completed"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
