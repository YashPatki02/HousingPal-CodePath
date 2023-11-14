import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import './Component.css';
import PostHeader from "./PostHeader";
import { Row, Col, Button, Card } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

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
        contact_info,
        university,
        user_id,
    } = teneePost;

    const goToPost = (id) => () => {
        navigate(`/tenee/${id}`);
    };

    return (
        <div className="tenee-tile">
            <Card
                title={<PostHeader user={user} />}
                extra={
                    <>
                        <Button onClick={goToPost(id)}>View Tenee Post</Button>
                        {user_id !== user.id &&
                            (favorited ? (
                                <Button onClick={() => unFavorite(id)}>
                                    <HeartFilled style={{ color: "red" }} />
                                </Button>
                            ) : (
                                <Button onClick={() => favorite(id)}>
                                    <HeartOutlined style={{ color: "red" }} />
                                </Button>
                            ))}
                    </>
                }
                style={{
                    width: 600,
                    padding: "10px",
                    backgroundColor: "#f0f2f5",
                }}
            >
                <p>Name: {name}</p>
                <p>University: {university}</p>
                <p>Contact Info: {contact_info}</p>
                <p>
                    Gender:{" "}
                    {gender === "male"
                        ? "Male"
                        : gender === "female"
                        ? "Female"
                        : "Other"}{" "}
                </p>
                <p>Age: {age}</p>
                <p>Bio: {bio}</p>
                <p>
                    Budget Range: ${budget_min} - ${budget_max}/month
                </p>
            </Card>
        </div>
    );
};

export default TeneeTile;
