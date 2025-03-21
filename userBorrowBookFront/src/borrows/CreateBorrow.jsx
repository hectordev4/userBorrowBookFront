import React, {useState, useEffect} from 'react';
import axios from '../middleware/api';
import { Button } from '@mui/material';





const CreateBorrowForm = () => {

    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState ([]);

    const [borrow, setBorrow] = useState({
        book:"",
        user:"",
        points: 0,
        returned: false,
    })
 


    useEffect (() => {
        const fetchBooks = async () => {
            const response = await axios.get("/books");
            setBooks(response.data);
        };

        const fetchUsers = async () => {
            const response = await axios.get("/users")
            setUsers(response.data);
        };
        fetchBooks();
        fetchUsers();
    }
    , []);

    const handleChange = (e) => {
        setBorrow({
            ...Borrows,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = () => {

    }
    


    return(
        <>
            <h1>Create Borrow Form</h1>
            <form>
                
            </form>
        </>
    );
}

export default CreateBorrowForm;