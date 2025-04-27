const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const User = require("../models/user");
const config = require("../config/config");
const InstagramService = require("../services/instagramService");

// Configure Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: config.instagram.appId,
      clientSecret: config.instagram.appSecret,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "emails", "name"],
      scope: ["email", "instagram_basic", "instagram_manage_insights"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create user
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await User.create({
            email: profile.emails[0].value,
            name: `${profile.name.givenName} ${profile.name.familyName}`,
            accessToken,
          });
        } else {
          // Update access token
          user.accessToken = accessToken;
          user.tokenExpiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000); // 60 days
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

class AuthController {
  async loginWithFacebook(req, res) {
    passport.authenticate("facebook", {
      scope: [
        "instagram_basic",
        "instagram_manage_insights",
        "pages_show_list",
      ],
    })(req, res);
  }

  async facebookCallback(req, res) {
    passport.authenticate("facebook", async (err, user) => {
      if (err || !user) {
        return res.redirect("/login?error=auth_failed");
      }

      try {
        const businessAccountId = await InstagramService.getBusinessAccount(
          user.accessToken
        );
        user.businessAccountId = businessAccountId;
        await user.save();

        req.login(user, (err) => {
          if (err) {
            return res.redirect("/login?error=session_error");
          }
          return res.redirect("/dashboard");
        });
      } catch (error) {
        return res.redirect("/login?error=instagram_connection_failed");
      }
    })(req, res);
  }

  async getCurrentUser(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      res.json(req.user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async logout(req, res) {
    req.logout();
    res.redirect("/");
  }
}

module.exports = new AuthController();
