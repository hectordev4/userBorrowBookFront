import React, { useState, useEffect } from "react";
import axios from "../middleware/api";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Borrows = () => {

    const [borrows, setBorrows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBorrows = async () => {
            const response = await axios.get("/borrows");
            //console.log(response.data);
            //console.log(response);
            setBorrows(response.data);
        };
        fetchBorrows();
    }, []);


   // if (!borrows.book || !borrows.user) {
   //     return <div>Loading...</div>;
   // }


    const createBorrow =  () => {
        navigate('/borrows/create2');
    }

    return (
        <div>
        <h2>Borrows</h2>
        <Button onClick={createBorrow}  >Create New Borrow</Button>

        {borrows.map((borrow) => (
            <div key={borrow.id}>
            <h3>{borrow.id}</h3>
            <p>Book:{borrow.book.title} & User:{borrow.user.userAppName}</p>
            </div>
        ))}

        </div>
    );
    }

export default Borrows;