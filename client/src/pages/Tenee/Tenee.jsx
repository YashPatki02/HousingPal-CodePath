import { Result, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Col, Divider } from "antd";

const Tenee = ({ api_url, user }) => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${api_url}/api/tenees/${id}`);
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
            const response = await fetch(`${api_url}/api/tenees/${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
        } catch (error) {
            console.error("Error deleting post: ", error);
        } finally {
            navigate("/tenees");
        }
    };

    if (loading) return <Spin />;

    return (
        <Row align="middle" justify="center">
            <Col span={22}>
                <Row
                    justify="space-around"
                    align="middle"
                    style={{ margin: "40px 0px" }}
                >
                    <h1>Tenee</h1>
                    {isOwner && (
                        <Row>
                            <Button
                                type="none"
                                className="button"
                                onClick={() => navigate(`/tenee/edit/${id}`)}
                                style={{ marginRight: "10px" }}
                            >
                                Edit Post
                            </Button>
                            <Button
                                type="none"
                                className="button-inverse"
                                onClick={deletePost(id)}
                                style={{ marginLeft: "10px" }}
                            >
                                Delete Post
                            </Button>
                        </Row>
                    )}
                </Row>

                {!loading && post ? (
                    <>
                        <Row align="start" justify="center" gutter="20px">
                            {/* Personal Info */}
                            <Col flex={6} style={{ margin: "0px 20px" }}>
                                <Row style={{ margin: "20px 0px" }}>
                                    <h2>Personal Info:</h2>
                                </Row>
                                <Divider />
                                <Row
                                    align="middle"
                                    justify="space-between"
                                    style={{ margin: "0px 10px" }}
                                >
                                    <Col>
                                        <h3 style={{ color: "#302C33" }}>
                                            Name:
                                        </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="tile-label">
                                            {post.name}
                                        </h3>
                                    </Col>
                                </Row>
                                <Row
                                    align="middle"
                                    justify="space-between"
                                    style={{ margin: "0px 10px" }}
                                >
                                    <Col>
                                        <h3 style={{ color: "#302C33" }}>
                                            Contact Info:
                                        </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="tile-label">
                                            {post.contact_info}
                                        </h3>
                                    </Col>
                                </Row>
                                <Row
                                    align="middle"
                                    justify="space-between"
                                    style={{ margin: "0px 10px" }}
                                >
                                    <Col>
                                        <h3 style={{ color: "#302C33" }}>
                                            University:
                                        </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="tile-label">
                                            {post.university}
                                        </h3>
                                    </Col>
                                </Row>
                                <Row
                                    align="middle"
                                    justify="space-between"
                                    style={{ margin: "0px 10px" }}
                                >
                                    <Col>
                                        <h3 style={{ color: "#302C33" }}>
                                            Gender:
                                        </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="tile-label">
                                            {post.gender}
                                        </h3>
                                    </Col>
                                </Row>
                                <Row
                                    align="middle"
                                    justify="space-between"
                                    style={{ margin: "0px 10px" }}
                                >
                                    <Col>
                                        <h3 style={{ color: "#302C33" }}>
                                            Age:
                                        </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="tile-label">
                                            {post.age}
                                        </h3>
                                    </Col>
                                </Row>
                            </Col>
                            {/* Bio */}
                            <Col flex={12} style={{ margin: "0px 20px" }}>
                                <Row style={{ margin: "20px 0px" }}>
                                    <h2>Bio and Hobbies:</h2>
                                </Row>
                                <Divider />
                                <Row
                                    align="middle"
                                    justify="space-between"
                                    style={{ margin: "0px 10px" }}
                                >
                                    <Col>
                                        <h3 style={{ color: "#302C33" }}>
                                            Bio:
                                        </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="tile-label">
                                            {post.bio === ""
                                                ? "None Listed"
                                                : post.bio}
                                        </h3>
                                    </Col>
                                </Row>
                                <Row
                                    align="middle"
                                    justify="space-between"
                                    style={{ margin: "40px 10px" }}
                                >
                                    <Col>
                                        <h3 style={{ color: "#302C33" }}>
                                            Hobbies/Interests:
                                        </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="tile-label">
                                            {post.hobbies_interests === ""
                                                ? "None Listed"
                                                : post.hobbies_interests}
                                        </h3>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        {/* Preferences */}
                        <Row style={{ margin: "60px 0px 0px 10px" }}>
                            <h2>Preferences:</h2>
                        </Row>
                        <Divider />
                        <Row
                            align="middle"
                            justify="space-between"
                            style={{ margin: "10px 0 10px 10px" }}
                        >
                            <Col>
                                <h3 style={{ color: "#302C33" }}>
                                    Rent Budget Range (monthly):
                                </h3>
                            </Col>
                            <Col>
                                <Row wrap={true} style={{ maxWidth: "200px" }}>
                                    <h3 className="tile-label">
                                        ${post.budget_min} - ${post.budget_max} / month
                                    </h3>
                                </Row>
                            </Col>
                        </Row>
                        <Row
                            align="middle"
                            justify="space-between"
                            style={{ margin: "10px 0 10px 10px" }}
                        >
                            <Col>
                                <h3 style={{ color: "#302C33" }}>
                                    Preferences:
                                </h3>
                            </Col>
                            <Col>
                                <Row wrap={true} style={{ maxWidth: "200px" }}>
                                    <h3 className="tile-label">
                                        {post.preferences === ""
                                            ? "None Listed"
                                            : post.preferences}
                                    </h3>
                                </Row>
                            </Col>
                        </Row>
                        <Row
                            align="middle"
                            justify="space-between"
                            style={{ margin: "10px 0 80px 10px" }}
                        >
                            <Col>
                                <h3 style={{ color: "#302C33" }}>
                                    Deal Breakers:
                                </h3>
                            </Col>
                            <Col>
                                <Row wrap={true} style={{ maxWidth: "200px" }}>
                                    <h3 className="tile-label">
                                        {post.deal_breakers === ""
                                            ? "None Listed"
                                            : post.deal_breakers}
                                    </h3>
                                </Row>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <Result
                        status="404"
                        title="Listing Not Found"
                        subTitle="Sorry, the listing you are looking for does not exist."
                        extra={
                            <Button
                                type="primary"
                                onClick={() => navigate("/")}
                            >
                                Back to Home
                            </Button>
                        }
                    />
                )}
            </Col>
        </Row>
    );
};

export default Tenee;
