const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Authentication required" });
};

const hasValidInstagramToken = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user.accessToken || !user.businessAccountId) {
      return res.status(401).json({
        error: "Instagram business account not connected",
      });
    }

    // Check if token is expired
    if (user.tokenExpiresAt && new Date() > user.tokenExpiresAt) {
      return res.status(401).json({
        error: "Instagram token expired",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  isAuthenticated,
  hasValidInstagramToken,
};
