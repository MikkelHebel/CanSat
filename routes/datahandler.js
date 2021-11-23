const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

// PostgreSQL "pool" to talk to database
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// DEFINITION TO GET DATA
router.get("/get", async (req, res) => {
    // Wait for database connection
    const client = await pool.connect();

    client
        // Send query to database
        .query("SELECT * FROM data")

        // Handle results
        .then((result) => {
            const results = { results: result ? result.rows : null };
            res.send(results);
        })

        // Handle errors
        .catch((err) => {
            console.error(err);
            res.send("Error: " + err);
        })

        // Close connection
        .finally(() => client.release());
});

// DEFINITON TO INSERT DATA
router.get("/insert", async (req, res) => {
    // Check value in query string
    //const query_value = req.query;
    const temperature = req.query.temperature;
    const humidity = req.query.humidity;
    const pressure = req.query.pressure;
    const altitude = req.query.altitude;
    if ((temperature || humidity || pressure || altitude) === undefined) return res.send("Error: Value in query string is not defined.");

    // Prepare query for database
    const query = {
        text: "INSERT INTO data(Temperature,Humidity,Pressure,Altitude) VALUES (25, 1, 5, 1000);",
        values: ['temperature', 'humidity', 'pressure', 'altitude']
    };
    console.log("Temperature");
    console.log(temperature);
    console.log("Humidity:");
    console.log(humidity);
    console.log("Pressure:");
    console.log(pressure);
    console.log("Altitude");
    console.log(altitude);
    console.log("Query");
    console.log(query);

    // Wait for database connection
    const client = await pool.connect();

    client
        // Send query to database
        .query(query)
        //.query("INSERT INTO data(Temperature,Humidity,Pressure,Altitude) VALUES (20.1,1,2,1000);")

        // Handle results (just send ok msg)
        .then(() => {
            res.send("ok");
        })

        // Handle errors
        .catch((err) => {
            console.error(err);
            res.send("Error: " + err);
        })

        // Close connection
        .finally(() => client.release());
});

module.exports = router;
