# userBorrowBook front v1.0

## Intro and links

- [GitHub - AlbertProfe/userBorrowBookFront at b770061](https://github.com/AlbertProfe/userBorrowBookFront/tree/b77006169c22ae0d0d50f64bbd140a91d92b4221)
- [FilterBorrows.jsx at b770061](https://github.com/AlbertProfe/userBorrowBookFront/blob/b77006169c22ae0d0d50f64bbd140a91d92b4221/userBorrowBookFront/src/borrows/FilterBorrows.jsx)
- [borrowService.js at b770061](https://github.com/AlbertProfe/userBorrowBookFront/blob/b77006169c22ae0d0d50f64bbd140a91d92b4221/userBorrowBookFront/src/middleware/borrowService.js)

> This new feature **v1.0** provides a comprehensive interface for <mark>filtering</mark> and <mark>displaying</mark> book borrowing records.

It features multiple filter options, a responsive grid layout, loading state with visual feedback, error handling with user-friendly messages, and a tabular display of filtered results.

- **Project Structure**

```bash
.
├── App.jsx
├── assets
├── books
│   ├── Books.jsx
│   ├── CreateBookForm.jsx
│   ├── DetailBook.jsx
│   └── UpdateBookForm.jsx
├── borrows
│   ├── Borrows.jsx
│   ├── FilterBorrows.jsx
│   └── CreateBorrowForm.jsx
├── index.css
├── layout
│   └── Sidebar.jsx
├── main.jsx
├── middleware
│   ├── borrow.js
│   ├── userService.js
│   ├── bookService.js
│   ├── AppServicesContext.jsx
│   └── bookService.js
├── pages
│   └── Home.jsx
└── users
    ├── CreateUserForm.jsx
    ├── UpdateUserForm.jsx
    └── Users.jsx
```

## Overview

 It features:

1. **Multiple filter options** including book title, ISBN, user age, date of birth, and status flags (available, archived, returned)

2. **Responsive grid layout** for the filter controls

3. **Loading state** with visual feedback during data fetching

4. **Error handling** with loading/error messages

5. **Tabular display** of filtered results with proper formatting

6. **Empty state handling** when no matches are found

> The component presents a set of interactive filter inputs arranged in a responsive grid. These include text inputs for searching by book title or ISBN, a numeric input for filtering by user's age, a date picker for filtering by user's date of birth, and dropdown selectors for boolean filters like Available, Archived, and Returned status.

<mark>For example</mark>, a librarian could search for all borrowed books with "React" in the title, books with a specific ISBN, borrowings by users born before 2000, or currently checked-out books.

**Results Display:**

When filters are applied, a loading indicator appears during data fetching. If something goes wrong, error messages are displayed.

Otherwise, a results table shows matching records with details such as borrowing ID, book title, user name, borrow date, and return status.

<mark>Example results</mark> might include a borrowing ID, book title, user name, borrow date, and return status. For instance, a record could show a book titled "React Fundamentals" borrowed by John Doe on April 1, 2025, with a return status of "No".

**Empty State Handling:**

When no records match the filters, a friendly message appears in place of the table, indicating that no matching records were found.

## Updating `borrowService`: why validating?

### Sending Only Filtered Parameters

We remove empty values from the filters object before sending the request to avoid unnecessary API calls with empty or null parameters. 

This approach <mark>reduces the network payload size</mark>, prevents the backend from processing useless filters, and ensures <mark>cleaner API logs and debugging</mark>.

> By sending this precise request we follow clean code.

### Validating HTML Responses

We check if the response is HTML, which could indicate a server error page instead of the expected JSON. 

This validation is key because <mark>APIs should return JSON</mark>, but misconfigured servers might send HTML, such as a 500 error page. 

> By detecting this, we prevent JSON parsing errors in the frontend and help identify API routing issues early.

### Validating Array Response

We confirm that the response is an array to match the expected format. This ensures the frontend receives <mark>structured data for rendering</mark>, preventing runtime errors when mapping over the response data.

It also <mark>catches API contract violations</mark>, such as if the backend sends an object instead of an array.

> By validatig array response, these checks improve reliability, debugging, and user experience by catching API issues before they break the frontend.

## params creation

> The snippet implements <mark>dynamically</mark> a filter functionality for borrowing records without sending irrelevant or empty values to the API!

Focus on the `params` Creation:

```javascript
const params = Object.fromEntries(
  Object.entries(filters).filter(([_, v]) => v !== "")
);
```

 Here's a breakdown of how it works:

### **Step-by-Step Breakdown**

1. **`Object.entries(filters)`**:
   
   - Converts the `filters` object into an array of key-value pairs.
   
   - Example: If `filters` is `{ bookTitle: "React", isbn: "", userAge: "25" }`, this will produce:
     
     ```javascript
     [
       ["bookTitle", "React"],
       ["isbn", ""],
       ["userAge", "25"]
     ]
     ```

2. **`.filter(([_, v]) => v !== "")`**:
   
   - Filters out entries where the value (`v`) is an empty string (`""`).
   
   - This ensures only non-empty filters are included in the final API request.
   
   - Example: After filtering, the result would be:
     
     ```javascript
     [
       ["bookTitle", "React"],
       ["userAge", "25"]
     ]
     ```

3. **`Object.fromEntries()`**:
   
   - Converts the filtered array of key-value pairs back into an object.
   
   - Example: The result becomes:
     
     ```javascript
     {
       bookTitle: "React",
       userAge: "25"
     }
     ```

> The `params` object is used to send query parameters in the API request to filter borrowing records. By excluding empty filters, the API receives only relevant criteria, avoiding unnecessary or invalid parameters.

For example, if a user fills out only the `bookTitle` and `userAge` fields in the filter form, the resulting query parameters sent to the backend will look like this:

```javascript
{
  bookTitle: "React",
  userAge: "25"
}
```

This makes the request efficient and ensures that only meaningful filters are applied.

### **Benefits of This Approach**

1. **Dynamic Query Parameters**:
   
   - Only non-empty filters are sent to the backend, reducing unnecessary data transfer.

2. **Clean Code**:
   
   - The use of `Object.entries`, `.filter()`, and `Object.fromEntries()` makes the code concise and easy to understand.

3. **Flexibility**:
   
   - The filtering logic can handle any number of fields without hardcoding specific keys or values.

4. **Improved Backend Querying**:
   
   - By sending precise parameters, the backend can efficiently process requests and return accurate results.

### Example Workflow

1. User enters:
   
   - Book Title: `"React"`
   - User Age: `"25"`

2. Filter form updates `filters` state to:
   
   ```javascript
   {
     bookTitle: "React",
     isbn: "",
     userAge: "25",
     available: "",
     archived: "",
     dob: "",
     returned: ""
   }
   ```

3. Clicking "Apply Filters" constructs `params` as:
   
   ```javascript
   {
     bookTitle: "React",
     userAge: "25"
   }
   ```

4. Axios sends this as query parameters to `/api/v1/borrows/filter`.

5. Backend returns matching borrowing records, which are displayed in a table.

## Code

### Pseudo-code `FilterBorrows.jsx`

```jsx
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

  const appService = useAppServices();

  const handleFilterChange = (e) => {
    // code here ...
  };

  const applyFilters = async () => {
    setLoading(true);
    setError(null);

    try {
        // code here ...
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
      {/* All TextFields here */}
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
      {/* Table here */}
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default FilterBorrows;
```

#### `FilterBorrows.jsx`

```javascript
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
                    <TableCell>{borrow.book?.title}</TableCell>
                    <TableCell>{borrow.user?.userAppName}</TableCell>
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
```

### update `borrowService.js`

```javascript
import axios from "axios";

const borrowService = {
  getAllBorrows: async () => {
       // code here ...
  },
  getBorrowsByUser: async (userId) => {
       // code here ...
  },
  createBorrow: async (borrow) => {
       // code here ...
  },
  updateBorrow: async (id, borrow) => {
     // code here ...
  },
  deleteBorrow: async (id) => {
     // code here ...
  },
  filterBorrows: async (filters) => {
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      );

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/borrows/filter`,
        { params, headers: { Accept: "application/json" } }
      );

      // Validate HTML responses
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

      return response.data;
    } catch (error) {
      console.error("Error filtering borrows:", error);
      throw error;
    }
  },
};

export default borrowService;
```
