import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../middleware/api";
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

const Borrows = () => {
  const [borrows, setBorrows] = useState([]);
  const navigate = useNavigate();

  // Fetch all borrow
  const fetchBorrows = async () => {
    try {
      const response = await axios.get("/borrows");
      setBorrows(response.data);
    } catch (error) {
      console.error("Error fetching borrows:", error);
    }
  };

  // Delete a borrow by ID
  const deleteBorrow = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/borrows/${id}`);
      setBorrows(borrows.filter((borrow) => borrow.id !== id));
    } catch (error) {
      console.error("Error deleting borrow:", error);
    }
  };

  // Redirect to update form
  const updateBorrow = (borrow) => {
    navigate(`/borrow/update/${borrow.id}`, { state: { borrow } });
  };

  // Navigate to create borrow form
  const createBorrow = () => {
    navigate("/borrow/create");
  };

  useEffect(() => {
    fetchBorrows();
  }, []);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={createBorrow}
        style={{ marginBottom: "20px" }}
      >
        Create Borrow
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
            {borrows.map((borrow) => (
              <TableRow key={borrow.id}>
                <TableCell>{borrow.book}</TableCell>
                <TableCell>{borrow.book.author}</TableCell>
                <TableCell>{borrow.user}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => updateBorrow(borrow)}>
                    Update
                  </Button>
                  <Button color="secondary" onClick={() => deleteBorrow(borrow.id)}>
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
