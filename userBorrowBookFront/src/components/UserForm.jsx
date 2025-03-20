import React from 'react';
import { Button, Paper, TextField } from '@mui/material';

export default function UserForm({ formData, setFormData, handleSubmit }) {
    // Handler to update form data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <Paper sx={{ padding: 2 }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Address"
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
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Update User
                    </Button>
                </form>
            </Paper>
        </>
    );
}