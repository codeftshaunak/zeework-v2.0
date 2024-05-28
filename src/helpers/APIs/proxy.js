import axios from "axios";

// AWS EC2 URL 
// export const socketURL = `http://18.213.1.136:5002/`;
// export const BASE_URL = `http://18.213.1.136:5002/api/v1`;

// Local URL
// export const BASE_URL = `http://localhost:5002/api/v1`;
// export const socketURL = "http://localhost:5002/";

// Live Backend URL
export const socketURL = `https://bizzzy-web-backend.onrender.com/`;
export const BASE_URL = `https://bizzzy-web-backend.onrender.com/api/v1`;

const authToken = getCookie("authtoken");

function getCookie(name) {
  if (typeof document !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  return null;
}

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    token: authToken,
  },
});

export const useApiErrorHandling = () => {
  const logoutAndRedirect = () => {
    // return {
    //   path: "/login",
    //   message: msg,
    //   isError: true,
    // };
    // localStorage.removeItem("user");
    document.cookie = "authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace("/login");
  };

  const handleErrorResponse = (msg) => {
    return {
      message: msg,
      isError: true,
    };
  };

  const handleApiError = (error) => {
    if (error?.response) {
      if (error.response?.data?.code == 401) {
        return logoutAndRedirect(error.response?.data?.msg);
      } else if (error.response?.data?.code == 400) {
        return handleErrorResponse(error.response?.data?.msg);
      } else if (error.response?.data?.code == 404) {
        return handleErrorResponse(error.response?.data?.msg);
      } else {
        throw error;
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("Network error: Unable to connect to the server.");
    } else {
      console.error("Request setup Error:", error.message);
      throw new Error("Unexpected error occurred.");
    }
  };

  API.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        logoutAndRedirect();
      }
      handleApiError(error);
      return Promise.reject(error);
    }
  );

  return {
    handleApiError,
  };
};
