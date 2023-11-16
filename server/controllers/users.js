import { pool } from "../config/database.js";

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const results = await pool.query(`SELECT * FROM users WHERE id = $1`, [
            id,
        ]);
        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export default {
    getUserById
};
