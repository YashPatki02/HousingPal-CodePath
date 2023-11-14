import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button, Card } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import PostHeader from "./PostHeader";
import "./Component.css";

const LeaseTile = ({
    listing,
    lease,
    user,
    favorited,
    favorite,
    unFavorite,
}) => {
    const navigate = useNavigate();
    const [leaseListing, setLeaseListing] = useState(listing);

    useEffect(() => {
        const getListing = async (id) => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/leases/${id}`
                );
                const data = await response.json();
                setLeaseListing(data);
            } catch (error) {
                console.error("Error fetching listing: ", error);
            }
        };

        // If leaseListing is null, fetch the listing
        if (!leaseListing.rent) {
            getListing(lease.listing_id);
        } else {
            // Otherwise, set the listing to the leaseListing
            return;
        }
    }, []);

    const {
        id,
        listing_type,
        tenant_names,
        room_setup,
        appliances,
        amenities,
        preference_gender,
        other_preferences,
        deal_breakers,
        location,
        rent,
        utilities,
        lease_length,
        start_date,
        contact_info,
        university,
        user_id,
    } = leaseListing;

    const goToListing = (id) => () => {
        navigate(`/listing/${id}`);
    };

    // const getUser = async (id) => {
    //     try {
    //         const response = await fetch(
    //             `http://localhost:3001/api/users/${id}`
    //         );
    //         const data = await response.json();
    //         return data;

    //         console.log("User: ", data);
    //     } catch (error) {
    //         console.error("Error fetching user: ", error);
    //     }
    // };

    return (
        <div className="lease-tile">
            <Card
                title={<PostHeader user={user} />}
                extra={
                    <>
                        <Button onClick={goToListing(id)}>
                            View Listing Details
                        </Button>
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
                <p>Listing Type: {listing_type}</p>
                <p>Tenants: {tenant_names}</p>
                <p>Room Setup: {room_setup}</p>
                <p>Preference Gender: {preference_gender}</p>
                <p>Rent: ${rent}/month</p>
                <p>Utilities: ${utilities ? utilities : "N/A"}/month</p>
                <p>Lease Length: {lease_length} months</p>
                <p>Start Date: {start_date}</p>
                <p>Contact Info: {contact_info}</p>
                <p>University: {university}</p>
            </Card>
        </div>
    );
};

export default LeaseTile;
