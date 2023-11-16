import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Component.css";
import PostHeader from "./PostHeader";
import { Row, Col, Button, Card, Divider } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

const TeneeTile = ({ tenee, post, user, favorited, favorite, unFavorite }) => {
    const navigate = useNavigate();
    const [teneePost, setTeneePost] = useState(tenee);
    const [userListing, setUserListing] = useState({});

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

    useEffect(() => {
        const getUser = async (id) => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/users/${id}`
                );
                const data = await response.json();
                setUserListing(data);
            } catch (error) {
                console.error("Error fetching user: ", error);
            }
        };

        getUser(user_id);
    }, [teneePost]);

    return (
        <div className="tenee-tile">
            <Card
                title={<PostHeader user={userListing} />}
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
                <Col>
                    <Row>
                        <h2>Personal Info:</h2>
                    </Row>
                    <Row
                        align="middle"
                        justify="space-between"
                        style={{ margin: "0px 10px" }}
                    >
                        <Col>
                            <h3 style={{ color: "#302C33" }}>Name:</h3>
                        </Col>
                        <Col>
                            <h3 className="tile-label">{name}</h3>
                        </Col>
                    </Row>
                    <Row
                        align="middle"
                        justify="space-between"
                        style={{ margin: "0px 10px" }}
                    >
                        <Col>
                            <h3 style={{ color: "#302C33" }}>Contact Info:</h3>
                        </Col>
                        <Col>
                            <h3 className="tile-label">{contact_info}</h3>
                        </Col>
                    </Row>
                    <Row
                        align="middle"
                        justify="space-between"
                        style={{ margin: "0px 10px" }}
                    >
                        <Col>
                            <h3 style={{ color: "#302C33" }}>University:</h3>
                        </Col>
                        <Col>
                            <h3 className="tile-label">{university}</h3>
                        </Col>
                    </Row>
                    <Row
                        align="middle"
                        justify="space-between"
                        style={{ margin: "0px 10px" }}
                    >
                        <Col>
                            <h3 style={{ color: "#302C33" }}>Gender:</h3>
                        </Col>
                        <Col>
                            <h3 className="tile-label">{gender}</h3>
                        </Col>
                    </Row>
                    <Row
                        align="middle"
                        justify="space-between"
                        style={{ margin: "0px 10px" }}
                    >
                        <Col>
                            <h3 style={{ color: "#302C33" }}>Age:</h3>
                        </Col>
                        <Col>
                            <h3 className="tile-label">{age}</h3>
                        </Col>
                    </Row>
                    <Divider style={{margin: "10px 0px"}} />
                    <Row>
                        <h2>Preferences:</h2>
                    </Row>
                    <Row
                        align="middle"
                        justify="space-between"
                        style={{ margin: "0px 10px" }}
                    >
                        <Col>
                            <h3 style={{ color: "#302C33" }}>
                                Budget Range (monthly):
                            </h3>
                        </Col>
                        <Col>
                            <h3 className="tile-label">
                                ${budget_min} - ${budget_max}/month
                            </h3>
                        </Col>
                    </Row>
                </Col>
            </Card>
        </div>
    );
};

export default TeneeTile;
