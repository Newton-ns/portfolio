const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      maxlength: [200, "Subject cannot exceed 200 characters"]
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      maxlength: [2000, "Message cannot exceed 2000 characters"]
    },
    read: { type: Boolean, default: false },
    ipAddress: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
