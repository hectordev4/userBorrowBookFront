import React from 'react';
import axios from '../middleware/api';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserForm from '../components/UserForm';

const UpdateUserForm = () => {

//hooks
//puede recibir datos por import, axios, useContext, useEffect, props, location.
const [userForm, setUserForm] = useState({user});
const navigate = useNavigate();
const location = useLocation();
const user = location.state?.user || {};




return (
    <UserForm />
);
}

export default UpdateUserForm;