import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

function Footer({user}) {
    return (
        <footer style={{ backgroundColor: "#f0f2f5", padding: "40px 0" }}>
            <Row justify="space-between" align="middle">
                <Col span={8} align="middle">
                    <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                        HousingPal.
                    </p>
                </Col>
                <Col span={8} style={{ textAlign: "center" }}>
                    <p>
                        &copy; {new Date().getFullYear()} HousingPal. All Rights
                        Reserved.
                    </p>
                </Col>
                <Col span={8} align="middle">
                    <Row justify="center" align="middle">
                        <Link style={{ color: "#6a4087" }} to="/">
                            Leases
                        </Link>
                    </Row>
                    <Row justify="center" align="middle">
                        <Link style={{ color: "#6a4087" }} to="/tenees">
                            Tenees
                        </Link>
                    </Row>
                    <Row justify="center" align="middle">
                        <Link style={{ color: "#6a4087" }} to="/">
                            Home
                        </Link>
                    </Row>
                </Col>
            </Row>
        </footer>
    );
}

export default Footer;
