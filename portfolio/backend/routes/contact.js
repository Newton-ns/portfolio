const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

// Email transporter setup
const createTransporter = () => {
  if (!process.env.EMAIL_USER) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// POST submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: "All fields (name, email, subject, message) are required"
      });
    }

    // Save to DB
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip
    });

    // Send email notification (if configured)
    const transporter = createTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.OWNER_EMAIL || process.env.EMAIL_USER,
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
            <hr>
            <small>Submitted at ${new Date().toISOString()}</small>
          `
        });

        // Auto-reply
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Thanks for reaching out!",
          html: `
            <h2>Hi ${name}!</h2>
            <p>Thanks for getting in touch. I've received your message and will get back to you within 24-48 hours.</p>
            <p><strong>Your message:</strong></p>
            <blockquote>${message.replace(/\n/g, "<br>")}</blockquote>
            <p>Best regards,<br>Your Portfolio</p>
          `
        });
      } catch (emailErr) {
        console.warn("Email sending failed:", emailErr.message);
        // Don't fail the request if email fails
      }
    }

    res.status(201).json({
      success: true,
      message: "Message received! I'll get back to you soon.",
      id: contact._id
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: "Failed to submit contact form" });
  }
});

// GET all messages (admin — protect in production)
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
