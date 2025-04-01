import axios from "axios";

const borrowService = {
  getAllBorrows: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/borrows`
      );
      return response.data;
    } catch (error) {
      console.error("Error retrieving borrows:", error);
      throw error;
    }
  },
  getBorrowsByUser: async (userId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/borrows?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error retrieving borrows by user:", error);
      throw error;
    }
  },
  createBorrow: async (borrow) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/borrows`,
        borrow
      );
      return response.data;
    } catch (error) {
      console.error("Error creating borrow:", error);
      throw error;
    }
  },
  updateBorrow: async (id, borrow) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/borrows/${id}`,
        borrow
      );
      return response.data;
    } catch (error) {
      console.error("Error updating borrow:", error);
      throw error;
    }
  },
  deleteBorrow: async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/borrows/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting borrow:", error);
      throw error;
    }
  },
};

export default borrowService;
