import pool from "../../config/database.js";

export const findUserByEmail = async (email) => {
  const query = `
    SELECT
      id,
      name,
      email,
      password_hash,
      role,
      is_active
    FROM users
    WHERE email = $1
    LIMIT 1;
  `;

  const result = await pool.query(query, [email]);

  return result.rows[0] || null;
};