import { pool } from "./database.js";
import "./dotenv.js";

const createUsersTable = async () => {
    const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id serial PRIMARY KEY,
      githubid integer NOT NULL,
      username varchar(100) NOT NULL,
      avatarurl varchar(500) NOT NULL,
      accesstoken varchar(500) NOT NULL
    );
  `;

    try {
        const res = await pool.query(createUsersTableQuery);
        console.log("🎉 users table created successfully");
    } catch (error) {
        console.error("⚠️ error creating users table", err);
    }
};

const createUserDetailsTable = async () => {
    const creasteUsersDetailsQuery = `
    CREATE TABLE IF NOT EXISTS
        users_details (
            id SERIAL PRIMARY KEY,
            user_id SERIAL REFERENCES users(id) ON DELETE CASCADE,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            university VARCHAR(50) NOT NULL,
            school_year VARCHAR(50) NOT NULL,
            contact_info VARCHAR(50) NOT NULL,
            user_type VARCHAR(50) NOT NULL,
            onboarded BOOLEAN NOT NULL DEFAULT FALSE
        )`;

    try {
        const result = await pool.query(creasteUsersDetailsQuery);
        console.log("🎉 users_details table created successfully");
    } catch (error) {
        console.log("🚨 error creating users_details table", error);
    }
};

const createListingsTable = async () => {
    const createListingsQuery = `
    CREATE TABLE IF NOT EXISTS
        listings (
            id SERIAL PRIMARY KEY,
            listing_type VARCHAR(50) NOT NULL,
            tenant_names VARCHAR(50) NOT NULL,
            room_setup VARCHAR(50) NOT NULL,
            appliances VARCHAR(50) NOT NULL,
            amenities VARCHAR(50) NOT NULL,
            preference_gender VARCHAR(30) NOT NULL,
            preference_age VARCHAR(30) NOT NULL,
            other_preferences VARCHAR(250) NOT NULL,
            deal_breakers VARCHAR(250) NOT NULL,
            location VARCHAR(250) NOT NULL,
            rent NUMERIC NOT NULL,
            utilities NUMERIC NOT NULL,
            lease_length VARCHAR(50) NOT NULL,
            start_date DATE NOT NULL,
            pictures TEXT[] NOT NULL,
            user_id INTEGER NOT NULL REFERENCES users(id)
        )`;

    try {
        const result = await pool.query(createListingsQuery);
        console.log("🎉 listings table created successfully");
    } catch (error) {
        console.log("🚨 error creating listings table", error);
    }
};

const createTeneesProfilesTable = async () => {
    const createTeneesProfilesQuery = `
    CREATE TABLE IF NOT EXISTS
        tenees (
            id SERIAL PRIMARY KEY,
            gender VARCHAR(50) NOT NULL,
            age INTEGER NOT NULL,
            bio VARCHAR(250) NOT NULL,
            hobbies_interests VARCHAR(250) NOT NULL,
            preferences VARCHAR(250) NOT NULL,
            deal_breakers VARCHAR(250) NOT NULL,
            budget_min NUMERIC NOT NULL,
            budget_max NUMERIC NOT NULL,
            picture TEXT NOT NULL,
            user_id INTEGER NOT NULL REFERENCES users(id)
            
        )`;

    try {
        const result = await pool.query(createTeneesProfilesQuery);
        console.log("🎉 tenees table created successfully");
    } catch (error) {
        console.log("🚨 error creating tenees table", error);
    }
};

const createLeaseFavoritesTable = async () => {
    const createLeaseFavoritesQuery = `
    CREATE TABLE IF NOT EXISTS
        lease_favorites (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id),
            listing_id INTEGER NOT NULL REFERENCES listings(id)
        )`;

    try {
        const result = await pool.query(createLeaseFavoritesQuery);
        console.log("🎉 lease_favorites table created successfully");
    } catch (error) {
        console.log("🚨 error creating lease favorites table", error);
    }
};

const createTeneesFavoritesTable = async () => {
    const createTeneesFavoritesQuery = `
    CREATE TABLE IF NOT EXISTS
        tenees_favorites (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id),
            tenees_id INTEGER NOT NULL REFERENCES tenees(id)
        )`;

    try {
        const result = await pool.query(createTeneesFavoritesQuery);
        console.log("🎉 tenees_favorites table created successfully");
    } catch (error) {
        console.log("🚨 error creating tenees favorites table", error);
    }
};

await createUsersTable();
await createUserDetailsTable();
await createListingsTable();
await createTeneesProfilesTable();
await createLeaseFavoritesTable();
await createTeneesFavoritesTable();
