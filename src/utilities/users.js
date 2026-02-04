// utilities/users.js
import dataService from "../services/dataService";

// const CACHE_KEY = "cached_users";
// const CACHE_DURATION = 15 * 60 * 1000;

export const fetchCachedUsers = async (forceRefresh = false) => {
  // if (!forceRefresh) {
  //   const cachedItem = localStorage.getItem(CACHE_KEY);
  //   if (cachedItem) {
  //     try {
  //       const { data, timestamp } = JSON.parse(cachedItem);
  //       if (Date.now() - timestamp < CACHE_DURATION) {
  //         return data;
  //       }
  //     } catch {
  //       console.log("Cache parse error, fetching fresh data");
  //     }
  //   }
  // }

  const data = await dataService.getUsers(forceRefresh);

  return data;
};
