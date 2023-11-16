import React, { useEffect, useState } from "react";
import LeaseTile from "../../components/LeaseTile";
import TeneeTile from "../../components/TeneeTile";
import { Row, Col, Divider, Button } from "antd";
import { Link } from "react-router-dom";

const UserProfile = ({ user }) => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [teneePosts, setTeneePosts] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/leases/user/${user.id}/`
                );
                const data = await response.json();
                setListings(data);
            } catch (error) {
                console.error("Error fetching listings: ", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchPosts = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/tenees/user/${user.id}/`
                );
                const data = await response.json();
                setTeneePosts(data);
            } catch (error) {
                console.error("Error fetching posts: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
        fetchPosts();
    }, [user.id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Row align="middle" justify="center" style={{ marginTop: "40px" }}>
                <Col span={12} align="middle">
                    {user.avatarurl && (
                        <img
                            src={user.avatarurl}
                            alt="User avatar"
                            style={{
                                width: "80px",
                                borderRadius: "50%",
                                marginTop: "20px",
                            }}
                        />
                    )}
                    <h1>Welcome back to your profile, {user.username}</h1>
                </Col>
            </Row>

            <Divider />
            <Row align="middle" justify="start" style={{ margin: "40px 80px" }}>
                <h2 style={{ color: "#6a4087" }}>Your Lease Listings:</h2>
            </Row>

            {listings.length === 0 ? (
                <Col span={22}>
                    <Row
                        align="middle"
                        justify="space-around"
                        style={{ margin: "40px 0" }}
                    >
                        <h3 style={{ color: "#6a4087" }}>No Lease Listings.</h3>
                    </Row>
                    <Button className="button" type="none">
                        <Link to="/listing/create">CREATE LISTING</Link>
                    </Button>
                </Col>
            ) : (
                <Row
                    justify="center"
                    align="middle"
                    style={{ marginBottom: "40px" }}
                >
                    <Col span={22}>
                        <Row wrap={true} justify="center" align="middle">
                            {listings.map((listing) => (
                                <LeaseTile
                                    key={listing.id}
                                    listing={listing}
                                    user={user}
                                />
                            ))}
                        </Row>
                    </Col>
                </Row>
            )}

            <Divider />

            <Row align="middle" justify="start" style={{ margin: "40px 80px" }}>
                <h2 style={{ color: "#6a4087" }}>Your Tenee Posts:</h2>
            </Row>
            {teneePosts.length === 0 ? (
                <Col span={22} style={{marginBottom: "100px"}}>
                    <Row
                        align="middle"
                        justify="space-around"
                        style={{ margin: "40px 0" }}
                    >
                        <h3 style={{ color: "#6a4087" }}>No Tenee Posts.</h3>
                    </Row>
                    <Row
                        align="middle"
                        justify="space-around"
                        style={{ margin: "40px 0" }}
                    >
                        <Button className="button" type="none">
                            <Link to="/tenee/create">CREATE POST</Link>
                        </Button>
                    </Row>
                </Col>
            ) : (
                <Row
                    justify="center"
                    align="middle"
                    style={{ marginBottom: "100px"}}
                >
                    <Col span={22}>
                        <Row wrap={true} justify="center" align="middle">
                            {teneePosts.map((post) => (
                                <TeneeTile
                                    key={post.id}
                                    tenee={post}
                                    user={user}
                                />
                            ))}
                        </Row>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default UserProfile;
