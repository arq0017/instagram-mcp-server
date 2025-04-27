require("dotenv").config();

// Validate required environment variables
const requiredEnvVars = [
  "MONGODB_URI",
  "FACEBOOK_APP_ID",
  "FACEBOOK_APP_SECRET",
  "INSTAGRAM_GRAPH_API_VERSION",
];

// Check for missing environment variables
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`
  );
}

const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || "development",
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
  },

  // Database configuration
  database: {
    uri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  // Instagram/Facebook API configuration
  instagram: {
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
    apiVersion: process.env.INSTAGRAM_GRAPH_API_VERSION,
    graphApiBaseUrl: `https://graph.facebook.com/${process.env.INSTAGRAM_GRAPH_API_VERSION}`,
  },

  // API rate limiting
  rateLimit: {
    maxRequestsPerHour: parseInt(process.env.MAX_REQUESTS_PER_HOUR, 10) || 100,
    windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
  },

  // Analytics configuration
  analytics: {
    trendDetectionInterval:
      parseInt(process.env.TREND_DETECTION_INTERVAL, 10) || 3600,
    // Add more analytics-specific configuration here
    minEngagementRate: 0.02, // 2% engagement rate threshold
    minSampleSize: 10, // Minimum number of posts to analyze
  },

  // Security configuration
  security: {
    // Add security-related configuration here
    cors: {
      allowedOrigins: process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(",")
        : ["http://localhost:3000"],
    },
  },

  session: {
    secret: process.env.SESSION_SECRET || "your-secret-key",
  },

  facebook: {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  },

  instagram: {
    apiVersion: "v18.0",
  },
};

module.exports = config;
