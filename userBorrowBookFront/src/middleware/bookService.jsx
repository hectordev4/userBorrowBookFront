import React, { createContext, useContext } from "react";
import axios from "axios";

// Base URL for the mock API
const API_BASE_URL = "http://localhost:8080/api/v1";

const BookService = {
  getAllBooks: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/books`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving books:", error);
      throw error;
    }
  },

  createBook: async (book) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/books`, book);
      return response.data;
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  },

  updateBook: async (bookId,book) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/books/${bookId}`, book);
      return response.data;
    } catch (error) {
      console.error("Error updating book:", error);
      throw error;
    }
  },

  deleteBook: async (bookId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/books/${bookId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting book:", error);
      throw error;
    }
  },
};

// Create a Context for the BookService
const BookServiceContext = createContext(BookService); // Provide the service as the default value

// Custom hook to use the BookService
export const useBookService = () => {
  return useContext(BookServiceContext);
};

// BookServiceProvider component
export const BookServiceProvider = ({ children }) => {
  return (
    <BookServiceContext.Provider value={BookService}>
      {children}
    </BookServiceContext.Provider>
  );
};

export default BookService;