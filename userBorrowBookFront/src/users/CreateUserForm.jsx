import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppServices } from '../middleware/appServicesContext'; // Custom hook to access the BookService


const CreateUserForm = () => {
  // Custom hook to access the Service
  const appService = useAppServices();
  const navigate = useNavigate();
  // Form data state
  const [formData, setFormData] = useState({
    userAppName: "",
    email: "",
    password: "",
    age: 0,
    address: "",
    archived: false,
    dob: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await appService.user.createUser(formData);
      alert("User created successfully!");
      navigate("/users"); // Redirect back to the users list
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user.");
    }
  };

  return (
    <Paper style={{ padding: "20px", maxWidth: "500px", margin: "20px auto" }}>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="userAppName"
          value={formData.userAppName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* Checkbox for archived 
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.archived}
              onChange={handleChange}
              name="archived"
            />
          }
          label="Archived"
        />*/}
        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Create User
        </Button>
      </form>
    </Paper>
  );
}

export default CreateUserForm;