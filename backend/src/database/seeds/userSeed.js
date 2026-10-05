import bcrypt from "bcrypt";
import pool from "../../config/database.js";

const createUser = async () => {
  try {
    const name = "NexDesk Admin";
    const email = "admin@nexdesk.local";
    const password = "Admin@123";
    const role = "admin";

    const passwordHash = await bcrypt.hash(password, 12);

    const query = `
      INSERT INTO users (
        name,
        email,
        password_hash,
        role
      )
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING
      RETURNING id, name, email, role;
    `;

    const values = [name, email, passwordHash, role];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      console.log("User already exists.");
    } else {
      console.log("Development user created:");
      console.log(result.rows[0]);
    }
  } catch (error) {
    console.error("Failed to create development user:", error.message);
  } finally {
    await pool.end();
  }
};

createUser();