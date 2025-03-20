import React, { useState, useEffect, use } from "react";
import { Box, Card, Paper, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../middleware/api";



const Users = () => {

//hook to manage state
//handle get data from api
//map users data
//display users data in cards

const [users, setUsers] = useState([]);
const navigate = useNavigate();

const getUsers = async () => {
  try {
    const response = await axios.get("/users");
    const data = response.data;
    setUsers(data);
  }
  catch (error) {
    console.error(error);
  }
};

//hook to fetch users

useEffect(() => {
  getUsers();
}
, []);

// handler to delete user

const deleteUser = async (id) => {
  try {
    await axios.delete(`/users/${id}`);
    getUsers();
    //fetch users again after delete to update the list correctly
  }
  catch (error) {
    console.error(error);
  }
};

//handler to update user
const updateUser = (user) => {
  navigate(`/users/update/${user.id}`, {state: {user}});
}


const createUser = () => {
  navigate("/users/create");
};

  return (
    <Paper sx={{padding: 2}}>
      <Button onClick={createUser}>Create User</Button>
      
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn ={{ xs:12, sm: span = 6, md:span = 3, lg: span = 2}}
        key={user.id}>
          {Map.users((user) => (
          <Card>
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="body1">{user.email}</Typography>
            <Typography variant="body1">{user.phone}</Typography>
            <Button onClick={()=>{updateUser(user)}}>UPDATE</Button>
            <Button onClick={deleteUser(user.id)}>Delete User</Button>
          </Card>
          ))};
        </Box>
      </Box>
    </Paper>
  );
};
export default Users;