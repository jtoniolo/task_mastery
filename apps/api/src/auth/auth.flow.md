# API Authentication Flow with Google OAuth2

## Overview
This document outlines the authentication flow for our API using Google OAuth2. This flow allows users to authenticate using their Google accounts, providing a secure and convenient way to access our services.

## Steps

1. **Initiate Authentication**
   - The client application initiates the authentication process by redirecting the user to the API's Google OAuth2 authentication endpoint.
   - **URL**: `/api/auth/google`
   - **Description**: This endpoint redirects the user to Google's OAuth2 authorization endpoint with the necessary parameters.
   - **Curl Example**:
     ```sh
     curl -X GET "http://localhost:3000/api/auth/google"
     ```

2. **User Grants Permission**
   - The user logs in to their Google account and grants the requested permissions.
   - Google redirects the user back to the specified redirect URI with an authorization code.

3. **Handle Google Callback**
   - The API handles the callback from Google, exchanging the authorization code for access and refresh tokens.
   - **URL**: `/api/auth/google/callback`
   - **Description**: This endpoint processes the authorization code received from Google and retrieves the access and refresh tokens.
   - **Curl Example**:
     ```sh
     curl -X GET "http://localhost:3000/api/auth/google/callback?code=AUTHORIZATION_CODE"
     ```

4. **Receive Tokens**
   - The API receives the access token, refresh token, and other metadata from Google.
   - The access token is used to authenticate API requests.
   - The refresh token can be used to obtain a new access token when the current one expires.

5. **Access Protected Resources**
   - The client application includes the access token in the `Authorization` header of API requests.
   - **Example**: `Authorization: Bearer <access_token>`
   - The API validates the token and processes the request if the token is valid.
   - **Curl Example**:
     ```sh
     curl -X GET "http://localhost:3000/api/protected/resource" -H "Authorization: Bearer ACCESS_TOKEN"
     ```

6. **Token Refresh (Optional)**
   - When the access token expires, the client application can use the refresh token to obtain a new access token.
   - The API handles the token refresh process.
   - **URL**: `/api/auth/refresh`
   - **Description**: This endpoint processes the refresh token to obtain a new access token.
   - **Curl Example**:
     ```sh
     curl -X POST "http://localhost:3000/api/auth/refresh" -H "Content-Type: application/json" -d '{"refreshToken": "REFRESH_TOKEN"}'
     ```

## Scopes/Permissions Requested
- `profile`: Access to the user's basic profile information.
- `email`: Access to the user's email address.
- `https://www.googleapis.com/auth/gmail.send`: Allows sending emails.
- `https://www.googleapis.com/auth/gmail.readonly`: Allows read-only access to Gmail.
- `https://www.googleapis.com/auth/gmail.modify`: Allows modifying Gmail data.
- `https://www.googleapis.com/auth/gmail.delete`: Allows deleting Gmail data.

This flow ensures that users can securely authenticate using their Google accounts and access protected resources in our API.