const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }
});

// Route /all
router.get("/all", async (req, res) => {
  try {
    // Wait for DB connection
    const client = await pool.connect();

    // Run query
    const result = await client.query("SELECT * FROM data");

    // Respond with DB results as json
    if (result) res.json({temperature: result.rows});else res.json({salaries: null});

    // Release connection
    client.release();
  } catch (err) {
      // Report errors
      console.error(err);
      res.send("Error " + err);
  }
});

module.exports = router;
