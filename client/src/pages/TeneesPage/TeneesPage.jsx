import React, { useEffect, useState } from "react";
import TeneesAPI from "../../services/tenees.js";
import TeneeTile from "../../components/TeneeTile.jsx";
import { Link } from "react-router-dom";

const TeneesPage = ({ api_url, user }) => {
    const [tenees, setTenees] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await TeneesAPI.getAllTeneesProfiles();
                setTenees(response);
            } catch (error) {
                console.error("Error fetching tenees: ", error);
            }
        };

        fetchProfiles();
    }, []);

    return (
        <div>
            <h2>Welcome to the Tenees Page!</h2>
            <div>
                {tenees.map((post) => (
                    <TeneeTile key={post.id} tenee={post} user={user} />
                ))}
            </div>
            <Link to="/tenee/create">Create Post</Link>
        </div>
    );
};

export default TeneesPage;
