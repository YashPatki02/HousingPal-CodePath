import React from "react";
import "./Component.css";
import { Row } from "antd";

function PostHeader({ user }) {
    return (
        <Row className="post-header" align="middle">
            <img
                src={user.avatarurl}
                alt={user.username}
                className="post-header-avatar"
            />
            <p className="post-header-username">{user.username}</p>
        </Row>
    );
}

export default PostHeader;
