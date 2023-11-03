import { pool } from "../config/database.js";

const createUser = async (req, res) => {
    try {
        const { email, password, first_name, last_name } = req.body;
        const createdOn = new Date();

        const results = await pool.query(
            `INSERT INTO users 
            (email, password, first_name, last_name, created_on) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`,
            [email, password, first_name, last_name, createdOn]
        );
        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const {
            email,
            password,
            first_name,
            last_name,
            university,
            school_year,
            contact_info,
            user_type,
            created_on
        } = req.body;
        const { id } = req.params;

        const results = await pool.query(
            `UPDATE users 
            SET email = $1, password = $2, first_name = $3, last_name = $4, 
            university = $5, school_year = $6, contact_info = $7, 
            user_type = $8, created_on = $9
            WHERE id = $10
            RETURNING *`,
            [
                email,
                password,
                first_name,
                last_name,
                university,
                school_year,
                contact_info,
                user_type,
                created_on,
                id
            ]
        );
        res.status(201).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const results = await pool.query(
            `SELECT * FROM users WHERE id = $1`,
            [id]
        );
        res.status(201).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

export default {
    createUser,
    updateUser,
    getUserById
};