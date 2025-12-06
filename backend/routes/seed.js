const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const pool = require("../db/db");
const products = require("../seedData");

router.get("/", async (req, res) => {
    try {

        const schema = fs.readFileSync(path.join(__dirname, "../schema.sql"), "utf-8");

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
        console.error(err);
        res.status(500).send("Seeding failed: " + err.message);
    }
});

module.exports = router;
