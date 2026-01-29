import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   REQUEST INTERCEPTOR
   ========================= */
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");

    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  error => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
   ========================= */
axiosInstance.interceptors.response.use(
  response => {
    // Phase-3 backend contract
    const payload = response.data;

    // If backend says success=false, treat as error
    if (payload && payload.success === false) {
      return Promise.reject(payload.message || "Request failed");
    }

    // If backend uses the contract, return only data
    if (payload && typeof payload.success === "boolean") {
      if (payload.success === false) {
        return Promise.reject(payload.message || "Request failed");
      }
      return payload.data;
    }

    // Fallback (for legacy or non-API calls)
    return payload;
  },
  error => {
    if (
      error.response?.status === 401 &&
      !window.location.pathname.startsWith("/login")
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    if (error.response?.data?.message) {
      return Promise.reject(error.response.data.message);
    }

    return Promise.reject("Server error");
  }
);

export default axiosInstance;
