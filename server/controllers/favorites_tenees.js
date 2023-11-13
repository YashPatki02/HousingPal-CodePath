import { pool } from "../config/database.js";

const addFavoriteTenee = async (req, res) => {
    const { userId, teneesId } = req.body;

    try {
        const results = await pool.query(
            `INSERT INTO tenees_favorites (user_id, tenees_id) VALUES ($1, $2) RETURNING *`,
            [userId, teneesId]
        );
        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const deleteFavoriteTenee = async (req, res) => {
    const { userId, teneesId } = req.body;

    try {
        const results = await pool.query(
            `DELETE FROM tenees_favorites WHERE user_id = $1 AND tenees_id = $2`,
            [userId, teneesId]
        );
        res.status(201).json(results.rowCount);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getAllFavoriteTeneesByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const results = await pool.query(
            `SELECT * FROM tenees_favorites WHERE user_id = $1`,
            [userId]
        );
        res.status(201).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export default {
    addFavoriteTenee,
    deleteFavoriteTenee,
    getAllFavoriteTeneesByUser,
};
