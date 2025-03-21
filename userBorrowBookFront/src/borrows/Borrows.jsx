import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "../middleware/api"; // Import your axios instance

const Borrows = () => {
  const [borrows, setBorrows] = useState([]);

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const response = await axios.get("/borrows"); // Replace with your API endpoint
        setBorrows(response.data);
      } catch (error) {
        console.error("Error fetching borrows:", error);
      }
    };

    fetchBorrows();
  }, []);

  return (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Borrows;
