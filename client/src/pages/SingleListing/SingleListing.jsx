// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router";

// const Listing = ({ user }) => {
//     const { id } = useParams();
//     const [listing, setListing] = useState(null);
//     const [isOwner, setIsOwner] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchListing = async () => {
//             try {
//                 const response = await fetch(
//                     `http://localhost:3001/api/leases/${id}`
//                 );
//                 const data = await response.json();
//                 setListing(data);
//             } catch (error) {
//                 console.error("Error fetching listing: ", error);
//             }
//         };

//         fetchListing();
//     }, [id]);

//     useEffect(() => {
//         if (listing) {
//             setIsOwner(listing.user_id === user.id);
//         }
//     }, [listing]);


//     const deleteListing = (id) => async () => {
//         try {
//             const response = await fetch(
//                 `http://localhost:3001/api/leases/${id}`,
//                 {
//                     method: "DELETE",
//                 }
//             );
//             const data = await response.json();
//         } catch (error) {
//             console.error("Error deleting listing: ", error);
//         } finally {
//             navigate("/");
//         }
//     };

//     return (
//         <div>
//             <h2>Listing</h2>

//             <div className="lease-tile">
//                 <h2>{listing && listing.listing_type} Listing</h2>
//                 <p>Tenants: {listing && listing.tenant_names}</p>
//                 <p>Room Setup: {listing && listing.room_setup}</p>
//                 <p>Appliances: {listing && listing.appliances}</p>
//                 <p>Amenities: {listing && listing.amenities}</p>
//                 <p>Preference Gender: {listing && listing.preference_gender}</p>
//                 <p>Other Preferences: {listing && listing.other_preferences}</p>
//                 <p>Deal Breakers: {listing && listing.deal_breakers}</p>
//                 <p>Location: {listing && listing.location}</p>
//                 <p>Rent: ${listing && listing.rent}/month</p>
//                 <p>
//                     Utilities: $
//                     {listing && listing.utilities ? listing.utilities : "N/A"}
//                     /month
//                 </p>
//                 <p>Lease Length: {listing && listing.lease_length} months</p>
//                 <p>Start Date: {listing && listing.start_date}</p>
//                 <p>Contact Info: {listing && listing.contact_info}</p>
//                 <p>Posted By: {listing && listing.user_id}</p>
//                 <p>University: {listing && listing.university}</p>
//             </div>

//             {isOwner && (
//                 <>
//                     <button onClick={() => navigate(`/listing/edit/${id}`)}>
//                         Edit Listing
//                     </button>
//                     <button onClick={() => deleteListing(id)}>
//                         Delete Listing
//                     </button>
//                 </>
//             )}
//         </div>
//     );
// };

// export default Listing;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Card, Result, Space, Spin, Row, Col } from "antd";

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
            }
        };

        fetchListing();
    }, [id]);

    useEffect(() => {
        if (listing) {
            setIsOwner(listing.user_id === user.id);
        }
    }, [listing]);

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

    return (
        <div>
            <h2>Listing</h2>

            {loading && <Spin size="large" />}

            {!loading && listing ? (
                <Card title={listing.listing_type} bordered={false}>
                    <Space direction="vertical" size={20}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <h3>Tenants:</h3>
                                <p>{listing.tenant_names}</p>
                            </Col>
                            <Col span={8}>
                                <h3>Room Setup:</h3>
                                <p>{listing.room_setup}</p>
                            </Col>
                            <Col span={8}>
                                <h3>Appliances:</h3>
                                <p>{listing.appliances}</p>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={8}>
                                <h3>Amenities:</h3>
                                <p>{listing.amenities}</p>
                            </Col>
                            <Col span={8}>
                                <h3>Preference Gender:</h3>
                                <p>{listing.preference_gender}</p>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={8}>
                                <h3>Other Preferences:</h3>
                                <p>{listing.other_preferences}</p>
                            </Col>
                            <Col span={8}>
                                <h3>Deal Breakers:</h3>
                                <p>{listing.deal_breakers}</p>
                            </Col>
                            <Col span={8}>
                                <h3>Location:</h3>
                                <p>{listing.location}</p>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={8}>
                                <h3>Rent:</h3>
                                <p>${listing.rent}/month</p>
                            </Col>
                            <Col span={8}>
                                <h3>Utilities:</h3>
                                <p>
                                    $
                                    {listing.utilities
                                        ? listing.utilities
                                        : "N/A"}
                                    /month
                                </p>
                            </Col>
                            <Col span={8}>
                                <h3>Lease Length:</h3>
                                <p>{listing.lease_length} months</p>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={8}>
                                <h3>Start Date:</h3>
                                <p>{listing.start_date}</p>
                            </Col>
                            <Col span={8}>
                                <h3>Contact Info:</h3>
                                <p>{listing.contact_info}</p>
                            </Col>
                            <Col span={8}>
                                <h3>Posted By:</h3>
                                <p>{listing.user_id}</p>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={8}>
                                <h3>University:</h3>
                                <p>{listing.university}</p>
                            </Col>
                        </Row>

                        {isOwner && (
                            <div>
                                <Button
                                    type="primary"
                                    onClick={() =>
                                        navigate(`/listing/edit/${id}`)
                                    }
                                >
                                    Edit Listing
                                </Button>
                                <Button
                                    type="danger"
                                    onClick={() => deleteListing(id)}
                                >
                                    Delete Listing
                                </Button>
                            </div>
                        )}
                    </Space>
                </Card>
            ) : (
                <Result
                    status="404"
                    title="Listing Not Found"
                    subTitle="Sorry, the listing you are looking for does not exist."
                    extra={
                        <Button type="primary" onClick={() => navigate("/")}>
                            Back to Home
                        </Button>
                    }
                />
            )}
        </div>
    );
};

export default Listing;

