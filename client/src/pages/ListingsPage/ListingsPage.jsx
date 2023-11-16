import React, { useEffect, useState } from "react";
import LeasesAPI from "../../services/leases.js";
import LeaseTile from "../../components/LeaseTile";
import { Link } from "react-router-dom";
import { Button, Select, InputNumber, Form, Row, Col, Divider } from "antd";

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
            <Row
                align="middle"
                justify="space-around"
                style={{
                    margin: "40px 0px",
                }}
            >
                <Col>
                    <h1 style={{ color: "#302C33" }}>Lease Listings</h1>
                </Col>
                <Col>
                    <Button className="button" type="none">
                        <Link to="/listing/create">CREATE LISTING</Link>
                    </Button>
                </Col>
            </Row>
            <Divider />
            <Row align="middle" justify="center">
                <Col>
                    <h2 style={{ color: "#6A4087" }}>Filter Listings:</h2>
                    <Form
                        form={filterForm}
                        layout="inline"
                        onFinish={handleFilterChange}
                        style={{ margin: "20px 0px" }}
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
                        <Form.Item
                            name="gender_preference"
                            label="Gender Preference"
                        >
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
                            <Button
                                type="none"
                                htmlType="submit"
                                className="button"
                            >
                                Apply Filters
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="none"
                                onClick={resetFilters}
                                className="button-inverse"
                            >
                                Reset Filters
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Divider />

            <Row justify="center" align="middle" style={{marginBottom: "40px"}}>
                <Col span={22}>
                    <Row wrap={true} justify="center" align="middle">
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
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default ListingsPage;
