import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import { Row, Col } from "antd";

const TeneeEdit = ({ user }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tenee, setTenee] = useState({
        name: "",
        gender: "",
        age: 0,
        bio: "",
        hobbies_interests: "",
        preferences: "",
        deal_breakers: "",
        budget_min: 0,
        budget_max: 0,
        contact_info: "",
        university: "",
        user_id: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTenee = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/tenees/${id}`
                );
                const responseJson = await response.json();
                setTenee(responseJson);
            } catch (error) {
                console.error("Error fetching tenee: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTenee();
    }, [id]);

    useEffect(() => {
        if (loading) {
            return;
        }
        if (tenee.user_id === undefined || tenee.user_id !== user.id) {
            navigate("/");
        }
    }, [id, user.id, navigate]);

    const initialValues = {
        gender: "",
        age: 0,
        bio: "",
        hobbies_interests: "",
        preferences: "",
        deal_breakers: "",
        budget_min: 0,
        budget_max: 0,
        contact_info: "",
        university: "",
    };

    const validationSchema = Yup.object({
        gender: Yup.string().required("Required"),
        age: Yup.number().required("Required").min(1),
        bio: Yup.string(),
        hobbies_interests: Yup.string(),
        preferences: Yup.string(),
        deal_breakers: Yup.string(),
        budget_min: Yup.number().required("Required").min(1),
        budget_max: Yup.number().required("Required").min(1),
        contact_info: Yup.string().required("Required"),
        university: Yup.string().required("Required"),
    });

    const onSubmit = async (values) => {
        if (values.budget_min > values.budget_max) {
            let temp = values.budget_min;
            values.budget_min = values.budget_max;
            values.budget_max = temp;
        }

        const credentials = {
            id: parseInt(id),
            ...values,
        };

        try {
            const response = await fetch(
                `http://localhost:3001/api/tenees/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials),
                }
            );

            const responseJson = await response.json();

            navigate(`/tenee/${id}`);
        } catch (error) {
            console.error("Error updating tenee: ", error);
        }
    };

    const formik = useFormik({
        initialValues: tenee !== null ? tenee : initialValues,
        onSubmit,
        validationSchema,
        enableReinitialize: true,
    });

    if (loading) {
        return <p>Loading...</p>;
    }
    if (!tenee) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <Row justify="center" align="middle" style={{ margin: "40px 0px" }}>
                <h2>Edit Tenee Profile</h2>
            </Row>
            <Row justify="space-around" align="middle">
                <h3 style={{ color: "#6a4087" }}>
                    Tenants: {tenee.name} | Listing Type:{" "}
                </h3>
            </Row>
            <Row justify="center" align="middle" style={{ margin: "40px 0px" }}>
                <Col span={10}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-container">
                            <label className="form-label" htmlFor="gender">
                                Gender: *
                            </label>
                            <select
                                className="form-select"
                                id="gender"
                                name="gender"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.gender}
                            >
                                <option value="">Select a Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-Binary">Non-Binary</option>
                                <option value="Other">Other</option>
                            </select>
                            {formik.touched.gender && formik.errors.gender ? (
                                <div className="error-message">
                                    {formik.errors.gender}
                                </div>
                            ) : null}
                        </div>
                        <div className="form-container">
                            <label className="form-label" htmlFor="age">
                                Age: *
                            </label>
                            <input
                                className="form-input"
                                type="number"
                                id="age"
                                name="age"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.age}
                            />
                            {formik.touched.age && formik.errors.age ? (
                                <div className="error-message">
                                    {formik.errors.age}
                                </div>
                            ) : null}
                        </div>
                        <div className="form-container">
                            <label className="form-label" htmlFor="bio">
                                Bio:
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                id="bio"
                                name="bio"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.bio}
                            />
                            {formik.touched.bio && formik.errors.bio ? (
                                <div className="error-message">
                                    {formik.errors.bio}
                                </div>
                            ) : null}
                        </div>
                        <div className="form-container">
                            <label
                                className="form-label"
                                htmlFor="hobbies_interests"
                            >
                                Hobbies/Interests:
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                id="hobbies_interests"
                                name="hobbies_interests"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.hobbies_interests}
                            />
                            {formik.touched.hobbies_interests &&
                            formik.errors.hobbies_interests ? (
                                <div className="error-message">
                                    {formik.errors.hobbies_interests}
                                </div>
                            ) : null}
                        </div>
                        <div className="form-container">
                            <label className="form-label" htmlFor="preferences">
                                Preferences:
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                id="preferences"
                                name="preferences"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.preferences}
                            />
                            {formik.touched.preferences &&
                            formik.errors.preferences ? (
                                <div className="error-message">
                                    {formik.errors.preferences}
                                </div>
                            ) : null}
                        </div>
                        <div className="form-container">
                            <label
                                className="form-label"
                                htmlFor="deal_breakers"
                            >
                                Deal Breakers:
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                id="deal_breakers"
                                name="deal_breakers"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.deal_breakers}
                            />
                            {formik.touched.deal_breakers &&
                            formik.errors.deal_breakers ? (
                                <div className="error-message">
                                    {formik.errors.deal_breakers}
                                </div>
                            ) : null}
                        </div>
                        <div className="form-container">
                            <label className="form-label" htmlFor="budget_min">
                                Minimum Budget (monthly): *
                            </label>
                            <input
                                className="form-input"
                                type="number"
                                id="budget_min"
                                name="budget_min"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.budget_min}
                            />
                            {formik.touched.budget_min &&
                            formik.errors.budget_min ? (
                                <div className="error-message">
                                    {formik.errors.budget_min}
                                </div>
                            ) : null}
                        </div>
                        <div className="form-container">
                            <label className="form-label" htmlFor="budget_max">
                                Maximum Budget (monthly): *
                            </label>
                            <input
                                className="form-input"
                                type="number"
                                id="budget_max"
                                name="budget_max"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.budget_max}
                            />
                            {formik.touched.budget_max &&
                            formik.errors.budget_max ? (
                                <div className="error-message">
                                    {formik.errors.budget_max}
                                </div>
                            ) : null}
                        </div>
                        <div className="form-container">
                            <label
                                className="form-label"
                                htmlFor="contact_info"
                            >
                                Contact Info: *
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                id="contact_info"
                                name="contact_info"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.contact_info}
                            />
                            {formik.touched.contact_info &&
                            formik.errors.contact_info ? (
                                <div className="error-message">
                                    {formik.errors.contact_info}
                                </div>
                            ) : null}
                        </div>
                        <div className="form-container">
                            <label className="form-label" htmlFor="university">
                                University: *
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                id="university"
                                name="university"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.university}
                            />
                            {formik.touched.university &&
                            formik.errors.university ? (
                                <div className="error-message">
                                    {formik.errors.university}
                                </div>
                            ) : null}
                        </div>
                        <Row align="middle" justify="center">
                            <button
                                style={{
                                    padding: "10px",
                                    marginTop: "20px",
                                    marginBottom: "80px",
                                }}
                                className="button"
                                type="submit"
                            >
                                Submit
                            </button>
                        </Row>
                    </form>
                </Col>
            </Row>
        </div>
    );
};

export default TeneeEdit;
