import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "../middleware/api";
import CreateBorrowForm from "./CreateBorrowForm";

const Borrows = () => {
  const [borrows, setBorrows] = useState([]);
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const response = await axios.get("/borrows");
        setBorrows(response.data);
      } catch (error) {
        console.error("Error fetching borrows:", error);
      }
    };

    const fetchBooks = async () => {
      try {
        const response = await axios.get("/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchBorrows();
    fetchBooks();
    fetchUsers();
  }, []);

  const handleCreateBorrowClick = () => {
    navigate("/borrows/create", { state: { books, users } });
  };

  const deleteBorrow = async (id) => {
    try {
      await axios.delete(`/borrows/${id}`); // Replace with your API endpoint
      setBorrows(borrows.filter((borrow) => borrow.id !== id)); // Update state to remove deleted borrow
      alert("Borrow deleted successfully");
    } catch (error) {
      console.error("Error deleting borrow:", error);
      alert("Failed to delete borrow.");
    }
  };

  return (
    <div>
      <Button
        variant="contained"
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
    </div>
  );
};

export default Borrows;
