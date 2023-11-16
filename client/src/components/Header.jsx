import React from "react";
import { Row, Col, Menu } from "antd";
import {
    HomeOutlined,
    TeamOutlined,
    StarOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

const Header = ({ logout, user }) => {
    const navigate = useNavigate();

    const { id } = user;

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <>
            <Row
                align="middle"
                justify="space-between"
                style={{
                    height: "80px",
                    padding: "0 20px",
                    borderBottom: "1px solid #B6ADBC",
                }}
            >
                <Col style={{ color: "#9511ED" }}>
                    <h2 className="logo">HousingPal</h2>
                </Col>
                <Col span={12} justify="end" align="middle">
                    <Menu
                        mode="horizontal"
                        defaultSelectedKeys={["1"]}
                        style={{
                            border: "none",
                            display: "flex",
                            justifyContent: "end",
                            width: "100%",
                            backgroundColor: "transparent",
                            color: "#9511ED",
                            itemSelectedColor: "#302C33",
                        }}
                    >
                        <Menu.Item
                            key="1"
                            icon={<HomeOutlined />}
                            onClick={() => {
                                navigateTo("/");
                            }}
                        >
                            Leases
                        </Menu.Item>
                        <Menu.Item
                            key="2"
                            icon={<TeamOutlined />}
                            onClick={() => {
                                navigateTo("/tenees");
                            }}
                        >
                            Tenees
                        </Menu.Item>
                        <Menu.Item
                            key="3"
                            icon={<StarOutlined />}
                            onClick={() => {
                                navigateTo(`user/favorites/${id}`);
                            }}
                        >
                            Favorites
                        </Menu.Item>
                        <Menu.Item
                            key="4"
                            icon={<UserOutlined />}
                            onClick={() => {
                                navigateTo("/user/0");
                            }}
                        >
                            Profile
                        </Menu.Item>
                        <Menu.Item key="5" onClick={logout}>
                            Logout
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </>
    );
};

export default Header;
