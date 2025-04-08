import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppServices } from "../middleware/appServicesContext"; // Custom hook to access the BookService

const Borrows = () => {
  // Custom hook to access the Service
  const appService = useAppServices();
  // hook to manage state borrows
  const [borrows, setBorrows] = useState([]);
  // hook to manage state books and users
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  // hooks to navigate to other pages
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const data = await appService.borrow.getAllBorrows();
        setBorrows(data);
      } catch (error) {
        console.error("Error fetching borrows:", error);
      }
    };

    // fetch books from app service
    const fetchBooks = async () => {
      try {
        const data = await appService.book.getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    // Fetch users from app service
    const fetchUsers = async () => {
      try {
        const data = await appService.user.getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchBorrows();
    fetchBooks();
    fetchUsers();
  }, [appService]);

  const handleCreateBorrowClick = () => {
    navigate("/borrows/create", { state: { books, users } });
  };

  const deleteBorrow = async (id) => {
    try {
      await appService.borrow.deleteBorrow(id); // Replace with your API endpoint
      setBorrows(borrows.filter((borrow) => borrow.id !== id)); // Update state to remove deleted borrow
      alert("Borrow deleted successfully");
    } catch (error) {
      console.error("Error deleting borrow:", error);
      alert("Failed to delete borrow.");
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Borrows List
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleCreateBorrowClick}
        style={{ marginBottom: "20px" }}
      >
        Create Borrow
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Borrow ID</TableCell>
              <TableCell>Borrow Date</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>Returned</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>User App Name</TableCell>
              <TableCell>Book ID</TableCell>
              <TableCell>Book Title</TableCell>
              <TableCell>Actions</TableCell>{" "}
              {/* New column for delete button */}
            </TableRow>
          </TableHead>
          <TableBody>
            {borrows.map((borrow) => (
              <TableRow key={borrow.id}>
                <TableCell>{borrow.id}</TableCell>
                <TableCell>{borrow.borrowDate}</TableCell>
                <TableCell>{borrow.returnDate}</TableCell>
                <TableCell>{borrow.returned ? "Yes" : "No"}</TableCell>
                <TableCell>{borrow.points}</TableCell>
                <TableCell>{borrow.user.id}</TableCell>
                <TableCell>{borrow.user.userAppName}</TableCell>
                <TableCell>{borrow.book.id}</TableCell>
                <TableCell>{borrow.book.title}</TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    onClick={() => deleteBorrow(borrow.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Borrows;
