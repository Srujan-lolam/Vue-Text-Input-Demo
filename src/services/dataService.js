import axios from "axios";

export default {
  async getUsers(forceRefresh) {
    const CACHE_KEY = "cached_users";
    const CACHE_DURATION = 15 * 60 * 1000;
    if (!forceRefresh) {
      const cachedItem = localStorage.getItem(CACHE_KEY);
      if (cachedItem) {
        try {
          const { data, timestamp } = JSON.parse(cachedItem);
          const now = new Date().getTime();
          if (now - timestamp < CACHE_DURATION) {
            console.log("Using cached user data");
            return data;
          }
        } catch (e) {
          console.error("Error reading from localStorage", e);
        }
      }
    }
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users",
      );
      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: response.data,
            timestamp: new Date().getTime(),
          }),
        );
      } catch (e) {
        console.error("Error writing to localStorage", e);
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },
};
