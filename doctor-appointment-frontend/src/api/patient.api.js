import axios from "./axiosInstance";

export const listDoctors = async () => {
  return await axios.get("/patient/doctors");
};

export const listSlots = async (doctorId) => {
  return await axios.get(`/patient/slots?doctor_id=${doctorId}`);
};

export const bookAppointment = async (payload) => {
  return await axios.post("/patient/appointments", payload);
};

export const myAppointments = async () => {
  return await axios.get("/patient/appointments");
};

export const cancelAppointment = async (id) => {
  return await axios.delete(`/patient/appointments/${id}`);
};
