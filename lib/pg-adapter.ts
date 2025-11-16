import type { Adapter } from "next-auth/adapters"
import { pool } from "./db"

export function PostgresAdapter(): Adapter {
  return {
    async createUser(user) {
      const result = await pool.query(
        `INSERT INTO users (name, email, email_verified, image) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id, name, email, email_verified as "emailVerified", image`,
        [user.name, user.email, user.emailVerified, user.image]
      )
      return result.rows[0]
    },

    async getUser(id) {
      const result = await pool.query(
        `SELECT id, name, email, email_verified as "emailVerified", image 
         FROM users WHERE id = $1`,
        [id]
      )
      return result.rows[0] || null
    },

    async getUserByEmail(email) {
      const result = await pool.query(
        `SELECT id, name, email, email_verified as "emailVerified", image 
         FROM users WHERE email = $1`,
        [email]
      )
      return result.rows[0] || null
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const result = await pool.query(
        `SELECT u.id, u.name, u.email, u.email_verified as "emailVerified", u.image
         FROM users u
         JOIN accounts a ON u.id = a.user_id
         WHERE a.provider = $1 AND a.provider_account_id = $2`,
        [provider, providerAccountId]
      )
      return result.rows[0] || null
    },

    async updateUser(user) {
      const result = await pool.query(
        `UPDATE users 
         SET name = $1, email = $2, email_verified = $3, image = $4, updated_at = NOW()
         WHERE id = $5
         RETURNING id, name, email, email_verified as "emailVerified", image`,
        [user.name, user.email, user.emailVerified, user.image, user.id]
      )
      return result.rows[0]
    },

    async linkAccount(account) {
      await pool.query(
        `INSERT INTO accounts (user_id, type, provider, provider_account_id, refresh_token, access_token, expires_at, token_type, scope, id_token, session_state)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          account.userId,
          account.type,
          account.provider,
          account.providerAccountId,
          account.refresh_token,
          account.access_token,
          account.expires_at,
          account.token_type,
          account.scope,
          account.id_token,
          account.session_state,
        ]
      )
      return account
    },

    async createSession({ sessionToken, userId, expires }) {
      const result = await pool.query(
        `INSERT INTO sessions (session_token, user_id, expires)
         VALUES ($1, $2, $3)
         RETURNING id, session_token as "sessionToken", user_id as "userId", expires`,
        [sessionToken, userId, expires]
      )
      return result.rows[0]
    },

    async getSessionAndUser(sessionToken) {
      const result = await pool.query(
        `SELECT 
          s.id, s.session_token as "sessionToken", s.user_id as "userId", s.expires,
          u.id as "user_id", u.name, u.email, u.email_verified as "emailVerified", u.image
         FROM sessions s
         JOIN users u ON s.user_id = u.id
         WHERE s.session_token = $1`,
        [sessionToken]
      )
      
      if (!result.rows[0]) return null
      
      const { user_id, name, email, emailVerified, image, ...session } = result.rows[0]
      return {
        session,
        user: { id: user_id, name, email, emailVerified, image },
      }
    },

    async updateSession({ sessionToken, expires }) {
      const result = await pool.query(
        `UPDATE sessions 
         SET expires = $1
         WHERE session_token = $2
         RETURNING id, session_token as "sessionToken", user_id as "userId", expires`,
        [expires, sessionToken]
      )
      return result.rows[0] || null
    },

    async deleteSession(sessionToken) {
      await pool.query(`DELETE FROM sessions WHERE session_token = $1`, [sessionToken])
    },
  }
}
