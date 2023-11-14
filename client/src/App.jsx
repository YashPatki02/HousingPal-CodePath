import React, { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";

import ListingsPage from "./pages/ListingsPage/ListingsPage";
import Listing from "./pages/SingleListing/SingleListing";
import TeneesPage from "./pages/TeneesPage/TeneesPage";
import Tenee from "./pages/Tenee/Tenee";
import UserProfile from "./pages/UserProfile/UserProfile";
import Login from "./pages/Login/Login";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import CreateListing from "./pages/CreateListing/CreateListing";
import CreateTeneePost from "./pages/CreateTeneePost/CreateTeneePost";
import ListingEdit from "./pages/ListingEdit/ListingEdit";
import TeneeEdit from "./pages/TeneeEdit/TeneeEdit";

import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";

function App() {
    const API_URL = "http://localhost:3001";

    const [user, setUser] = useState({
        id: 1,
        githubId: "68520117",
        username: "YashPatki02",
        avatarurl: "https://avatars.githubusercontent.com/u/68520117?v=4",
        accesstoken: "gho_16YJZz2Z4ZQZ4ZQZ4ZQZ4ZQZ4ZQZ4ZQZ4ZQZ",
    });

    // const [user, setUser] = useState([]);

    // useEffect(() => {
    //     const getUser = async () => {
    //         const response = await fetch(
    //             `http://localhost:3001/auth/login/success`,
    //             {
    //                 credentials: "include",
    //             }
    //         );

    //         const json = await response.json();
    //         setUser(json.user);
    //         console.log(user)
    //     };

    //     getUser();
    // }, [API_URL]);

    const logout = async () => {
        const url = `${API_URL}/auth/logout`;
        const response = await fetch(url, { credentials: "include" });
        const json = await response.json();
        window.location.href = "/";
    };

    let element = useRoutes([
        {
            path: "/",
            element:
                user && user.id ? (
                    <ListingsPage api_url={API_URL} user={user} />
                ) : (
                    <Login api_url={API_URL} />
                ),
        },
        {
            path: "/listing/:id",
            element:
                user && user.id ? (
                    <Listing api_url={API_URL} user={user} />
                ) : (
                    <Login api_url={API_URL} />
                ),
        },
        {
            path: "/listing/create",
            element:
                user && user.id ? (
                    <CreateListing api_url={API_URL} user={user} />
                ) : (
                    <Login api_url={API_URL} />
                ),
        },
        {
            path: "/tenees",
            element:
                user && user.id ? (
                    <TeneesPage api_url={API_URL} user={user} />
                ) : (
                    <Login api_url={API_URL} />
                ),
        },
        {
            path: "/tenee/:id",
            element:
                user && user.id ? (
                    <Tenee api_url={API_URL} user={user} />
                ) : (
                    <Login api_url={API_URL} />
                ),
        },
        {
            path: "/tenee/create",
            element:
                user && user.id ? (
                    <CreateTeneePost api_url={API_URL} user={user} />
                ) : (
                    <Login api_url={API_URL} />
                ),
        },
        {
            path: "/listing/edit/:id",
            element:
                user && user.id ? (
                    <ListingEdit api_url={API_URL} user={user} />
                ) : (
                    <Login api_url={API_URL} />
                ),
        },
        {
            path: "/tenee/edit/:id",
            element:
                user && user.id ? (
                    <TeneeEdit api_url={API_URL} user={user} />
                ) : (
                    <Login api_url={API_URL} />
                ),
        },
        {
            path: "/user/:id",
            element:
                user && user.id ? (
                    <UserProfile api_url={API_URL} user={user} />
                ) : (
                    <Login api_url={API_URL} />
                ),
        },
        {
            path: "user/favorites/:id",
            element:
                user && user.id ? (
                    <FavoritesPage api_url={API_URL} user={user} />
                ) : (
                    <Login api_url={API_URL} />
                ),
        },
    ]);

    return (
        <div className="App">
            {user && user.id ? (
                <div className="loggedin">
                    <Header logout={logout} user={user} />
                </div>
            ) : (
                <></>
            )}
            {element}
        </div>
    );
}

export default App;
