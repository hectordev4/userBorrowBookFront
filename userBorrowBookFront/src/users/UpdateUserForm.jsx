import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserForm from '../components/UserForm';
import axios from '../middleware/api';

const UpdateUserForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user || {};

    // State for form data
    const [formData, setFormData] = useState(user);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/users/${user.id}`, formData); // Use PUT for update
            alert("User updated successfully");
            navigate("/users");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <UserForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
        />
    );
};

export default UpdateUserForm;