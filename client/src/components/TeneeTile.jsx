import React from "react";

const TeneeTile = ({ tenee }) => {
    const {
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

    return (
        <div className="tenee-tile">
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
