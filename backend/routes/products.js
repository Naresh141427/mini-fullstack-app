const express = require('express');
const router = express.Router();
const pool = require('../db/db');


router.get("/", async (req, res, next) => {
    try {
        const { search = "", category = "", page = 1, limit = 6 } = req.query;

        const offset = (page - 1) * limit;

        let baseQuery = "SELECT * FROM products WHERE 1=1";
        let params = [];

        if (search) {
            baseQuery += " AND name LIKE ?";
            params.push(`%${search}%`);
        }

        if (category) {
            baseQuery += " AND category = ?";
            params.push(category);
        }

        const paginatedQuery = `${baseQuery} LIMIT ? OFFSET ?`;
        params.push(Number(limit), Number(offset));

        const [rows] = await pool.query(paginatedQuery, params);

        const [[{ total }]] = await pool.query(
            `SELECT COUNT(*) AS total FROM products WHERE 1=1`
        );

        res.json({
            products: rows,
            page: Number(page),
            total,
            totalPages: Math.ceil(total / limit),
        });

    } catch (err) {
        next(err);
    }
});



router.get('/:id', async (req, res, next) => {
    try {
        const productId = req.params.id;

        const [rows] = await pool.query(
            "SELECT * FROM products WHERE id = ?",
            [productId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ product: rows[0] });

    } catch (err) {
        next(err);
    }
});

module.exports = router;
