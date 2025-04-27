const mongoose = require("mongoose");

const trendSchema = new mongoose.Schema(
  {
    // Trend type (hashtag, meme template, content type)
    type: {
      type: String,
      enum: ["HASHTAG", "MEME_TEMPLATE", "CONTENT_TYPE"],
      required: true,
    },
    // The trending item
    name: {
      type: String,
      required: true,
    },
    // Trend metrics
    metrics: {
      occurrences: Number,
      engagement: Number,
      reach: Number,
      growthRate: Number,
    },
    // Example posts using this trend
    examplePosts: [
      {
        postId: String,
        mediaUrl: String,
        engagement: Number,
      },
    ],
    // When this trend was detected
    detectedAt: {
      type: Date,
      default: Date.now,
    },
    // Trend status
    status: {
      type: String,
      enum: ["RISING", "PEAKED", "DECLINING"],
      default: "RISING",
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
trendSchema.index({ type: 1, detectedAt: -1 });
trendSchema.index({ name: 1, type: 1 }, { unique: true });

module.exports = mongoose.model("Trend", trendSchema);
