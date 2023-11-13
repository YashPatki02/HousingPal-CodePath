import React, { useEffect, useState } from "react";
import TeneesAPI from "../../services/tenees.js";
import TeneeTile from "../../components/TeneeTile.jsx";
import { Link } from "react-router-dom";

const TeneesPage = ({ api_url, user }) => {
    const [tenees, setTenees] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await TeneesAPI.getAllTeneesProfiles();
                setTenees(response);
            } catch (error) {
                console.error("Error fetching tenees: ", error);
            }
        };

        const fetchFavoriteTenees = async () => {
            try {
                const response = await fetch(
                    `${api_url}/api/favorites_tenees/${user.id}`
                );
                const data = await response.json();
                setFavorites(data);
            } catch (error) {
                console.error("Error fetching favorites: ", error);
            }
        };

        fetchProfiles();
        fetchFavoriteTenees();
    }, []);

    const checkFavorited = (id) => {
        return (
            favorites.filter(
                (favorite) =>
                    favorite.tenees_id === id && favorite.user_id === user.id
            ).length > 0
        );
    };

    const favorite = async (id) => {
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

            setFavorites([...favorites, { user_id: user.id, tenees_id: id }]);
        } catch (error) {
            console.error("Error favoriting tenee: ", error);
        }
    };

    const unFavorite = async (id) => {
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

            setFavorites(favorites.filter((fav) => fav.tenees_id !== id));
        } catch (error) {
            console.error("Error unfavoriting tenee: ", error);
        }
    };

    return (
        <div>
            <h2>Welcome to the Tenees Page!</h2>
            <div>
                {tenees.map((post) => (
                    <TeneeTile
                        key={post.id}
                        tenee={post}
                        user={user}
                        favorited={checkFavorited(post.id)}
                        favorite={favorite}
                        unFavorite={unFavorite}
                    />
                ))}
            </div>
            <Link to="/tenee/create">Create Post</Link>
        </div>
    );
};

export default TeneesPage;
