# userBorrowBook front v0.6

## Intro and links

> The `Users` component displays a list of users and provides functionality to create, update, and delete users.

- [06551 · AlbertProfe/userBorrowBookFront · GitHub](https://github.com/AlbertProfe/userBorrowBookFront/tree/06551ba5036bd27e31ed5f8b9d1495233a0bc206/userBorrowBookFront)

**Project Structure**

```bash
├── App.jsx
├── assets
├── books
│   ├── Books.jsx
│   ├── CreateBookForm.jsx
│   └── UpdateBookForm.jsx
├── borrows
│   └── Borrows.jsx
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

## Summary

This `users` domain represents a user management system with three main components: 

- `Users`,

- `CreateUserForm`, 

- and `UpdateUserForm`.

### Users

> The `Users` component displays a list of users and provides <mark>functionality to create, update, and delete users</mark>. 

It uses the `useState` hook to manage the users' state and `useEffect` to fetch users from an API when the component mounts. 

The component renders a grid of user cards, each displaying basic user information and buttons for deletion and updating. It also includes a "`Create new User`" button that navigates to the creation form.

### CreateUserForm

The `CreateUserForm` component is a form for adding new users. It uses the useState hook to manage form data and includes fields for name, email, password, age, address, and date of birth. 

The `handleChange` function updates the form state as the user types, while `handleSubmit` sends a **POST** request to create a new user when the form is submitted.

### UpdateUserForm

The `UpdateUserForm` component is similar to the `CreateUserForm` but is <mark>pre-populated with existing user data</mark>.

It receives the user data through the location state, set when navigating from the `Users` component. 

This form allows editing of `user` details and includes an additional "`Archived`" checkbox.

On submission, it sends a **PUT** request to update the user's information.

## MUI

All components use Material-UI for styling and layout, providing a consistent and responsive design. They also use React Router for navigation between different views.

## Code

### Features

The code shows a list of users and lets us to <mark>create and update books</mark>. Here's what it does:

1. It gets a list of users from a database and shows them on the screen.

2. We can create a new user by clicking a button. This takes us to a new page to add user info.

3. For each user shown, we can:
   
   - Delete them by clicking a "**delete**" button
   
   - Update their info by clicking an "**update**" button

4. When we click "**update**", it takes us to a new page. This page already has the user's current info filled in, so we can easily change it.

5. After deleting a user, the list refreshes to show the updated list without that user.

### How does it work

In this `users` component, **navigation and state management** are handled using `React Router` and `React hooks`. Here's a  breakdown:

1. `useNavigate()` hook from React Router is utilized for programmatic navigation.

2. For creating a user, `navigate('/users/create')` is called, redirecting to the creation route.

3. Updating a user employs `navigate()` with two arguments:
   
   - First: the <mark>dynamic route</mark> `/users/update/${user.id}`
   
   - Second: an object with a `state` property, p<mark>assing the user data</mark>

4. The `state` object in `navigate()` allows passing complex data to the target route, accessible via `useLocation()` hook in the destination component.

5. This pattern enables seamless data transfer between routes without prop drilling or global state management.

6. ``The component uses `useState()` for local state management and `useEffect()` for side effects, following React's functional component paradigm.

> This approach leverages React Router's built-in state management capabilities for e**fficient inter-component communication and navigation**.

### `Users.jsx`

```jsx
import { Paper } from '@mui/material';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from 'react';
import axios from '../middleware/api';
import { useNavigate } from 'react-router-dom';

const Users = () => {

// hook to manage state
const [users, setUsers] = useState([]);
const navigate = useNavigate();

// handler to  get users from api
const getUsers = async () => {
  try {
    const response = await axios.get("/users");
    const data = response.data;

    setUsers(data);}
  catch (error) {
    console.error(error);
  }
};

// hook to fetch users
useEffect(() => {
  getUsers();
}
, []);

// handler to delete user
const deleteUser = async (id) => {
  try {
    await axios.delete(`/users/${id}`);
    alert("User deleted successfully");
    // fetch users after deletion because we want to show updated list
    // it is just a refresh of the page
    getUsers();
  } catch (error) {
    console.error(error);
  }
}

const createUser = () => {
  navigate('/users/create');

}

const updateUser = (user) => {
  navigate(`/users/update/${user.id}` , { state: { user }});
}

return (
  <Paper sx={{ padding: "16px" }}>
    <Button variant='contained'onClick={createUser} >Create new User</Button>
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
      {users.map((user) => (
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6", md: "span 3" }}
          key={user.id}
        >
          <Card>
            <CardContent>
              {user.userAppName}
              Email: {user.email}
              Age: {user.age}
            </CardContent>
            <Button variant="outlined" onClick={() => { deleteUser(user.id) }}>
              {" "}
              delete{" "}
            </Button>
            <Button variant="outlined" color="secondary" onClick={ () => {updateUser(user)}}>
              {" "}
              update{" "}
            </Button>
          </Card>
        </Box>
      ))}
    </Box>
  </Paper>
);


}

export default Users;
```

### `CreateUserForm.jsx`

```jsx
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../middleware/api';

const CreateUserForm = () => {
  const navigate = useNavigate();
  // Form data state
  const [formData, setFormData] = useState({
    userAppName: "",
    email: "",
    password: "",
    age: 0,
    address: "",
    archived: false,
    dob: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users", formData);
      alert("User created successfully!");
      navigate("/users"); // Redirect back to the users list
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user.");
    }
  };

  return (
    <Paper style={{ padding: "20px", maxWidth: "500px", margin: "20px auto" }}>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="userAppName"
          value={formData.userAppName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* Checkbox for archived 
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.archived}
              onChange={handleChange}
              name="archived"
            />
          }
          label="Archived"
        />*/}
        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Create User
        </Button>
      </form>
    </Paper>
  );
}

export default CreateUserForm;
```

### `UpdateUserForm.jsx`

```jsx
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../middleware/api';

const CreateUserForm = () => {
  const navigate = useNavigate();
  // Form data state
  const [formData, setFormData] = useState({
    userAppName: "",
    email: "",
    password: "",
    age: 0,
    address: "",
    archived: false,
    dob: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users", formData);
      alert("User created successfully!");
      navigate("/users"); // Redirect back to the users list
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user.");
    }
  };

  return (
    <Paper style={{ padding: "20px", maxWidth: "500px", margin: "20px auto" }}>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="userAppName"
          value={formData.userAppName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* Checkbox for archived 
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.archived}
              onChange={handleChange}
              name="archived"
            />
          }
          label="Archived"
        />*/}
        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Create User
        </Button>
      </form>
    </Paper>
  );
}

export default CreateUserForm;
```
