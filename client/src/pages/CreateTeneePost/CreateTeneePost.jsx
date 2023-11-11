import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TeneesAPI from "../../services/tenees.js";

const CreateTeneePost = ({ user, api_url }) => {
    const initialValues = {
        gender: "",
        age: "",
        bio: "",
        hobbies_interests: "",
        preferences: "",
        deal_breakers: "",
        budget_min: "",
        budget_max: "",
    };

    const validationSchema = Yup.object({
        gender: Yup.string().required("Required"),
        age: Yup.number().required("Required"),
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
            user_id: parseInt(user.id),
            picture: user.avatarurl,
            ...values,
        };

        console.log(credentials);

        const response = await TeneesAPI.createTeneesProfile(credentials);
        console.log(response);

        formik.resetForm();
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    return (
        <div>
            <h2>Create a Tenee Profile</h2>
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
                        type="text"
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

export default CreateTeneePost;
