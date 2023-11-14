import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import LeaseAPI from "../../services/leases.js";

const CreateListing = ({ user, api_url }) => {
    const navigate = useNavigate();

    const initialValues = {
        listing_type: "",
        tenant_names: "",
        room_setup: "",
        appliances: "",
        amenities: "",
        preference_gender: "",
        other_preferences: "",
        deal_breakers: "",
        location: "",
        rent: "",
        utilities: "",
        lease_length: "",
        start_date: "",
        contact_info: "",
        university: "",
    };

    const validationSchema = Yup.object({
        listing_type: Yup.string().required("Required"),
        tenant_names: Yup.string().required("Required"),
        room_setup: Yup.string().required("Required"),
        appliances: Yup.string(),
        amenities: Yup.string(),
        preference_gender: Yup.string().required("Required"),
        other_preferences: Yup.string(),
        deal_breakers: Yup.string(),
        location: Yup.string().required("Required"),
        rent: Yup.number().required("Required").min(1),
        utilities: Yup.number().min(0).required("Required").min(0),
        lease_length: Yup.string().required("Required"),
        start_date: Yup.date().required("Required"),
        contact_info: Yup.string().required("Required"),
        university: Yup.string().required("Required"),
    });

    const onSubmit = async (values) => {
        console.log("Form data", values);

        const credentials = {
            user_id: parseInt(user.id),
            ...values,
        };

        const response = await LeaseAPI.createLeaseListing(credentials);
        console.log(response);

        formik.resetForm();
        navigate(`/`);
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    return (
        <div>
            <h2>Create a Listing</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="listing_type">Listing Type</label>
                    <select
                        id="listing_type"
                        name="listing_type"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.listing_type}
                    >
                        <option value="">Select a Listing Type</option>
                        <option value="Lease">Lease</option>
                        <option value="Sublease">Sublease</option>
                        <option value="Other">Other</option>
                    </select>
                    {formik.touched.listing_type &&
                    formik.errors.listing_type ? (
                        <div>{formik.errors.listing_type}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="tenant_names">Tenant Names</label>
                    <input
                        type="text"
                        id="tenant_names"
                        name="tenant_names"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.tenant_names}
                    />
                    {formik.touched.tenant_names &&
                    formik.errors.tenant_names ? (
                        <div>{formik.errors.tenant_names}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="room_setup">Room Setup</label>
                    <select
                        id="room_setup"
                        name="room_setup"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.room_setup}
                    >
                        <option value="">Select a Room Setup</option>
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Other">Other</option>
                    </select>
                    {formik.touched.room_setup && formik.errors.room_setup ? (
                        <div>{formik.errors.room_setup}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="appliances">Appliances</label>
                    <input
                        type="text"
                        id="appliances"
                        name="appliances"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.appliances}
                    />
                    {formik.touched.appliances && formik.errors.appliances ? (
                        <div>{formik.errors.appliances}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="amenities">Amenities</label>
                    <input
                        type="text"
                        id="amenities"
                        name="amenities"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.amenities}
                    />
                    {formik.touched.amenities && formik.errors.amenities ? (
                        <div>{formik.errors.amenities}</div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="preference_gender">Preference Gender</label>
                    <select
                        id="preference_gender"
                        name="preference_gender"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.preference_gender}
                    >
                        <option value="">Select a Preference Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="No Preference">No Preference</option>
                    </select>
                    {formik.touched.preference_gender &&
                    formik.errors.preference_gender ? (
                        <div>{formik.errors.preference_gender}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="other_preferences">Other Preferences</label>
                    <input
                        type="text"
                        id="other_preferences"
                        name="other_preferences"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.other_preferences}
                    />
                    {formik.touched.other_preferences &&
                    formik.errors.other_preferences ? (
                        <div>{formik.errors.other_preferences}</div>
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
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.location}
                    />
                    {formik.touched.location && formik.errors.location ? (
                        <div>{formik.errors.location}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="rent">Rent</label>
                    <input
                        type="number"
                        id="rent"
                        name="rent"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rent}
                    />
                    {formik.touched.rent && formik.errors.rent ? (
                        <div>{formik.errors.rent}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="utilities">Utilities</label>
                    <input
                        type="number"
                        id="utilities"
                        name="utilities"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.utilities}
                    />
                    {formik.touched.utilities && formik.errors.utilities ? (
                        <div>{formik.errors.utilities}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="lease_length">Lease Length</label>
                    <input
                        type="number"
                        id="lease_length"
                        name="lease_length"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lease_length}
                    />
                    {formik.touched.lease_length &&
                    formik.errors.lease_length ? (
                        <div>{formik.errors.lease_length}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="start_date">Start Date</label>
                    <input
                        type="date"
                        id="start_date"
                        name="start_date"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.start_date}
                    />
                    {formik.touched.start_date && formik.errors.start_date ? (
                        <div>{formik.errors.start_date}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="contact_info">Contact Info</label>
                    <input
                        type="text"
                        id="contact_info"
                        name="contact_info"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.contact_info}
                    />
                    {formik.touched.contact_info &&
                    formik.errors.contact_info ? (
                        <div>{formik.errors.contact_info}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="university">University</label>
                    <input
                        type="text"
                        id="university"
                        name="university"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.university}
                    />
                    {formik.touched.university && formik.errors.university ? (
                        <div>{formik.errors.university}</div>
                    ) : null}
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateListing;
