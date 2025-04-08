import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreBooks = () => {
    navigate("/books");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 4,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 3,
        marginBottom: 4,
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: 2 }}>
        Welcome to Our Library
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 3 }}>
        Discover a world of knowledge and imagination. Browse our collection of
        books and find your next great read.
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={handleExploreBooks}
      >
        Explore Books
      </Button>
    </Box>
  );
};

export default HeroSection;
