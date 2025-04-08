import axios from "./api.js";

const bookService = {
  getAllBooks: async () => {
    try {
      const response = await axios.get(`/books`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving books:", error);
      throw error;
    }
  },
  createBook: async (book) => {
    try {
      const response = await axios.post(
        `/books`,
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
        `/books/${bookId}`,
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
        `/books/${bookId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting book:", error);
      throw error;
    }
  },
  getPaginatedBooks: async (currentPage) => {
    try {
      const response = await axios.get(
        `/books/page/${currentPage}`
      );
      return response.data;
    } catch (error) {
      console.error("Error retrieving paginated books:", error);
      throw error;
    }
  },
};

export default bookService;