import { Paper } from '@mui/material';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppServices } from '../middleware/appServicesContext'; // Custom hook to access the BookService

const Users = () => {
  // Custom hook to access the Service
  const appService = useAppServices();
// hook to manage state
const [users, setUsers] = useState([]);
const navigate = useNavigate();

// hook to fetch users
useEffect(() => {
  // handler to  get users from api
  const fetchUsers = async () => {
    try {
      const data = await appService.user.getAllUsers();
  
      //console.log(data);
      // set the users in state
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchUsers();
  // useEffect will run sync with [appService] dependency
  // we sync with appService because it is a custom hook
  // and it will be created when the app starts
  // and it will be used to fetch the data
}, [appService]);

// handler to delete user
const deleteUser = async (id) => {
  try {
    await appService.user.deleteUser(id);
    alert("User deleted successfully");
    // fetch users after deletion because we want to show updated list
    // it is just a refresh of the page
  setUsers(users.filter((user) => user.id !== id));
  alert("User deleted successfully");
  navigate("/users");
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
    <Button variant="contained" onClick={createUser}>
      Create new User
    </Button>
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
      {users.map((user) => (
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6", md: "span 3" }}
          key={user.id}
        >
          <Card>
            <CardContent>
              <b>{user.userAppName}</b>
              <br />
              Email: {user.email}
              <br />
              Age: {user.age}
            </CardContent>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={2} // Adds spacing between the buttons
              sx={{
                marginBottom: "16px", // Adds margin bottom
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  updateUser(user);
                }}
              >
                Update
              </Button>
            </Box>
          </Card>
        </Box>
      ))}
    </Box>
  </Paper>
);


}

export default Users;