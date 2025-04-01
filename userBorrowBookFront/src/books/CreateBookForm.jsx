import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper } from "@mui/material";
import { useAppServices } from "../middleware/appServicesContext"; // Custom hook to access the BookService

const CreateBookForm = () => {
  // Custom hook to access the Service
  const appService = useAppServices();
  const navigate = useNavigate();
  // Form data state
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    pagesQty: "",
    available: true,
    publicationDate: "",
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
      await appService.book.createBook(formData);
      alert("Book created successfully!");
      navigate("/books"); // Redirect back to the books list
    } catch (error) {
      console.error("Error creating book:", error);
      alert("Failed to create book.");
    }
  };

  return (
    <Paper style={{ padding: "20px", maxWidth: "500px", margin: "20px auto" }}>
      <h2>Create New Book</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="ISBN"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Pages Quantity"
          name="pagesQty"
          type="number"
          value={formData.pagesQty}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Publication Date"
          name="publicationDate"
          type="date"
          value={formData.publicationDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Create Book
        </Button>
      </form>
    </Paper>
  );
};

export default CreateBookForm;
