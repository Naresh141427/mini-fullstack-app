const express = require('express');
const router = express.Router();
const pool = require('../db/db');



router.post('/', async (req, res, next) => {
    try {
        const { product_id, name, email, phone, message } = req.body || {};

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "Request body cannot be empty"
            });
        }


        if (!name || !email || !message) {
            return res.status(400).json({
                message: "Name, email, and message are required."
            });
        }


        const insertQuery = `
      INSERT INTO enquiries (product_id, name, email, phone, message)
      VALUES (?, ?, ?, ?, ?)
    `;

        await pool.query(insertQuery, [
            product_id || null,
            name,
            email,
            phone || null,
            message
        ]);

        res.status(201).json({ message: "Enquiry submitted successfully." });

    } catch (err) {
        next(err);
    }
});



router.get('/', async (req, res, next) => {
    try {
        const query = `
      SELECT e.*, p.name AS product_name
      FROM enquiries e
      LEFT JOIN products p ON e.product_id = p.id
      ORDER BY e.created_at DESC
    `;

        const [rows] = await pool.query(query);

        res.json({
            enquiries: rows
        });

    } catch (err) {
        next(err);
    }
});


module.exports = router;
