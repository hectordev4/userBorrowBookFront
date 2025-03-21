import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../middleware/api";
import {
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const CreateBorrowForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { books, users } = location.state || {}; // Get books and users from state

  // Form data state
  const [formData, setFormData] = useState({
    bookId: "",
    userId: "",
    borrowDate: dayjs(),
    returnDate: dayjs().add(1, "month"),
    points: 0,
    returned: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the data to match your backend's expected format.  Crucially,
      // you might need to send just the IDs, depending on how your API is set up.
      const borrowData = {
        book: { id: formData.bookId },
        user: { id: formData.userId },
        borrowDate: formData.borrowDate,
        returnDate: formData.returnDate,
        returned: formData.returned,
        points: formData.points,
      };

      await axios.post("/borrows", borrowData); // Replace with your API endpoint
      alert("Borrow created successfully!");
      navigate("/borrows"); // Redirect back to the borrows list
    } catch (error) {
      console.error("Error creating borrow:", error);
      alert("Failed to create borrow.");
    }
  };

  if (!books || !users) {
    return <p>Loading data...</p>; // Or display an error message
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        style={{ padding: "20px", maxWidth: "500px", margin: "20px auto" }}
      >
        <h2>Create New Borrow</h2>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="book-select-label">Book</InputLabel>
            <Select
              labelId="book-select-label"
              id="bookId"
              name="bookId"
              value={formData.bookId}
              label="Book"
              onChange={handleChange}
            >
              {books.map((book) => (
                <MenuItem key={book.id} value={book.id}>
                  {book.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="user-select-label">User</InputLabel>
            <Select
              labelId="user-select-label"
              id="userId"
              name="userId"
              value={formData.userId}
              label="User"
              onChange={handleChange}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.userAppName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DatePicker
            label="Borrow Date"
            value={formData.borrowDate}
            onChange={(newValue) => handleDateChange("borrowDate", newValue)}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />

          <DatePicker
            label="Return Date"
            value={formData.returnDate}
            onChange={(newValue) => handleDateChange("returnDate", newValue)}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />

          <TextField
            label="Points"
            name="points"
            type="number"
            value={formData.points}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Button type="submit" variant="contained" color="primary">
            Create Borrow
          </Button>
        </form>
      </Paper>
    </LocalizationProvider>
  );
};

export default CreateBorrowForm;
