import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";


async function getBookImageUrl(title) {
  const encodedTitle = encodeURIComponent(title);
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodedTitle}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.items && data.items[0] && data.items[0].volumeInfo.imageLinks) {
      return data.items[0].volumeInfo.imageLinks.thumbnail;
    } else {
      return `https://via.placeholder.com/128x192?text=${encodedTitle}`;
    }
  } catch (error) {
    console.error("Error fetching book image:", error);
    return `book-cover-placeholder.png`;
  }
}



const DetailBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book || {}; // Get book data from state
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function fetchBookImage() {
      const url = await getBookImageUrl(book.title);
      setImageUrl(url);
    }
    fetchBookImage();
  }, [book.title]);



  const handleBackClick = () => {
    navigate(-1); // Navigate back
  };

  return (
    <Card style={{ maxWidth: 500, margin: "20px auto", padding: "10px" }}>
      {/* Book Image */}
      <CardMedia
        component="img"
        height="250"
        image={imageUrl}
        alt={book.title}
      />
      {/* Book Details */}
      <CardContent>
        <Typography variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ISBN: {book.isbn}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Pages: {book.pagesQty}
        </Typography>
        <Typography variant="body2" color={book.available ? "green" : "red"}>
          {book.available ? "Available" : "Not Available"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Published on: {new Date(book.publicationDate).toLocaleDateString()}
        </Typography>
      </CardContent>
      {/* Back Button */}
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "10px" }}
        onClick={handleBackClick}
      >
        Back
      </Button>
    </Card>
  );
};

export default DetailBook;


