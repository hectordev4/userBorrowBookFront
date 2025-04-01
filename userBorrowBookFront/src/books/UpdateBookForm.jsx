import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppServices } from "../middleware/appServicesContext"; // Custom hook to access the BookService

const UpdateBookForm = () => {
  // Custom hook to access the Service
  const appService = useAppServices();
  // useLocation hook to access the current location
  const location = useLocation();
  // useNavigate hook to programmatically navigate
  const navigate = useNavigate();
  const book = location.state?.book || {}; // Get book data from state

  const [formData, setFormData] = useState({
    title: book.title || "",
    author: book.author || "",
    isbn: book.isbn || "",
    pagesQty: book.pagesQty || "",
    available: book.available || false,
    publicationDate: book.publicationDate || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await appService.book.updateBook(book.id, formData);
      alert("Book updated successfully!");
      navigate("/books"); // Redirect back to the books list
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <Paper style={{ padding: "20px", maxWidth: "500px", margin: "20px auto" }}>
      <Typography variant="h5">Update Book</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          fullWidth
          margin="normal"
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
          Update Book
        </Button>
      </form>
    </Paper>
  );
};

export default UpdateBookForm;
