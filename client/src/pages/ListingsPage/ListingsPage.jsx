import React, { useEffect, useState } from "react";
import LeasesAPI from "../../services/leases.js";
import LeaseTile from "../../components/LeaseTile";
import { Link } from "react-router-dom";

const ListingsPage = ({ api_url }) => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await LeasesAPI.getAllLeaseListings();
                setListings(response);
            } catch (error) {
                console.error("Error fetching listings: ", error);
            }
        };

        fetchListings();
    }, []);
    
    return (
        <div>
            <h2>Welcome to the Listings Page!</h2>
            <div>
                {listings.map((listing) => (
                    <LeaseTile key={listing.id} listing={listing} />
                ))}
            </div>
            <Link to="/listing/create">Create Listing</Link>
        </div>
    );
};

export default ListingsPage;
