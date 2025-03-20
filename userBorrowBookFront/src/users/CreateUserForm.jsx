import React from 'react';
import axios from '../middleware/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';




const CreateUserForm = () => {

    //hook to manage form data
    const [formData, setFormData] = useState({
        name: "",
        adress: "",
        age: "",
        dob: "",
        email: "",
        password: "",
        archived: false,
    });

    const navigate = useNavigate();

    


    return (
        <UserForm />
    );
};

export default CreateUserForm;