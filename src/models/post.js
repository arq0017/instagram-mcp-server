const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    // Instagram post data
    postId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Post content
    mediaType: {
      type: String,
      enum: ["IMAGE", "VIDEO", "CAROUSEL_ALBUM"],
      required: true,
    },
    mediaUrl: String,
    caption: String,
    hashtags: [String],
    // Metrics
    metrics: {
      likes: Number,
      comments: Number,
      shares: Number,
      saves: Number,
      reach: Number,
      impressions: Number,
      engagement: Number,
    },
    // Analysis results
    analysis: {
      sentiment: {
        score: Number,
        label: String,
      },
      topics: [String],
      bestPerformingHashtags: [String],
      contentCategory: String,
      performanceScore: Number,
    },
    postedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
postSchema.index({ userId: 1, postedAt: -1 });
postSchema.index({ hashtags: 1 });

module.exports = mongoose.model("Post", postSchema);
