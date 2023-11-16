import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Result, Spin, Row, Col, Divider } from "antd";

const Listing = ({ user }) => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/leases/${id}`
                );
                const data = await response.json();
                setListing(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching listing: ", error);
                setLoading(false);
            }
        };

        fetchListing();
    }, [id]);

    useEffect(() => {
        if (listing) {
            setIsOwner(listing.user_id === user.id);
        }
    }, [listing, user.id]);

    const deleteListing = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:3001/api/leases/${id}`,
                {
                    method: "DELETE",
                }
            );
            const data = await response.json();
            navigate("/");
        } catch (error) {
            console.error("Error deleting listing: ", error);
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
                    <h1>Listing</h1>
                    {isOwner && (
                        <Row>
                            <Button
                                type="none"
                                className="button"
                                onClick={() => navigate(`/listing/edit/${id}`)}
                                style={{ marginRight: "10px" }}
                            >
                                Edit Listing
                            </Button>
                            <Button
                                type="none"
                                className="button-inverse"
                                onClick={() => deleteListing(id)}
                                style={{ marginLeft: "10px" }}
                            >
                                Delete Listing
                            </Button>
                        </Row>
                    )}
                </Row>

                {!loading && listing ? (
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
                                            Contact Info:
                                        </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="tile-label">
                                            {listing.contact_info}
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
                                            {listing.university}
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
                                            Tenant Names:
                                        </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="tile-label">
                                            {listing.tenant_names}
                                        </h3>
                                    </Col>
                                </Row>
                            </Col>
                            {/* Lease Info*/}
                            <Col flex={6} style={{ margin: "0px 20px" }}>
                                <Row style={{ margin: "20px 0px" }}>
                                    <h2>Lease Info:</h2>
                                </Row>
                                <Divider />
                                <Row
                                    align="middle"
                                    justify="space-between"
                                    style={{ margin: "0px 10px" }}
                                >
                                    <Col>
                                        <h3 style={{ color: "#302C33" }}>
                                            Lease Type:
                                        </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="tile-label">
                                            {listing.listing_type}
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
                                            Room Type:
                                        </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="tile-label">
                                            {listing.room_setup}
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
                                            Gender Preferences:
                                        </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="tile-label">
                                            {listing.preference_gender}
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
                                            Location
                                        </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="tile-label">
                                            {listing.location}
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
                                            Rent (monthly):
                                        </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="tile-label">
                                            ${listing.rent}/month
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
                                            Utilities (monthly):
                                        </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="tile-label">
                                            ${listing.utilities}/month
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
                                            Lease Length (months):
                                        </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="tile-label">
                                            {listing.lease_length} months
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
                                            Dersired Start Date:
                                        </h3>
                                    </Col>
                                    <Col>
                                        <h3 className="tile-label">
                                            {listing.start_date.substring(
                                                0,
                                                10
                                            )}
                                        </h3>
                                    </Col>
                                </Row>
                            </Col>
                            {/* Amenities and Appliances */}
                            <Col flex={6} style={{ margin: "0px 20px" }}>
                                <Row style={{ margin: "20px 0px" }}>
                                    <h2>Amenities and Appliances:</h2>
                                </Row>
                                <Divider />
                                <Row
                                    align="start"
                                    justify="space-between"
                                    style={{ margin: "10px 0 10px 10px" }}
                                >
                                    <Col>
                                        <h3 style={{ color: "#302C33" }}>
                                            Amenities
                                        </h3>
                                    </Col>
                                    <Col>
                                        <Row
                                            wrap={true}
                                            style={{ maxWidth: "200px" }}
                                        >
                                            <h3 className="tile-label">
                                                {listing.amenities === ""
                                                    ? "None Listed"
                                                    : listing.amenities}
                                            </h3>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row
                                    align="start"
                                    justify="space-between"
                                    style={{ margin: "10px 0 10px 10px" }}
                                >
                                    <Col>
                                        <h3 style={{ color: "#302C33" }}>
                                            Appliances
                                        </h3>
                                    </Col>
                                    <Col>
                                        <Row
                                            wrap={true}
                                            style={{ maxWidth: "200px" }}
                                        >
                                            <h3 className="tile-label">
                                                {listing.appliances === ""
                                                    ? "None Listed"
                                                    : listing.appliances}
                                            </h3>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        {/* Preferences */}
                        <Row style={{ margin: "20px 0px" }}>
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
                                    Other Preferences:
                                </h3>
                            </Col>
                            <Col>
                                <Row wrap={true} style={{ maxWidth: "200px" }}>
                                    <h3 className="tile-label">
                                        {listing.other_preferences === ""
                                            ? "None Listed"
                                            : listing.other_preferences}
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
                                        {listing.deal_breakers === ""
                                            ? "None Listed"
                                            : listing.deal_breakers}
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

export default Listing;
