import {
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAppServices } from "../middleware/appServicesContext"; // Custom hook to access the BookService


const FilterBorrows = () => {
  // State to hold the filter values
  const [filters, setFilters] = useState({
    bookTitle: "",
    isbn: "",
    userAge: "",
    available: "",
    archived: "",
    dob: "",
    returned: "",
  });
  // State to hold the filtered borrows
  const [filteredBorrows, setFilteredBorrows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Custom hook to access the app services
  const appService = useAppServices();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await appService.borrow.filterBorrows(filters);
      setFilteredBorrows(data);
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
      <h3>Filter borrows</h3>
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
      <br />
      <Typography color="success" style={{ marginBottom: "20px" }}>
        There are {filteredBorrows.length} results.
      </Typography>
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
                      {borrow.user?.userAppName} ({borrow.user?.age})
                      [{borrow.user?.archived ? "Archived" : "Active"}]
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
