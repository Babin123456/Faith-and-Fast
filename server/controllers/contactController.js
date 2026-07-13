import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ContactMessageModel from "../models/contactMessageModel.js";
import sendEmail from "../config/sendEmail.js";

// Basic email shape check — mirrors the lightweight validation style used
// elsewhere in the codebase rather than pulling in a new dependency.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const submitContactMessage = catchAsyncErrors(async (req, res) => {
  const { name, email, phone, message } = req.body;

  // -------- Validation --------
  if (!name || !name.trim()) {
    return res.status(400).json({
      message: "Name is required",
      error: true,
      success: false,
    });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({
      message: "Email is required",
      error: true,
      success: false,
    });
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({
      message: "Please provide a valid email address",
      error: true,
      success: false,
    });
  }

  if (!message || !message.trim()) {
    return res.status(400).json({
      message: "Message is required",
      error: true,
      success: false,
    });
  }

  if (message.trim().length > 2000) {
    return res.status(400).json({
      message: "Message cannot exceed 2000 characters",
      error: true,
      success: false,
    });
  }

  // -------- Store --------
  const contactMessage = await ContactMessageModel.create({
    name: name.trim(),
    email: email.trim(),
    phone: phone ? String(phone).trim() : "",
    message: message.trim(),
  });

  // -------- Optional admin notification --------
  // Fire-and-forget: a failed notification email must not fail the request,
  // since the message is already safely stored. sendEmail already swallows
  // its own errors and returns false on failure.
  if (process.env.ADMIN_EMAIL) {
    sendEmail({
      sendTo: process.env.ADMIN_EMAIL,
      subject: `New Support Message from ${contactMessage.name}`,
      html: `
        <h2>New Customer Support Message</h2>
        <p><strong>Name:</strong> ${contactMessage.name}</p>
        <p><strong>Email:</strong> ${contactMessage.email}</p>
        <p><strong>Phone:</strong> ${contactMessage.phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${contactMessage.message}</p>
      `,
    });
  }

  return res.status(201).json({
    message: "Your message has been sent successfully. We'll get back to you soon!",
    error: false,
    success: true,
    data: {
      id: contactMessage._id,
      createdAt: contactMessage.createdAt,
    },
  });
});

export const getContactMessages = catchAsyncErrors(async (req, res) => {
  const messages = await ContactMessageModel.find().sort({ createdAt: -1 });

  return res.status(200).json({
    message: "Contact messages fetched successfully",
    error: false,
    success: true,
    count: messages.length,
    messages,
  });
});
