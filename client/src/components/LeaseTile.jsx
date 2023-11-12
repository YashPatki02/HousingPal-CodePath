import React from "react";
import { useNavigate } from "react-router";

const LeaseTile = ({ listing, user }) => {
    const navigate = useNavigate();
    const {
        id,
        listing_type,
        tenant_names,
        room_setup,
        appliances,
        amenities,
        preference_gender,
        preference_age,
        other_preferences,
        deal_breakers,
        location,
        rent,
        utilities,
        lease_length,
        start_date,
        pictures,
    } = listing;

    const goToListing = (id) => () => {
        navigate(`/listing/${id}`);
    };

    const favorite = (id) => async () => {
        console.log(`Favorite listing with id ${id}`);
        console.log(`favorited by user with id ${user.id}`);

        const response = await fetch(
            `http://localhost:3001/api/favorites_leases`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    listingId: id,
                }),
            }
        );
        const data = await response.json();
    };

    return (
        <div className="lease-tile">
            <h2>{listing_type} Listing</h2>
            <button onClick={goToListing(id)}>View Listing Details</button>
            <button onClick={favorite(id)}>Favorite Listing</button>
            <p>Tenants: {tenant_names}</p>
            <p>Room Setup: {room_setup}</p>
            <p>Appliances: {appliances}</p>
            <p>Amenities: {amenities}</p>
            <p>Preference Gender: {preference_gender}</p>
            <p>Preference Age: {preference_age}</p>
            <p>Other Preferences: {other_preferences}</p>
            <p>Deal Breakers: {deal_breakers}</p>
            <p>Location: {location}</p>
            <p>Rent: ${rent}/month</p>
            <p>Utilities: ${utilities ? utilities : "N/A"}/month</p>
            <p>Lease Length: {lease_length} months</p>
            <p>Start Date: {start_date}</p>
            {/* You can display images here */}
            {pictures && pictures.length > 0 && (
                <div>
                    <p>Images:</p>
                    <div className="image-container">
                        {pictures.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Image ${index}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaseTile;
