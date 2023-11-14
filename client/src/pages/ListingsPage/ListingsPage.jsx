import React, { useEffect, useState } from "react";
import LeasesAPI from "../../services/leases.js";
import LeaseTile from "../../components/LeaseTile";
import { Link } from "react-router-dom";
import { Button, Select, InputNumber, Form } from "antd";

const { Option } = Select;

const ListingsPage = ({ api_url, user }) => {
    const [allListings, setAllListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [filterForm] = Form.useForm();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await LeasesAPI.getAllLeaseListings();
                setAllListings(response);
                setFilteredListings(response);
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

    const handleFilterChange = () => {
        const filters = filterForm.getFieldsValue();

        const filtered = applyFilters(allListings, filters);
        setFilteredListings(filtered);
    };

    const applyFilters = (listings, filters) => {
        return listings.filter((listing) => {
            return (
                (!filters.listing_type ||
                    listing.listing_type === filters.listing_type) &&
                (!filters.room_setup ||
                    listing.room_setup === filters.room_setup) &&
                (!filters.gender_preference ||
                    listing.preference_gender === filters.gender_preference) &&
                (!filters.rent || listing.rent <= filters.rent)
            );
        });
    };

    const resetFilters = () => {
        filterForm.resetFields();
        setFilteredListings(allListings);
    };

    return (
        <div>
            <h2>Welcome to the Listings Page!</h2>
            <Button>
                <Link to="/listing/create">Create Listing</Link>
            </Button>
            <Form
                form={filterForm}
                layout="inline"
                onFinish={handleFilterChange}
            >
                <Form.Item name="listing_type" label="Listing Type">
                    <Select style={{ width: 120 }}>
                        <Option value="Lease">Lease</Option>
                        <Option value="Sublease">Sublease</Option>
                        <Option value="Other">Other</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="room_setup" label="Room Setup">
                    <Select style={{ width: 120 }}>
                        <Option value="Single">Single</Option>
                        <Option value="Double">Double</Option>
                        <Option value="Other">Other</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="gender_preference" label="Gender Preference">
                    <Select style={{ width: 120 }}>
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="Non-Binary">Non-Binary</Option>
                        <Option value="Other">Other</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="rent" label="Desired Rent">
                    <InputNumber />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Apply Filters
                    </Button>
                    <Button onClick={resetFilters}>
                        Reset Filters
                    </Button>
                </Form.Item>
            </Form>
            <div>
                {filteredListings.map((listing) => (
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
