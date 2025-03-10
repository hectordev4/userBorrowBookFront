import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Home = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Welcome to Our Library</Typography>
        <Typography variant="body2">
          Manage books, users, and borrows efficiently!
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Home;
