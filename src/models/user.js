const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Basic user info
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    // Instagram-specific data
    instagramId: {
      type: String,
      unique: true,
    },
    accessToken: {
      type: String,
    },
    tokenExpiresAt: {
      type: Date,
    },
    // Instagram business account info
    businessAccountId: {
      type: String,
    },
    username: {
      type: String,
    },
    // Analytics preferences
    analyticsSettings: {
      preferredPostTime: String,
      targetAudience: [String],
      contentTypes: [String],
      competitors: [String],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", userSchema);
