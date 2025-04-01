import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../middleware/api";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useAppServices } from "../middleware/appServicesContext"; // Custom hook to access the UserService

const UpdateUserForm = () => {
  // Custom hook to access the Service
  const appService = useAppServices();
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || {};

  const [userForm, setUserForm] = useState({
    userAppName: user.userAppName || "",
    email: user.email || "",
    password: user.password || "",
    age: user.age || 0,
    address: user.address || "",
    archived: user.archived || false,
    dob: user.dob || "",
  });

  // Handler to update form data: onChange
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserForm((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handler to submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await appService.user.updateUser(user.id, userForm);
      alert("User updated successfully!");
      navigate("/users"); // Redirect back to the users list
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  return (
    <Paper style={{ padding: "20px", maxWidth: "500px", margin: "20px auto" }}>
      <Typography variant="h5">Update User</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="userAppName"
          value={userForm.userAppName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={userForm.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={userForm.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          value={userForm.age}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={userForm.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={userForm.archived}
              onChange={handleChange}
              name="archived"
            />
          }
          label="Archived"
        />
        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          value={userForm.dob}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Update User
        </Button>
      </form>
    </Paper>
  );
};

export default UpdateUserForm;
