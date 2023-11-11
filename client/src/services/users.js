const API_URL = "/api/users";

const signup = async (credentials) => {
    const { first_name, last_name, email, password } = credentials;
    const university = "";
    const school_year = "";
    const contact_info = "";
    const user_type = "";
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            university,
            school_year,
            contact_info,
            user_type,
        }),
    };

    const response = await fetch(`${API_URL}/signup`, options);
    const data = await response.json();
    return data;
};

const updateProfile = async (credentials) => {
    const {
        first_name,
        last_name,
        email,
        password,
        university,
        school_year,
        contact_info,
        user_type,
    } = credentials;
    const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            university,
            school_year,
            contact_info,
            user_type,
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

export default {
    signup,
    updateProfile,
};

