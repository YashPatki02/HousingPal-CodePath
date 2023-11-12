import React from "react";
import { useNavigate } from "react-router";

const TeneeTile = ({ tenee }) => {
    const navigate = useNavigate();
    const {
        id,
        name,
        gender,
        age,
        bio,
        hobbies_interests,
        preferences,
        deal_breakers,
        budget_min,
        budget_max,
        picture,
    } = tenee;

    const goToPost = (id) => () => {
        navigate(`/tenee/${id}`);
    };

    return (
        <div className="tenee-tile">
            <h1>{name}</h1>
            <button onClick={goToPost(id)}>View Listing Details</button>
            <h2>
                {gender === "male"
                    ? "Male"
                    : gender === "female"
                    ? "Female"
                    : "Other"}{" "}
                Tenee
            </h2>
            <p>Age: {age}</p>
            <p>Bio: {bio}</p>
            <p>Hobbies/Interests: {hobbies_interests}</p>
            <p>Preferences: {preferences}</p>
            <p>Deal Breakers: {deal_breakers}</p>
            <p>
                Budget Range: ${budget_min} - ${budget_max}/month
            </p>
            {picture && (
                <div>
                    <p>Profile Picture:</p>
                    <img src={picture} alt="Profile" />
                </div>
            )}
        </div>
    );
};

export default TeneeTile;
