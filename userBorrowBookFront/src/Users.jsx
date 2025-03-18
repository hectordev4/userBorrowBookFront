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
