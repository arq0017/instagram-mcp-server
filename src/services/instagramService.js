const axios = require("axios");
const config = require("../config/config");

class InstagramService {
  constructor() {
    this.baseUrl = `https://graph.facebook.com/v18.0`;
  }

  /**
   * Get Instagram Business Account ID
   * This is required for most API operations
   */
  async getBusinessAccount(accessToken) {
    try {
      const response = await axios.get(`${this.baseUrl}/me/accounts`, {
        params: { access_token: accessToken },
      });

      if (!response.data.data.length) {
        throw new Error("No Facebook pages found");
      }

      const pageId = response.data.data[0].id;
      const pageResponse = await axios.get(`${this.baseUrl}/${pageId}`, {
        params: {
          fields: "instagram_business_account",
          access_token: accessToken,
        },
      });

      if (!pageResponse.data.instagram_business_account) {
        throw new Error("No Instagram business account connected");
      }

      return pageResponse.data.instagram_business_account.id;
    } catch (error) {
      console.error("Error getting business account:", error);
      throw error;
    }
  }

  /**
   * Get basic information about the Instagram account
   */
  async getAccountInfo(accessToken, businessAccountId) {
    try {
      const response = await axios.get(`${this.baseUrl}/${businessAccountId}`, {
        params: {
          fields:
            "name,username,profile_picture_url,followers_count,follows_count,media_count",
          access_token: accessToken,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching account info:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  /**
   * Get user's media posts with basic insights
   */
  async getUserPosts(accessToken, businessAccountId, limit = 25) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${businessAccountId}/media`,
        {
          params: {
            fields:
              "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count",
            limit,
            access_token: accessToken,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  /**
   * Get insights for a specific post
   */
  async getPostInsights(accessToken, mediaId) {
    try {
      const response = await axios.get(`${this.baseUrl}/${mediaId}/insights`, {
        params: {
          metric: "engagement,impressions,reach,saved",
          access_token: accessToken,
        },
      });

      // Convert the insights array to an object for easier access
      const insights = {};
      response.data.data.forEach((metric) => {
        insights[metric.name] = metric.values[0].value;
      });

      return insights;
    } catch (error) {
      console.error(
        "Error fetching post insights:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  /**
   * Get recent comments on a post
   */
  async getPostComments(accessToken, mediaId, limit = 50) {
    try {
      const response = await axios.get(`${this.baseUrl}/${mediaId}/comments`, {
        params: {
          fields: "id,text,timestamp,username,replies",
          limit,
          access_token: accessToken,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error(
        "Error fetching post comments:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  /**
   * Get account insights (last 30 days)
   */
  async getAccountInsights(accessToken, businessAccountId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${businessAccountId}/insights`,
        {
          params: {
            metric:
              "audience_gender_age,audience_locale,audience_country,online_followers",
            period: "days_28",
            access_token: accessToken,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(
        "Error fetching account insights:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  /**
   * Error handler helper
   */
  handleError(error) {
    const errorResponse = {
      message: error.message,
      code: error.response?.status || 500,
      details: error.response?.data || {},
    };

    // Log the error for debugging
    console.error("Instagram API Error:", errorResponse);

    return errorResponse;
  }
}

module.exports = new InstagramService();
