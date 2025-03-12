# userBorrowBook front v0.3

## Intro and links

**Project Structure**

```bash
src/
├── App.jsx
├── Sidebar.jsx
├── Home.jsx
├── Books.jsx
├── UpdateBookForm.jsx
├── Users.jsx
├── Borrows.jsx
├── api.js
└── index.js
```

## CRUD: update

To implement an `updateBook` functionality that redirects to a form for updating a book, you can create a second component for the update form and handle the redirection using React Router. Here's how you can achieve this:

**How It Works**

1. **`updateBook` Handler**:
   
   - Redirects to `/books/update/{id}` with the selected book's data passed via `state`.

2. **`UpdateBookForm` Component**:
   
   - Displays a form pre-filled with the selected book's details.
   
   - Sends a PUT request to update the book when the form is submitted.

3. **Routing**:
   
   - The `App` component manages routes for listing books (`/`) and updating a specific book (`/books/update/:id`).

This setup allows seamless navigation and updates for books in your application.

## Code

Add an `updateBook` handler that redirects to the update form when the "Update" button is clicked.

`Books.jsx`

```jsx
import React, { useState, useEffect } from "react";
import axios from "./api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const Books = () => {
  const [books, setBooks] = useState([]);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Delete a book by ID
  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/books/${id}`);
      // Update the state to remove the deleted book
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>ISBN</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>
                {/* Add Delete functionality */}
                <Button color="primary">Edit</Button>
                <Button
                  color="secondary"
                  onClick={() => deleteBook(book.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Books;
```

This component displays a form pre-filled with the selected book's details and allows the user to update them.

`UpdateBookForm.jsx`

```jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "./api";
import { TextField, Button, Paper } from "@mui/material";

const UpdateBookForm = () => {
  const location = useLocation();
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
      await axios.put(`http://localhost:8080/api/v1/books/${book.id}`, formData);
      alert("Book updated successfully!");
      navigate("/"); // Redirect back to the books list
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <Paper style={{ padding: "20px", maxWidth: "500px", margin: "20px auto" }}>
      <h2>Update Book</h2>
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
```

Set up routing in your app to handle navigation between components.

`App.jsx`

```jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./Books";
import UpdateBookForm from "./UpdateBookForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/books/update/:id" element={<UpdateBookForm />} />
      </Routes>
    </Router>
  );
};

export default App;
```
