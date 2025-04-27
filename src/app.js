require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config/config");
const initializeDatabase = require("./config/database");
const instagramRoutes = require("./routes/instagram");
const session = require("express-session");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: config.server.isProduction,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Instagram MCP Server" });
});

// Connect to MongoDB using config
initializeDatabase();

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/api/instagram", instagramRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server using config
app.listen(config.server.port, () => {
  console.log(
    `Server is running in ${config.server.environment} mode on port ${config.server.port}`
  );
});

module.exports = app;
