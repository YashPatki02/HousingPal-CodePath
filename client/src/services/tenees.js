const API_URL =
    process.env.NODE_ENV === "production"
        ? "https://housingpal-codepath-server.up.railway.app/api/tenees"
        : "http://localhost:3001/api/tenees";

const createTeneesProfile = async (credentials) => {
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
    } = credentials;

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
        }),
    };

    try {
        const response = await fetch(`${API_URL}/`, options);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const updateTeneesProfile = async (credentials) => {
    const {
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
    } = credentials;
    const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
        }),
    };

    try {
        const response = await fetch(`${API_URL}/${credentials.id}`, options);
        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
};

const deleteTeneesProfile = async (id) => {
    const options = {
        method: "DELETE",
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, options);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const getTeneesProfileById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
};

const getAllTeneesProfiles = async () => {
    try {
        const response = await fetch(`${API_URL}/`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const getTeneesProfileByUserId = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/user/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export default {
    createTeneesProfile,
    updateTeneesProfile,
    deleteTeneesProfile,
    getTeneesProfileById,
    getAllTeneesProfiles,
    getTeneesProfileByUserId,
};
