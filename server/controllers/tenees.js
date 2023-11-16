import { pool } from "../config/database.js";

const createTeneesProfile = async (req, res) => {
    try {
        const {
            name,
            gender,
            age,
            bio,
            hobbies_interests,
            preferences,
            deal_breakers,
            budget_min,
            budget_max,
            contact_info,
            university,
            user_id,
        } = req.body;

        const results = await pool.query(
            `INSERT INTO tenees 
            (gender, age, bio, hobbies_interests, preferences, deal_breakers, budget_min, budget_max, user_id, name, contact_info,
        university)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING *`,
            [
                gender,
                age,
                bio,
                hobbies_interests,
                preferences,
                deal_breakers,
                budget_min,
                budget_max,
                user_id,
                name,
                contact_info,
                university,
            ]
        );

        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const updateTeneesProfile = async (req, res) => {
    const {
        id,
        gender,
        age,
        bio,
        hobbies_interests,
        preferences,
        deal_breakers,
        budget_min,
        budget_max,
        contact_info,
        university,
    } = req.body;

    try {
        const results = await pool.query(
            `UPDATE tenees
             SET gender = $1, age = $2, bio = $3, hobbies_interests = $4,
             preferences = $5, deal_breakers = $6, budget_min = $7, budget_max = $8,
                contact_info = $9, university = $10
             WHERE id = $11
             RETURNING *`,
            [
                gender,
                age,
                bio,
                hobbies_interests,
                preferences,
                deal_breakers,
                budget_min,
                budget_max,
                contact_info,
                university,
                id,
            ]
        );

        if (results.rowCount === 0) {
            res.status(404).json({ error: "Tenant profile not found" });
        } else {
            res.status(201).json(results.rows[0]);
        }
    } catch (error) {
        console.log(error);
        res.status(409).json({ error: error.message });
    }
};

const deleteTeneesProfile = async (req, res) => {
    const teneesId = req.params.id;

    try {
        const results = await pool.query(
            `DELETE FROM tenees
             WHERE id = $1`,
            [teneesId]
        );

        if (results.rowCount === 0) {
            res.status(404).json({ error: "Tenant profile not found" });
        } else {
            res.json({ message: "Tenant profile deleted successfully" });
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getTeneesProfileById = async (req, res) => {
    const teneesId = req.params.id;

    try {
        const results = await pool.query(
            `SELECT * FROM tenees
             WHERE id = $1`,
            [teneesId]
        );

        if (results.rowCount === 0) {
            res.status(404).json({ error: "Tenant profile not found" });
        } else {
            res.status(201).json(results.rows[0]);
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getAllTeneesProfile = async (req, res) => {
    try {
        const results = await pool.query(`SELECT * FROM tenees`);

        res.status(201).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getTeneesProfileByUserId = async (req, res) => {
    const userId = parseInt(req.params.userId);

    try {
        const results = await pool.query(
            `SELECT * FROM tenees
             WHERE user_id = $1`,
            [userId]
        );

        res.status(201).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export default {
    createTeneesProfile,
    updateTeneesProfile,
    deleteTeneesProfile,
    getTeneesProfileById,
    getAllTeneesProfile,
    getTeneesProfileByUserId,
};
