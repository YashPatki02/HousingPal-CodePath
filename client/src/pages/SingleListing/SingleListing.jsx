import React, { useEffect, useState } from "react";
import LeaseTile from "../../components/LeaseTile";
import { useNavigate, useParams } from "react-router";

const Listing = ({ user }) => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/leases/${id}`
                );
                const data = await response.json();
                setListing(data);
            } catch (error) {
                console.error("Error fetching listings: ", error);
            }
        };

        fetchListing();
    }, [id]);

    const deleteListing = (id) => async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/leases/${id}`, {
                method: "DELETE",
            });

            console.log(response);
            const data = await response.json();
            console.log(data);

            
        } catch (error) {
            console.error("Error deleting listing: ", error);
        } finally {
            navigate("/");
        }
    };

    return (
        <div>
            <h2>Listings</h2>

            <div className="lease-tile">
                <h2>{listing && listing.listing_type} Listing</h2>
                <p>Tenants: {listing && listing.tenant_names}</p>
                <p>Room Setup: {listing && listing.room_setup}</p>
                <p>Appliances: {listing && listing.appliances}</p>
                <p>Amenities: {listing && listing.amenities}</p>
                <p>Preference Gender: {listing && listing.preference_gender}</p>
                <p>Preference Age: {listing && listing.preference_age}</p>
                <p>Other Preferences: {listing && listing.other_preferences}</p>
                <p>Deal Breakers: {listing && listing.deal_breakers}</p>
                <p>Location: {listing && listing.location}</p>
                <p>Rent: ${listing && listing.rent}/month</p>
                <p>
                    Utilities: $
                    {listing && listing.utilities ? listing.utilities : "N/A"}
                    /month
                </p>
                <p>Lease Length: {listing && listing.lease_length} months</p>
                <p>Start Date: {listing && listing.start_date}</p>
                {/* Display images here if available */}
                {listing && listing.pictures && listing.pictures.length > 0 && (
                    <div>
                        <p>Images:</p>
                        <div className="image-container">
                            {listing.pictures.map((image, index) => (
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

            <button onClick={() => navigate(`/listing/edit/${id}`)}>
                Edit Listing
            </button>
            <button
                onClick={deleteListing(id)}
            >
                Delete Listing
            </button>
        </div>
    );
};

export default Listing;
