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