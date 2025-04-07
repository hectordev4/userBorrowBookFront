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
  filterBorrows: async (filters) => {
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      );

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/borrows/filter`,
        { params, headers: { Accept: "application/json" } }
      );

      // Validate HTML responses
      if (
        typeof response.data === "string" &&
        response.data.startsWith("<!DOCTYPE")
      ) {
        throw new Error(
          "Received HTML instead of JSON. Check API endpoint configuration."
        );
      }

      // Validate array response
      if (!Array.isArray(response.data)) {
        throw new Error("Invalid API response format");
      }

      return response.data;
    } catch (error) {
      console.error("Error filtering borrows:", error);
      throw error;
    }
  },
};

export default borrowService;
