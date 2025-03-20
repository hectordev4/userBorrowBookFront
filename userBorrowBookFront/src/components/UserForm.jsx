import React, { useState } from 'react';
import axios from '../middleware/api';
import { Button, Paper, TextField } from '@mui/material';


//handler to submit form data
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("/users", formData);
        //post form data to api
        alert("User created successfully");
        //show alert after successful post
        navigate ("/users");
        //redirect to users page
    }
    catch (error) {
        console.error(error);
    }
};

//handler to update form data: onChange
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
}


export default function Form (){
    return (
        <>
            <Paper sx={{padding: 2}}>
                <form>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Adress"
                        name="adress"
                        value={formData.adress}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Date of Birth"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Update User
                    </Button>
                </form>
            </Paper>
        </>
    )
};