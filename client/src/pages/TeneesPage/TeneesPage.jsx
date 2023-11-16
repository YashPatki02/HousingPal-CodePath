import React, { useEffect, useState } from "react";
import TeneesAPI from "../../services/tenees.js";
import TeneeTile from "../../components/TeneeTile.jsx";
import { Link } from "react-router-dom";
import { Button, Select, InputNumber, Form, Row, Col, Divider } from "antd";

const { Option } = Select;

const TeneesPage = ({ api_url, user }) => {
    const [allTenees, setAllTenees] = useState([]);
    const [filteredTenees, setFilteredTenees] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [filterForm] = Form.useForm();

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await TeneesAPI.getAllTeneesProfiles();
                setAllTenees(response);
                setFilteredTenees(response);
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

    const handleFilterChange = (values) => {
        const filters = filterForm.getFieldsValue();
        const filtered = applyFilters(allTenees, filters);
        setFilteredTenees(filtered);
    };

    const applyFilters = (tenees, filters) => {
        return tenees.filter((tenee) => {
            return (
                (!filters.gender || tenee.gender === filters.gender) &&
                (!filters.age_min || tenee.age >= filters.age_min) &&
                (!filters.age_max || tenee.age <= filters.age_max) &&
                (!filters.rent_min || tenee.budget_max >= filters.rent_min) &&
                (!filters.rent_max || tenee.budget_min <= filters.rent_max)
            );
        });
    };

    const resetFilters = () => {
        filterForm.resetFields();
        setFilteredTenees(allTenees);
    };

    return (
        <div>
            <Row
                align="middle"
                justify="space-around"
                style={{ margin: "40px 0" }}
            >
                <Col>
                    <h1 style={{ color: "#302C33" }}>Tenees Posts</h1>
                </Col>
                <Col>
                    <Button className="button" type="none">
                        <Link to="/tenee/create">CREATE POST</Link>
                    </Button>
                </Col>
            </Row>
            <Divider />

            <Row align="middle" justify="center">
                <Col>
                    <h2 style={{ color: "#6A4087" }}>Filter Posts:</h2>
                    <Form
                        form={filterForm}
                        layout="inline"
                        onFinish={handleFilterChange}
                        style={{ margin: "20px 0px" }}
                    >
                        <Form.Item name="gender" label="Gender">
                            <Select style={{ width: 120 }}>
                                <Option value="Male">Male</Option>
                                <Option value="Female">Female</Option>
                                <Option value="Non-Binary">Non-Binary</Option>
                                <Option value="Other">Other</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="age_min" label="Min Age">
                            <InputNumber />
                        </Form.Item>
                        <Form.Item name="age_max" label="Max Age">
                            <InputNumber />
                        </Form.Item>
                        <Form.Item name="rent_min" label="Min Rent">
                            <InputNumber />
                        </Form.Item>
                        <Form.Item name="rent_max" label="Max Rent">
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

            <Row
                justify="center"
                align="middle"
                style={{ marginBottom: "40px" }}
            >
                <Col span={22}>
                    <Row wrap={true} justify="center" align="middle">
                        {filteredTenees.map((post) => (
                            <TeneeTile
                                key={post.id}
                                tenee={post}
                                user={user}
                                favorited={checkFavorited(post.id)}
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

export default TeneesPage;
