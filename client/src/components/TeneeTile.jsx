import React from "react";
import { useNavigate } from "react-router";

const TeneeTile = ({ tenee, user }) => {
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

    const favorite = (id) => async () => {
        console.log(`Favorite tenee with id ${id}`);
        console.log(`favorited by user with id ${user.id}`);

        const response = await fetch(
            `http://localhost:3001/api/favorites_tenees`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    teneesId: id,
                }),
            }
        );
        const data = await response.json();
        console.log(data);
    }

    return (
        <div className="tenee-tile">
            <h1>{name}</h1>
            <button onClick={goToPost(id)}>View Tenee Post</button>
            <button onClick={favorite(id)}>Favorite Tenee</button>
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
