import axios from "./api.js";

const userService = {
  getAllUsers: async () => {
    try {
      const response = await axios.get("/users");
      return response.data;
    } catch (error) {
      console.error("Error retrieving users:", error);
      throw error;
    }
  },
  getUserById: async (id) => {
    try {
      const response = await axios.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving user:", error);
      throw error;
    }
  },
  createUser: async (user) => {
    try {
      const response = await axios.post("/users", user);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
  updateUser: async (id, user) => {
    try {
      const response = await axios.put(`/users/${id}`, user);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },
  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
};

export default userService;
