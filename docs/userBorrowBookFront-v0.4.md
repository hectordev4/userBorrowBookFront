# userBorrowBook front v0.4

## Intro and links

**Project Structure**

```bash
src/
├── App.jsx
├── Sidebar.jsx
├── Home.jsx
├── Books.jsx
├── UpdateBookForm.jsx
├── CreateBookForm.jsx
├── Users.jsx
├── Borrows.jsx
├── api.js
└── index.js
```

## CRUD: create

To add the "Create Book" feature, we will:

1. Create a handler function using Axios to send a POST request for creating a book.

2. Add a "Create Book" button in the `Books` component (not in the drawer).

3. Create a separate form component for creating a new book.

Here’s how you can implement it:This component contains the form for creating a new book and sends a POST request using Axios.

## How It Works

1. **Books Component**:
   
   - A "Create Book" button is added above the table.
   
   - When clicked, it navigates to `/books/create` using the `navigate` function.

2. **CreateBookForm Component**:
   
   - Displays a form for entering details of a new book.
   
   - On submission, it sends a POST request to the backend API (`/api/v1/books`) to create the book.
   
   - After successful creation, it redirects back to the main books list.

3. **Routing**:
   
   - The `/books/create` route displays the `CreateBookForm` component.
   
   - The main `/` route displays the `Books` component.

## Code

Add a "Create Book" button that navigates to the form for creating a new book.

`Books.jsx`

```jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Navigate to create book form
  const createBook = () => {
    navigate("/books/create");
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={createBook}
        style={{ marginBottom: "20px" }}
      >
        Create Book
      </Button>
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
                  <Button color="secondary" onClick={() => deleteBook(book.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Books;

```

This component displays a form pre-filled with the selected book's details and allows the user to update them.

`CreateBookForm.jsx`

```jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./api";
import { TextField, Button, Paper } from "@mui/material";

const CreateBookForm = () => {
  const navigate = useNavigate();

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
      await axios.post("http://localhost:8080/api/v1/books", formData);
      alert("Book created successfully!");
      navigate("/"); // Redirect back to the books list
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

```

Set up routing in your app to handle navigation between components.

`App.jsx`

```jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./Books";
import UpdateBookForm from "./UpdateBookForm";
import CreateBookForm from "./CreateBookForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/books/update/:id" element={<UpdateBookForm />} />
        <Route path="/books/create" element={<CreateBookForm />} />
      </Routes>
    </Router>
  );
};

export default App;
```
