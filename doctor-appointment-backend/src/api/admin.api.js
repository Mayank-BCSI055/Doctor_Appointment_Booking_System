import axios from "./axiosInstance";

export const createDoctor = async (payload) => {
  return await axios.post("/admin/doctors", payload);
};

export const createSlot = async (payload) => {
  return await axios.post("/admin/slots", payload);
};
