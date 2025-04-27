const express = require("express");
const router = express.Router();
const instagramController = require("../controllers/instagramController");
const {
  isAuthenticated,
  hasValidInstagramToken,
} = require("../middleware/auth");

// Apply both middlewares
router.use(isAuthenticated);
router.use(hasValidInstagramToken);

// Get user's posts
router.get("/posts", instagramController.getUserPosts);

module.exports = router;
