import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import TeneeAPI from "../../services/tenees.js";

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
        picture: "",
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
        picture: "",
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
    });

    const onSubmit = async (values) => {
        console.log("Form data", values);

        const credentials = {
            id: parseInt(id),
            ...values,
        };

        console.log(credentials);

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

            navigate("/tenees");
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
            <h2>Edit Tenee Profile</h2>
            <h3>Tenee ID: {tenee.id}</h3>
            <h3>User ID: {tenee.user_id}</h3>
            <h3>Name: {tenee.name}</h3>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.gender}
                    >
                        <option value="">Select a Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender ? (
                        <div>{formik.errors.gender}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.age}
                    />
                    {formik.touched.age && formik.errors.age ? (
                        <div>{formik.errors.age}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="bio">Bio</label>
                    <input
                        type="text"
                        id="bio"
                        name="bio"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.bio}
                    />
                    {formik.touched.bio && formik.errors.bio ? (
                        <div>{formik.errors.bio}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="hobbies_interests">Hobbies/Interests</label>
                    <input
                        type="text"
                        id="hobbies_interests"
                        name="hobbies_interests"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.hobbies_interests}
                    />
                    {formik.touched.hobbies_interests &&
                    formik.errors.hobbies_interests ? (
                        <div>{formik.errors.hobbies_interests}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="preferences">Preferences</label>
                    <input
                        type="text"
                        id="preferences"
                        name="preferences"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.preferences}
                    />
                    {formik.touched.preferences && formik.errors.preferences ? (
                        <div>{formik.errors.preferences}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="deal_breakers">Deal Breakers</label>
                    <input
                        type="text"
                        id="deal_breakers"
                        name="deal_breakers"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.deal_breakers}
                    />
                    {formik.touched.deal_breakers &&
                    formik.errors.deal_breakers ? (
                        <div>{formik.errors.deal_breakers}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="budget_min">Minimum Budget</label>
                    <input
                        type="number"
                        id="budget_min"
                        name="budget_min"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.budget_min}
                    />
                    {formik.touched.budget_min && formik.errors.budget_min ? (
                        <div>{formik.errors.budget_min}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="budget_max">Maximum Budget</label>
                    <input
                        type="number"
                        id="budget_max"
                        name="budget_max"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.budget_max}
                    />
                    {formik.touched.budget_max && formik.errors.budget_max ? (
                        <div>{formik.errors.budget_max}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="picture">Profile Picture</label>
                    <input
                        type="file"
                        id="picture"
                        name="picture"
                        onChange={(event) => {
                            formik.setFieldValue(
                                "picture",
                                event.currentTarget.files[0]
                            );
                        }}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.picture && formik.errors.picture ? (
                        <div>{formik.errors.picture}</div>
                    ) : null}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default TeneeEdit;
