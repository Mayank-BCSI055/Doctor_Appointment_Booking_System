import axios from "./axiosInstance.js";

export const login = async (credentials) => {
  return await axios.post("/api/login", credentials);
};

export const register = async (payload) => {
  return await axios.post("/patient/register", payload);
};
