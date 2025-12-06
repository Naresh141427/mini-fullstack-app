const fs = require('fs');
const path = require('path');
const pool = require('./db/db');
const products = require('./seedData');

async function runSeed() {
    try {
        console.log("started seeding database");

        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');

        const statements = schema
            .split(";")
            .map(q => q.trim())
            .filter(q => q.length > 0);

        for (const stmt of statements) {
            await pool.query(stmt);
        }
        console.log("Tables created or already exist.");

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

        console.log("data seeded successfully.");
        process.exit(0);

    } catch (err) {
        console.error("Error during seed:", err);
        process.exit(1);
    }
}

runSeed();
