# userBorrowBook front v0.1

## Intro and links

- The `Books.jsx` and `Users.jsx` components are simple tables displaying data fetched via Axios.

- You can expand the `Edit` and `Delete` functionality in the future.

- The `Borrows.jsx` page is just a placeholder for now.

## Project

**Project Structure**

```bash
src/
├── App.jsx
├── Sidebar.jsx
├── Home.jsx
├── Books.jsx
├── Users.jsx
├── Borrows.jsx
├── api.js
└── index.js
```

**material ui**

Ensure you have Material-UI installed (`@mui/material`, `@emotion/react`, and `@emotion/styled`) and Axios (`npm install @mui/material @emotion/react @emotion/styled axios`).

To install Material-UI (now called MUI) along with its required dependencies, run the following command:

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

**react-router-dom**

To install react-router-dom, use the following npm command:

```bash
npm install react-router-dom
```

This will install the latest version of react-router-dom in your project[3](https://www.npmjs.com/package/react-router-dom). If you encounter any issues, you can try using the `--legacy-peer-deps` flag:

```bash
npm install react-router-dom --legacy-peer-deps
```

After installation, you can import and use react-router-dom in your React application.

**axios**

To install Axios using npm, run the following command in your terminal:

```bash
npm install axios
```

## Sidebar & paths

`App.jsx`

```jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Books from "./Books";
import Users from "./Users";
import Borrows from "./Borrows";

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/users" element={<Users />} />
            <Route path="/borrows" element={<Borrows />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
```

The sidebar uses the `useState` hook to manage its <mark>open/closed state</mark>, and the `Drawer` component from Material-UI to create the sliding panel effect.

The `Link` component from `react-router-dom` is used to create navigation links within the sidebar.

`Sidebar.jsx`

```jsx
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu"; // Hamburger menu icon
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Books", icon: <BookIcon />, path: "/books" },
    { text: "Users", icon: <PersonIcon />, path: "/users" },
    { text: "Borrows", icon: <AssignmentIcon />, path: "/borrows" },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {/* Hamburger Icon */}
      <IconButton
        color="inherit"
        edge="start"
        onClick={toggleDrawer(true)}
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
```

The core elements of the sidebar component are:

1. **Drawer**: The main container for the sidebar content. It slides in and out based on the `open` state.

2. **IconButton**: Triggers the sidebar to open when clicked. It contains a hamburger menu icon (MenuIcon.

3. **List**: Contains the menu items for navigation.

4. **ListItem, ListItemButton, ListItemIcon, and ListItemText**: These components work together to create clickable menu items with icons and text.

5. **Box**: A layout component that wraps the List, providing styling and accessibility attributes.

6. **Divider**: A horizontal line that separates sections in the sidebar.

7. **Link**: From react-router-dom, used to create navigation links for each menu item.

Here's how the main functions work:

- `toggleDrawer`: Controls the opening and closing of the Drawer by updating the `open` state.

- `DrawerList`: A constant that holds the JSX for the sidebar content, including the list of menu items.

- `menuItems`: An array of objects defining the navigation items, including text, icon, and path.



## CRUD: retrieve

`Books.jsx`

```jsx
import React, { useState, useEffect } from "react";
import axios from "./api";
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

const Books = () => {
  const [books, setBooks] = useState([]);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };


  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
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
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>
                {/* Add Delete functionality */}
                <Button color="primary">Edit</Button>
                <Button
                  color="secondary" >Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Books;
```

`api.js`

```js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export default instance;
```
