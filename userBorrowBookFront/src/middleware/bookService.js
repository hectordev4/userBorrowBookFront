import axios from "axios";

const bookService = {
  getAllBooks: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/books`
      );
      return response.data;
    } catch (error) {
      console.error("Error retrieving books:", error);
      throw error;
    }
  },
  createBook: async (book) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/books`,
        book
      );
      return response.data;
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  },
  updateBook: async (bookId, book) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/books/${bookId}`,
        book
      );
      return response.data;
    } catch (error) {
      console.error("Error updating book:", error);
      throw error;
    }
  },
  deleteBook: async (bookId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/books/${bookId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting book:", error);
      throw error;
    }
  },
};

export default bookService;