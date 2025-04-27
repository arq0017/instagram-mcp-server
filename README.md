# Instagram MCP Server

## Overview

The **Instagram MCP (Marketing Control Panel) Server** is a backend system designed to interact with the **Instagram Graph API**. It allows you to fetch post data, such as engagement metrics (likes, comments, reach) for Instagram Business/Creator accounts. The server can also provide insights into user content and suggest strategies for increasing reach and engagement.

## Features:
- Fetch and analyze post data (likes, comments, reach, etc.)
- Retrieve insights from Instagram Business/Creator accounts
- Simple backend to manage Instagram account data via Instagram API

## Tech Stack:
- **Backend:** Node.js with Express.js
- **Database:** MongoDB / PostgreSQL (optional for storing user data)
- **Instagram API:** To fetch post data and engagement metrics

## Setup Instructions

### Prerequisites:
1. **Facebook Developer Account:** Set up a Facebook Developer account.
2. **Instagram Business/Creator Account:** Link Instagram to a Facebook page.
3. **Access Tokens:** Obtain access tokens via OAuth2 for Instagram Business/Creator account access.

### Installation:

1. Clone the repository:

```bash
git clone https://github.com/yourusername/instagram-mcp-server.git
cd instagram-mcp-server
npm install
```
2. Create a .env file with the following:
   
```
FB_APP_ID=your_facebook_app_id
FB_APP_SECRET=your_facebook_app_secret
FB_ACCESS_TOKEN=your_facebook_access_token
INSTAGRAM_USER_ID=your_instagram_user_id
```

3. Run the server

```
npm start
```
