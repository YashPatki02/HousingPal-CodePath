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
                <span className="post-header-username">{user.username}</span>
            </Col>
        </Row>
    );
}

export default PostHeader;
