# userBorrowBook front v1.1

## Intro & Links

- [GitHub - userBorrowBookFront at 7617864](https://github.com/AlbertProfe/userBorrowBookFront/tree/76178641e70c30ce1f46a8abe3d24063bac0b66f)
- [PaginatedBooks.jsx at 7617864](https://github.com/AlbertProfe/userBorrowBookFront/blob/76178641e70c30ce1f46a8abe3d24063bac0b66f/userBorrowBookFront/src/books/PaginatedBooks.jsx)

> The `PaginatedBooks` component **v1.1** provides a user-friendly interface for <mark>managing books in a paginated table.</mark> 
> 
> It includes features for creating, updating, deleting, and viewing book details, along with pagination controls for navigating through the book list.

**Project structure:**

```bash
.
├── App.jsx
├── assets
├── books
│   ├── Books.jsx
│   ├── CreateBookForm.jsx
│   ├── DetailBook.jsx
│   ├── PaginatedBooks.jsx
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

## **Features**

1. **Book Management**:
   
   - Create a new book.
   - Update existing book details.
   - Delete a book.
   - View detailed information about a book.

2. **Pagination**:
   
   - Navigate through pages of books using pagination controls.
   - Displays the current page and total number of pages.

3. **Error Handling**:
   
   - Displays error messages when API requests fail.
   - Handles empty state gracefully when no books are available.

4. **Loading State**:
   
   - Shows a loading spinner while fetching data from the API.

## **Data Flow**

Component Structure, state variables:

- `books`: Stores the list of books for the current page.
- `currentPage`: Tracks the current page number.
- `totalPages`: Tracks the total number of pages available.
- `loading`: Indicates whether data is being loaded.
- `error`: Stores any error messages related to API requests.

API Integration:

> The component interacts with a custom service (`appService.book`) to perform CRUD operations and fetch paginated book data.

Key Methods:

1. **`fetchBooks`**:
   Fetches books for the current page from the API and updates the state.

2. **`handlePageChange`**:
   Updates the current page when the user interacts with the pagination controls.

3. **`deleteBook`**:
   Deletes a book by its ID and updates the book list without requiring a full reload.

4. **Navigation Helpers**:
   
   - `updateBook`: Navigates to the update form for a selected book.
   - `detailBook`: Navigates to the details page for a selected book.
   - `createBook`: Navigates to the form for creating a new book.

## **UI Components**

1. **Table**:
   Displays book details such as title, author, ISBN, page count, and availability status in rows.

2. **Pagination Controls**:
   Allows users to navigate through pages of books using Material-UI's:
   
   1. `Pagination` : [Pagination MUI](https://mui.com/material-ui/react-pagination)
   2. and `Stack` component : [Stack MUI](https://mui.com/material-ui/react-stack/)

3. **Buttons**:
   
   - "Create Book" button: Opens the form for adding a new book.
   - "Update" button: Opens the update form for a selected book.
   - "Delete" button: Deletes a selected book.
   - "Details" button: Opens detailed information about a selected book.

4. **Error and Loading States**:
   
   - A `CircularProgress` spinner is shown while data is loading.
   - An error message is displayed if there is an issue fetching or deleting data.

## Code

Pseudo-code:

```jsx
// imports and Custom hook

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
      // using appService
      // fetch books, setBooks and total pages
  }, [currentPage, appService.book]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const deleteBook = async (id) => {
    // code here
  };

  // Keep the rest of your methods unchanged
  const updateBook = (book) => {
    // code here
  };

  const detailBook = (book) => {
    // code here
  };

  const createBook = () => {
    // code here
  };

  return (
    <div>
      {/* Create Book */}
      <Button
        variant="contained"
        color="primary"
        onClick={createBook}
        style={{ marginBottom: "20px" }}
      >
        Create Book
      </Button>

      {/* If error, printing error */}
      {error && (
        <Typography color="error" style={{ marginBottom: "20px" }}>
          {error}
        </Typography>
      )}

      {/* if loading CircularProgress else Table with Pagination */}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer component={Paper}>
             {/* books here  {books.map((book) => ()) */}
          </TableContainer>

          {/* Steck and Pagination */}
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
```

Component `PaginatedBooks`:

```jsx
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
```
