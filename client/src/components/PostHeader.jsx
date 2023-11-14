import React from "react";
import "./Component.css";
import { Row, Col } from "antd";

function PostHeader({ user }) {
    return (
        <Row className="post-header">
            <Col span={12}>
                <img
                    src={user.avatarurl}
                    alt={user.username}
                    className="post-header-avatar"
                />
                <p className="post-header-username">{user.username}</p>
            </Col>
        </Row>
    );
}

export default PostHeader;
