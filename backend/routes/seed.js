const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const pool = require("../db/db");
const products = require("../seedData");

router.get("/", async (req, res) => {
    try {

        const schemaPath = path.join(process.cwd(), "backend", "schema.sql");
        const schema = fs.readFileSync(schemaPath, "utf-8");
        console.log("Schema file path:", schemaPath);
        const statements = schema
            .split(";")
            .map(s => s.trim())
            .filter(s => s.length > 0);

        for (const stmt of statements) {
            await pool.query(stmt);
        }

        const insertQuery = `
            INSERT INTO products (name, category, short_desc, long_desc, price, image_url)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        for (const p of products) {
            await pool.query(insertQuery, [
                p.name,
                p.category,
                p.short_desc,
                p.long_desc,
                p.price,
                p.image_url
            ]);
        }

        res.send("Database seeded successfully!");
    } catch (err) {
        console.error("SEED ERROR:", err);
        res.status(500).send("Error during seeding: " + err.message);
    }
});

module.exports = router;
