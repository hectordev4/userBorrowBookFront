# userBorrowBook front v0.7

## Intro and links

> This **React** <mark>`Borrow` creation with `user` and `book`</mark> implementation demonstrates **form state management and navigation** using React Router's built-in hooks.

- **Project Structure**

```bash
.
├── App.jsx
├── assets
├── books
│   ├── Books.jsx
│   ├── CreateBookForm.jsx
│   ├── DetailBook.jsx
│   └── UpdateBookForm.jsx
├── borrows
│   ├── Borrows.jsx
│   └── CreateBorrowForm.jsx
├── index.css
├── layout
│   └── Sidebar.jsx
├── main.jsx
├── middleware
│   └── api.js
├── pages
│   └── Home.jsx
└── users
    ├── CreateUserForm.jsx
    ├── UpdateUserForm.jsx
    └── Users.jsx
```

## How does it work

This React implementation demonstrates:

- how to  'state management and navigation' worksusing React Router's built-in hooks. 
- how `form` is designed to create a book borrowing **record**
- how the <mark>select</mark> Material-UI component works
- how to **package** and **send** /post the object to backend

Here's the breakdown:

### Navigation & State Passing

1. **Programmatic Navigation**
- `useNavigate()` creates navigation function

- `navigate("/borrows/create", { state: { books, users } })` passes current books/users as route state

- Accessed via `useLocation().state` in child component
2. **State Management**

```jsx
// Parent component (Borrows.js)
const [books, setBooks] = useState([]);
const [users, setUsers] = useState([]);

// Child component (CreateBorrowForm.js)
const { books, users } = useLocation().state;
```

### Form Handling Architecture

1. Controlled Components
- useState manages form data:

```jsx
const [formData, setFormData] = useState({
  bookId: "",
  userId: "",
  borrowDate: dayjs(),
  returnDate: dayjs().add(1, "month"),
  points: 0,
  returned: false,
});
```

2. Input Handlers
- Unified change handler for form inputs:

```jsx
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

// Special handler for date inputs
const handleDateChange = (name, value) => {
  setFormData(prev => ({ ...prev, [name]: value }));
};
```

### Data Flow & Submission

1. **API Integration**
- Form submission prepares nested structure:

```jsx
const borrowData = {
  book: { id: formData.bookId },
  user: { id: formData.userId },
  // ...other fields
};
await axios.post("/borrows", borrowData);
```

2. **Validation & Error Handling**
- Basic HTML5 validation via `required` prop

- Manual error handling in try/catch block:

```jsx
try {
  // API call
} catch (error) {
  console.error("Error creating borrow:", error);
  alert("Failed to create borrow.");
}
```

### Form & Select

This form is designed to create a book borrowing record. The form is built using **Material-UI components** and consists of several input fields:

1. Book selection
2. User selection
3. Borrow date
4. Return date
5. Points

**Book and User Selection**

```jsx
<FormControl fullWidth margin="normal" required>
  <InputLabel id="book-select-label">Book</InputLabel>
  <Select
    labelId="book-select-label"
    id="bookId"
    name="bookId"
    value={formData.bookId}
    label="Book"
    onChange={handleChange}
  >
    {books.map((book) => (
      <MenuItem key={book.id} value={book.id}>
        {book.title}
      </MenuItem>
    ))}
  </Select>
</FormControl>

```

- Uses Material-UI's `FormControl` and `Select` components.
- Populates options using the `books` array, mapping each book to a `MenuItem`.
- Similar structure is used for user selection.

**Date Pickers**

```jsx
<DatePicker
  label="Borrow Date"
  value={formData.borrowDate}
  onChange={(newValue) => handleDateChange("borrowDate", newValue)}
  renderInput={(params) => (
    <TextField {...params} fullWidth margin="normal" />
  )}
/>

```

- Uses the `DatePicker` component for selecting dates.
- Custom `handleDateChange` function updates the form data.

**Points Input**

```jsx
<TextField
  label="Points"
  name="points"
  type="number"
  value={formData.points}
  onChange={handleChange}
  fullWidth
  margin="normal"
/>

```

- Uses a `TextField` for numerical input.

**Form Handling**

1. The form uses a `formData` state object to store input values.
2. `handleChange` function updates the `formData` state when inputs change.
3. `handleDateChange` specifically handles date input changes.
4. `handleSubmit` function (not shown) would be called when the form is submitted.

### Data Flow

1. User interacts with form inputs.

2. Change events trigger updates to the `formData` state.

3. When submitted, the form data would typically be sent to a server or processed locally.

This form provides a user-friendly interface for creating book borrowing records, with dropdown selections for books and users, date pickers for borrow and return dates, and a numerical input for points.



## Component Structure

| Feature          | Implementation                  |
| ---------------- | ------------------------------- |
| Form Controls    | Material-UI Select/TextField    |
| Date Handling    | @mui/x-date-pickers with Day.js |
| State Management | React useState + Router state   |
| Side Effects     | useEffect for data fetching     |
| Navigation       | React Router v6 hooks           |

> This architecture demonstrates a typical CRUD implementation using React's built-in state management combined with React Router for navigation and state passing between components.

The pattern avoids external state libraries while maintaining component isolation through route-based state transfer.

## Code

### `Borrows.jsx`

```jsx
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
```

### `CreateBorrowForm.jsx`

```jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../middleware/api";
import {
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const CreateBorrowForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { books, users } = location.state || {}; // Get books and users from state

  // Form data state
  const [formData, setFormData] = useState({
    bookId: "",
    userId: "",
    borrowDate: dayjs(),
    returnDate: dayjs().add(1, "month"),
    points: 0,
    returned: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the data to match your backend's expected format.  Crucially,
      // you might need to send just the IDs, depending on how your API is set up.
      const borrowData = {
        book: { id: formData.bookId },
        user: { id: formData.userId },
        borrowDate: formData.borrowDate,
        returnDate: formData.returnDate,
        returned: formData.returned,
        points: formData.points,
      };

      await axios.post("/borrows", borrowData); // Replace with your API endpoint
      alert("Borrow created successfully!");
      navigate("/borrows"); // Redirect back to the borrows list
    } catch (error) {
      console.error("Error creating borrow:", error);
      alert("Failed to create borrow.");
    }
  };

  if (!books || !users) {
    return <p>Loading data...</p>; // Or display an error message
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        style={{ padding: "20px", maxWidth: "500px", margin: "20px auto" }}
      >
        <h2>Create New Borrow</h2>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="book-select-label">Book</InputLabel>
            <Select
              labelId="book-select-label"
              id="bookId"
              name="bookId"
              value={formData.bookId}
              label="Book"
              onChange={handleChange}
            >
              {books.map((book) => (
                <MenuItem key={book.id} value={book.id}>
                  {book.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="user-select-label">User</InputLabel>
            <Select
              labelId="user-select-label"
              id="userId"
              name="userId"
              value={formData.userId}
              label="User"
              onChange={handleChange}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.userAppName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2 }}>
            <DatePicker
              label="Borrow Date"
              value={formData.borrowDate}
              onChange={(newValue) => handleDateChange("borrowDate", newValue)}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
            />

            <DatePicker
              label="Return Date"
              value={formData.returnDate}
              onChange={(newValue) => handleDateChange("returnDate", newValue)}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
            />
          </Box>

          <TextField
            label="Points"
            name="points"
            type="number"
            value={formData.points}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Button type="submit" variant="contained" color="primary">
            Create Borrow
          </Button>
        </form>
      </Paper>
    </LocalizationProvider>
  );
};

export default CreateBorrowForm;
```
