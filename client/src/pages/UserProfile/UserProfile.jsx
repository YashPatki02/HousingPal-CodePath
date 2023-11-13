import React, { useEffect, useState } from "react";
import LeaseTile from "../../components/LeaseTile";
import TeneeTile from "../../components/TeneeTile";

const UserProfile = ({ user }) => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [teneePosts, setTeneePosts] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/leases/user/${user.id}/`
                );
                const data = await response.json();
                setListings(data);
            } catch (error) {
                console.error("Error fetching listings: ", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchPosts = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/tenees/user/${user.id}/`
                );
                const data = await response.json();
                setTeneePosts(data);
            } catch (error) {
                console.error("Error fetching posts: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
        fetchPosts();
    }, [user.id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {user.avatarurl && (
                <img
                    src={user.avatarurl}
                    alt="User avatar"
                    style={{ width: "100px" }}
                />
            )}
            <h2>Welcome to your user profile, {user.username}!</h2>
            <h3>Your Lease Listings:</h3>

            {listings.length === 0 ? (
                <p>No lease listings found.</p>
            ) : (
                <div>
                    {listings.map((listing) => (
                        <LeaseTile
                            key={listing.id}
                            listing={listing}
                            user={user}
                        />
                    ))}
                </div>
            )}
            
            <br />
            <h3>Your Tenee Posts:</h3>
            {teneePosts.length === 0 ? (
                <p>No tenee posts found.</p>
            ) : (
                <div>
                    {teneePosts.map((post) => (
                        <TeneeTile key={post.id} tenee={post} user={user}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserProfile;
