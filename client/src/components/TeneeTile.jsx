import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";

const TeneeTile = ({ tenee, post, user, favorited, favorite, unFavorite }) => {
    const navigate = useNavigate();
    const [teneePost, setTeneePost] = useState(tenee);

    useEffect(() => {
        const getPost = async (id) => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/tenees/${id}`
                );
                const data = await response.json();
                setTeneePost(data);
            } catch (error) {
                console.error("Error fetching post: ", error);
            }
        };

        // If teneePost is null, fetch the post
        if (!teneePost.name) {
            getPost(post.tenees_id);
        }
    }, []);

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
    } = teneePost;

    const goToPost = (id) => () => {
        navigate(`/tenee/${id}`);
    };

    return (
        <div className="tenee-tile">
            <h1>{name}</h1>
            <button onClick={goToPost(id)}>View Tenee Post</button>
            {favorited ? (
                <button onClick={() => unFavorite(id)}>Unfavorite Post</button>
            ) : (
                <button onClick={() => favorite(id)}>Favorite Post</button>
            )}
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
