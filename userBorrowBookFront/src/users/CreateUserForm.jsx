import React from 'react';
import { useState } from 'react';
import UserForm from '../components/UserForm';


const CreateUserForm = () => {

    const navigate = useNavigate();

    // State for form data
    const [formData, setFormData] = useState(user);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/users/${user.id}`, formData); // Use PUT for update
            alert("User created successfully");
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

export default CreateUserForm;