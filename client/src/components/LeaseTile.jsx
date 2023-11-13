import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

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
        preference_age,
        other_preferences,
        deal_breakers,
        location,
        rent,
        utilities,
        lease_length,
        start_date,
        pictures,
        user_id,
    } = leaseListing;

    const goToListing = (id) => () => {
        navigate(`/listing/${id}`);
    };

    return (
        <div className="lease-tile">
            <h2>{listing_type} Listing</h2>
            <button onClick={goToListing(id)}>View Listing Details</button>

            {user_id !== user.id &&
                (favorited ? (
                    <button onClick={() => unFavorite(id)}>
                        Unfavorite Listing
                    </button>
                ) : (
                    <button onClick={() => favorite(id)}>
                        Favorite Listing
                    </button>
                ))}

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
