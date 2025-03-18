# userBorrowBook front v0.5

## Intro and links

> The `Grid` component from Material-UI (MUI) is deprecated in newer versions. 

So. the recommended alternative is to use the `Box` component with the new `Grid` system provided by MUI's `@mui/system` package.

- [MUI Box](https://mui.com/material-ui/react-box/)
- [MUI Box SX Grid](https://mui.com/system/getting-started/the-sx-prop/#grid)
- [MUI Grid](https://mui.com/system/grid/)

**Project Structure**

```bash
src/
├── App.jsx
├── Sidebar.jsx
├── Home.jsx
├── Books.jsx
├── UpdateBookForm.jsx
├── CreateBookForm.jsx
├── Users.jsx
├── Borrows.jsx
├── api.js
└── index.js
```

## CRUD: retrieve users

The component is designed to **display a list of users** fetched from an API:

- **Fetches User Data**: It uses `axios` to fetch user data from a `/users` endpoint.
- **Displays User Information**: Each user is displayed in a card showing their application name, email, and age.
- **Responsive Layout**: The layout is responsive, using a grid system to adjust the number of columns based on screen size (12 columns on extra small screens, 6 columns on small screens, and 4 columns on medium and larger screens).

## How It Works

> As for the business logic and render feature for this component there is no change regarding the `book` component, except the removing of `grid` for `box`.

The Box component is a generic container for grouping other components. It's a fundamental building block when working with Material UI—you can think of it as a `<div>` with extra built-in features, like access to your app's theme and the [`sx` prop](https://mui.com/system/getting-started/the-sx-prop/).

## Code

```jsx
import React, { useState, useEffect } from "react";
import axios from "./api";
import { Card, CardContent, Typography, Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

return (
    <Paper sx={{ padding: "16px" }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        {users.map((user) => (
          <Box gridColumn={{ xs: "span 12", sm: "span 6", md: "span 4" }} key={user.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {user.userAppName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Age: {user.age}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
export default Users;
```

### MUI Grid and Card

This code uses Material-UI (MUI) components and the `sx` prop to create a responsive grid layout for displaying user information.

#### Paper Component

The `Paper` component is used as a container, providing a subtle background and elevation effect. The `sx` prop is used to add padding:

```jsx
<Paper sx={{ padding: "16px" }}>
```

#### Box Component and Grid System

The `Box` component is used to create a grid layout:

```jsx
<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
```

- `display: "grid"`: Sets the display property to grid.

- `gridTemplateColumns: "repeat(12, 1fr)"`: Creates a 12-column grid layout.

- `gap={2}`: Adds spacing between grid items.

#### Responsive Grid Items

Each user's information is wrapped in a `Box` component that acts as a grid item:

```jsx
<Box gridColumn={{ xs: "span 12", sm: "span 6", md: "span 4" }} key={user.id}>

```

This creates a responsive layout where:

- On extra small screens (xs), each item spans all 12 columns.
- On small screens (sm), each item spans 6 columns (2 items per row).
- On medium and larger screens (md), each item spans 4 columns (3 items per row).

#### Card and Typography Components

The `Card` component is used to display each user's information:

```jsx
<Card>
  <CardContent>
    <Typography variant="h6" component="div">
      {user.userAppName}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Email: {user.email}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Age: {user.age}
    </Typography>
  </CardContent>
</Card>

```

- `Typography` components are used to style text content.

- `variant` prop defines the text style (e.g., "h6" for headings, "body2" for body text).

- `color="text.secondary"` applies a secondary text color from the theme.
