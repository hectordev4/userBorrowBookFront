import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../middleware/api";

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Delete a book by ID
  const deleteBook = async (id) => {
    try {
      await axios.delete(`/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Redirect to update form
  const updateBook = (book) => {
    navigate(`/books/update/${book.id}`, { state: { book } });
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
    </div>
  );
};

export default Books;
