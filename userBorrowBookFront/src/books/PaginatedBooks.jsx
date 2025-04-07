import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Stack,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppServices } from "../middleware/appServicesContext"; // Custom hook

const PaginatedBooks = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const appService = useAppServices();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await appService.book.getPaginatedBooks(currentPage);

        setBooks(response.content);
        setTotalPages(response.totalPages);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        setError("Failed to load books. Please try again later.");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage, appService.book]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const deleteBook = async (id) => {
    try {
      await appService.book.deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
      setError("Failed to delete book");
    }
  };

  // Keep the rest of your methods unchanged
  const updateBook = (book) => {
    navigate(`/books/update/${book.id}`, { state: { book } });
  };

  const detailBook = (book) => {
    navigate(`/books/detail/${book.id}`, { state: { book } });
  };

  const createBook = () => {
    navigate("/books/create");
  };

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

      {error && (
        <Typography color="error" style={{ marginBottom: "20px" }}>
          {error}
        </Typography>
      )}

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>ISBN</TableCell>
                  <TableCell>Pages</TableCell>
                  <TableCell>Available</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>{book.pagesQty}</TableCell>
                    <TableCell>{book.available ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        onClick={() => updateBook(book)}
                        style={{ marginRight: "8px" }}
                      >
                        Update
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() => deleteBook(book.id)}
                        style={{ marginRight: "8px" }}
                      >
                        Delete
                      </Button>
                      <Button color="success" onClick={() => detailBook(book)}>
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack
            spacing={2}
            style={{ marginTop: "20px", alignItems: "center" }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Stack>
        </>
      )}
    </div>
  );
};

export default PaginatedBooks;
