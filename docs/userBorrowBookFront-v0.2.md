# userBorrowBook front v0.2

## Intro and links

## Project

**Project Structure**

```bash
src/
├── App.jsx
├── Sidebar.jsx
├── Home.jsx
├── Books.jsx
├── Users.jsx
├── Borrows.jsx
├── api.js
└── index.js
```

## CRUD: delete

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
