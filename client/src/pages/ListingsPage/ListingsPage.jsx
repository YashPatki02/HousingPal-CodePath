import React, { useEffect, useState } from "react";
import LeasesAPI from "../../services/leases.js";
import LeaseTile from "../../components/LeaseTile";
import { Link } from "react-router-dom";
import { Button } from "antd";

const ListingsPage = ({ api_url, user }) => {
    const [listings, setListings] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await LeasesAPI.getAllLeaseListings();
                setListings(response);
            } catch (error) {
                console.error("Error fetching listings: ", error);
            }
        };

        const fetchFavoriteLeases = async () => {
            try {
                const response = await fetch(
                    `${api_url}/api/favorites_leases/${user.id}`
                );
                const data = await response.json();
                setFavorites(data);
            } catch (error) {
                console.error("Error fetching favorites: ", error);
            }
        };

        fetchListings();
        fetchFavoriteLeases();
    }, []);

    const checkFavorited = (id) => {
        return (
            favorites.filter(
                (favorite) =>
                    favorite.listing_id === id && favorite.user_id === user.id
            ).length > 0
        );
    };

    const favorite = async (id) => {
        try {
            await fetch(`http://localhost:3001/api/favorites_leases`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    listingId: id,
                }),
            });

            setFavorites([...favorites, { user_id: user.id, listing_id: id }]);
        } catch (error) {
            console.error("Error favoriting listing: ", error);
        }
    };

    const unFavorite = async (id) => {
        try {
            await fetch(`http://localhost:3001/api/favorites_leases/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    listingId: id,
                }),
            });

            setFavorites(favorites.filter((fav) => fav.listing_id !== id));
        } catch (error) {
            console.error("Error unfavoriting listing: ", error);
        }
    };

    return (
        <div>
            <h2>Welcome to the Listings Page!</h2>
            <Button>
                <Link to="/listing/create">Create Listing</Link>
            </Button>
            <div>
                {listings.map((listing) => (
                    <LeaseTile
                        key={listing.id}
                        listing={listing}
                        user={user}
                        favorited={checkFavorited(listing.id)}
                        favorite={favorite}
                        unFavorite={unFavorite}
                    />
                ))}
            </div>
        </div>
    );
};

export default ListingsPage;
