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
import { useNavigate } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); // React Router hook for navigation

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

  // Redirect to update form
  const updateBook = (book) => {
    navigate(`/books/update/${book.id}`, { state: { book } });
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
                {/* Add Edit/Delete/Update functionality here */}
                <Button color="primary" onClick={() => updateBook(book)}>
                  Update
                </Button>
                <Button color="secondary" onClick={() => deleteBook(book.id)}>
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
