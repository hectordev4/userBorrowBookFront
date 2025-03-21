import React, { useState, useEffect } from "react";
import axios from "../middleware/api";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const _CreateBorrowForm = () => {
    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);

    const [borrow, setBorrow] = useState({
        bookId: "",
        userId: "",
        points: 0,
        returned: false,
    });

    useEffect(() => {
        const fetchBooks = async () => {
        const response = await axios.get("/books");
        setBooks(response.data);
        //console.log(response.data);
        };

        const fetchUsers = async () => {
        const response = await axios.get("/users");
        setUsers(response.data);
        //console.log(response.data);
        };

        fetchBooks();
        fetchUsers();
    } , []);

  // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBorrow({ ...borrow, [name]: value });
        
    };

    const handleSubmit = () => {};
    console.log(borrow);

    
    return (
    <div>
        <h1>Create Borrow Form</h1>
        <form>
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
            <InputLabel id="book">Select a book</InputLabel>
            <Select
                labelId="book-select-label"
                id="book-select-id"
                name="bookId"
                value={borrow.bookId}
                label="book"
                onChange={handleChange}
            >
            {books.map((book) => (
                <MenuItem key={book.id} value={book.id}>
                {book.title}
                </MenuItem>
            ))}
            </Select>
            </FormControl>
        </Box>
        </form>
    </div>
    );
}


export default _CreateBorrowForm;