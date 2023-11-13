import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const Tenee = ({ user }) => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `http://localhost:3001/api/tenees/${id}`
                );
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error("Error fetching post: ", error);
            }
        };

        fetchPost();
        setLoading(false);
    }, [id]);

    useEffect(() => {
        if (post) {
            setIsOwner(post.user_id === user.id);
        }
    }, [post]);

    const deletePost = (id) => async () => {
        try {
            const response = await fetch(
                `http://localhost:3001/api/tenees/${id}`,
                {
                    method: "DELETE",
                }
            );
            const data = await response.json();
        } catch (error) {
            console.error("Error deleting post: ", error);
        } finally {
            navigate("/tenees");
        }
    };

    return (
        <div>
            <h2>Tenee</h2>

            {post ? (
                <div className="tenee-tile">
                    <h2>{post.name}</h2>
                    <h3>
                        {post.gender === "male"
                            ? "Male"
                            : post.gender === "female"
                            ? "Female"
                            : "Other"}{" "}
                        Tenee
                    </h3>
                    <p>Age: {post.age}</p>
                    <p>Bio: {post.bio}</p>
                    <p>Hobbies/Interests: {post.hobbies_interests}</p>
                    <p>Preferences: {post.preferences}</p>
                    <p>Deal Breakers: {post.deal_breakers}</p>
                    <p>
                        Budget Range: ${post.budget_min} - ${post.budget_max}
                        /month
                    </p>
                    {post.picture && (
                        <div>
                            <p>Profile Picture:</p>
                            <img src={post.picture} alt="Profile" />
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}

            {isOwner && (
                <>
                    <button onClick={() => navigate(`/tenee/edit/${id}`)}>
                        Edit Post
                    </button>
                    <button onClick={deletePost(id)}>Delete Listing</button>
                </>
            )}
        </div>
    );
};

export default Tenee;
