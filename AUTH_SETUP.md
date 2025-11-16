# Authentication Setup Guide

## Overview
This app now uses NextAuth.js with PostgreSQL for authentication, supporting:
- Email/Password signup and signin
- Google OAuth signin

## Setup Instructions

### 1. Configuring Environment Variables

Add your PostgreSQL database URL to `.env`:

```env
DATABASE_URL="postgresql://user:password@host:port/database"
NEXTAUTH_SECRET="generate-a-random-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Optional: For Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 2. Initializing Database

Run the setup script to create the required tables:

```bash
npm run db:setup
```

This will create the following tables:
- `users` - User accounts
- `accounts` - OAuth provider accounts
- `sessions` - User sessions
- `verification_tokens` - Email verification tokens

### 3. Google OAuth Setup 

If you want to enable Google signin:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`

### 4. Start the App

```bash
npm run dev
```

## Features

- **Signup**: `/auth/signup` - Create account with email/password or Google
- **Signin**: `/auth/signin` - Login with email/password or Google
- **Protected Routes**: All routes except `/auth/*` require authentication
- **Session Management**: JWT-based sessions with NextAuth

## Database Schema

The database uses the following structure:

- **users**: Stores user profile information
- **accounts**: Links OAuth providers to users
- **sessions**: Manages active user sessions
- **verification_tokens**: For email verification (future feature)

## Security Notes for production

- Change `NEXTAUTH_SECRET` in production to a secure random string

