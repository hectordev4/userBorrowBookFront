import React, { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const FilterBorrows = () => {
  const [filters, setFilters] = useState({
    bookTitle: "",
    isbn: "",
    userAge: "",
    available: "",
    archived: "",
    dob: "",
    returned: "",
  });

  const [filteredBorrows, setFilteredBorrows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      );

      const response = await axios.get("http://localhost:8080/api/borrows", {
        params,
        headers: { Accept: "application/json" },
        validateStatus: (status) => status < 500, // Accept client-side errors without throwing
      });

      // Check for HTML responses
      if (
        typeof response.data === "string" &&
        response.data.startsWith("<!DOCTYPE")
      ) {
        throw new Error(
          "Received HTML instead of JSON. Check API endpoint configuration."
        );
      }

      // Validate array response
      if (!Array.isArray(response.data)) {
        throw new Error("Invalid API response format");
      }

      setFilteredBorrows(response.data);
    } catch (error) {
      console.error("Filter error:", error);
      setError(error.message || "Failed to fetch data");
      setFilteredBorrows([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      {/* Filters Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        <TextField
          label="Book Title"
          name="bookTitle"
          value={filters.bookTitle}
          onChange={handleFilterChange}
          variant="outlined"
        />
        <TextField
          label="ISBN"
          name="isbn"
          value={filters.isbn}
          onChange={handleFilterChange}
          variant="outlined"
        />
        <TextField
          label="User Age"
          name="userAge"
          type="number"
          value={filters.userAge}
          onChange={handleFilterChange}
          variant="outlined"
        />
        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={filters.dob}
          onChange={handleFilterChange}
          variant="outlined"
        />
        <TextField
          select
          label="Available"
          name="available"
          value={filters.available}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </TextField>
        <TextField
          select
          label="Archived"
          name="archived"
          value={filters.archived}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </TextField>
        <TextField
          select
          label="Returned"
          name="returned"
          value={filters.returned}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </TextField>
      </div>

      {/* Apply Filters Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={applyFilters}
        disabled={loading}
        style={{ margin: "20px 0" }}
      >
        {loading ? <CircularProgress size={24} /> : "Apply Filters"}
      </Button>

      {/* Error Message */}
      {error && (
        <Typography color="error" style={{ marginBottom: "20px" }}>
          Error: {error}
        </Typography>
      )}

      {/* Results Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Book Title</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Borrow Date</TableCell>
              <TableCell>Returned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBorrows.length > 0
              ? filteredBorrows.map((borrow) => (
                  <TableRow key={borrow.id}>
                    <TableCell>{borrow.id}</TableCell>
                    <TableCell>
                      {borrow.book?.title} by {borrow.book?.author}
                    </TableCell>
                    <TableCell>
                      {borrow.user?.userAppName} ({borrow.user?.age}) [
                      {borrow.user?.archived ? "Archived" : "Active"}]
                    </TableCell>
                    <TableCell>
                      {new Date(borrow.borrowDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{borrow.returned ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))
              : !loading && (
                  <TableRow>
                    <TableCell colSpan={5} style={{ textAlign: "center" }}>
                      No matching records found.
                    </TableCell>
                  </TableRow>
                )}
            {loading && (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: "center" }}>
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default FilterBorrows;
