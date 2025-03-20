import React from "react";
import { Card, CardContent, Typography, Container } from "@mui/material";

const Home = () => {
  return (
    <Container>
      <Typography variant="h2">Welcome to Our Library</Typography>
      <Card>
        <CardContent>
          <Typography variant="h5">Welcome to Our Library</Typography>
          <Typography variant="body2">
            Manage books, users, and borrows efficiently!
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;
