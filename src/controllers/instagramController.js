const InstagramService = require("../services/instagramService");
const User = require("../models/user");

class InstagramController {
  async getAccountInfo(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);

      if (!user || !user.accessToken) {
        return res
          .status(401)
          .json({ error: "User not authenticated with Instagram" });
      }

      // Get business account ID if not stored
      if (!user.businessAccountId) {
        const businessAccountId = await InstagramService.getBusinessAccount(
          user.accessToken
        );
        user.businessAccountId = businessAccountId;
        await user.save();
      }

      // Get account information
      const accountInfo = await InstagramService.getAccountInfo(
        user.accessToken,
        user.businessAccountId
      );

      res.json(accountInfo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserPosts(req, res) {
    try {
      const posts = await InstagramService.getUserPosts(
        req.user.accessToken,
        req.user.businessAccountId
      );
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPostInsights(req, res) {
    try {
      const { userId, postId } = req.params;
      const user = await User.findById(userId);

      if (!user || !user.accessToken) {
        return res
          .status(401)
          .json({ error: "User not authenticated with Instagram" });
      }

      const insights = await InstagramService.getPostInsights(
        user.accessToken,
        postId
      );

      res.json(insights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new InstagramController();
