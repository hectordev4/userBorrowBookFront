import axios from "axios";

// Create Axios instance with baseURL from environment
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default instance;
