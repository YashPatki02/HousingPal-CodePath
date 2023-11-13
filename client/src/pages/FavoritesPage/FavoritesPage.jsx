import React, { useState, useEffect } from "react";
import LeaseTile from "../../components/LeaseTile";
import TeneeTile from "../../components/TeneeTile";

const FavoritesPage = ({ user }) => {
    const [leases, setLeases] = useState([]);
    const [tenees, setTenees] = useState([]);

    useEffect(() => {
        const fetchLeases = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/favorites_leases/${user.id}`
                );
                const data = await response.json();
                setLeases(data);
            } catch (error) {
                console.error("Error fetching favorites: ", error);
            }
        };

        const fetchTenees = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/favorites_tenees/${user.id}`
                );
                const data = await response.json();
                setTenees(data);
            } catch (error) {
                console.error("Error fetching favorites: ", error);
            }
        };

        fetchLeases();
        fetchTenees();
    }, []);

    const checkFavoritedLease = (id) => {
        return (
            leases.filter(
                (leases) =>
                    leases.listing_id === id && leases.user_id === user.id
            ).length > 0
        );
    };

    const favoriteLease = async (id) => {
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

            setLeases([...leases, { user_id: user.id, listing_id: id }]);
        } catch (error) {
            console.error("Error favoriting listing: ", error);
        }
    };

    const unFavoriteLease = async (id) => {
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

            setLeases(leases.filter((favLease) => favLease.listing_id !== id));
        } catch (error) {
            console.error("Error unfavoriting listing: ", error);
        }
    };

    const checkFavoritedTenee = (id) => {
        return (
            tenees.filter(
                (tenees) =>
                    tenees.tenees_id === id && tenees.user_id === user.id
            ).length > 0
        );
    };

    const favoriteTenee = async (id) => {
        try {
            await fetch(`http://localhost:3001/api/favorites_tenees`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    teneesId: id,
                }),
            });

            setTenees([...tenees, { user_id: user.id, tenees_id: id }]);
        } catch (error) {
            console.error("Error favoriting tenee: ", error);
        }
    };

    const unFavoriteTenee = async (id) => {
        try {
            await fetch(`http://localhost:3001/api/favorites_tenees/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    teneesId: id,
                }),
            });

            setTenees(tenees.filter((favTenee) => favTenee.tenees_id !== id));
        } catch (error) {
            console.error("Error unfavoriting tenee: ", error);
        }
    };

    console.log(tenees);

    return (
        <div>
            <h1>Favorited Leases </h1>
            {leases.length === 0 ? (
                <h3>No Favorited Leases</h3>
            ) : (
                leases.map((lease) => (
                    <LeaseTile
                        key={lease.id}
                        listing={lease}
                        lease={lease}
                        user={user}
                        favorited={checkFavoritedLease(lease.listing_id)}
                        favorite={favoriteLease}
                        unFavorite={unFavoriteLease}
                    />
                ))
            )}
            <br />
            <h1>Favorited Tenees </h1>
            {tenees.length === 0 ? (
                <h3>No Favorited Tenees</h3>
            ) : (
                tenees.map((tenee) => (
                    <TeneeTile
                        key={tenee.id}
                        tenee={tenee}
                        post={tenee}
                        user={user}
                        favorited={checkFavoritedTenee(tenee.tenees_id)}
                        favorite={favoriteTenee}
                        unFavorite={unFavoriteTenee}
                    />
                ))
            )}
        </div>
    );
};

export default FavoritesPage;
