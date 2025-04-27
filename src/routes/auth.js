const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Login route - redirects to Facebook
router.get("/login", authController.loginWithFacebook);

// Facebook OAuth callback
router.get("/facebook/callback", authController.facebookCallback);

// Get current user
router.get("/me", authController.getCurrentUser);

// Logout
router.get("/logout", authController.logout);

module.exports = router;
