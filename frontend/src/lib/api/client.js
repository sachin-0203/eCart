
import axios from "axios";
import BACKEND_URL from "../../../config";
import { refreshAccessToken } from "../../context/api/authApi";

const apiClient = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

const getErrorMessage = (error) => {
  const data = error.response?.data;

  if (typeof data === "string") return data;
  if (typeof data?.detail === "string") return data.detail;

  if (data && typeof data === "object") {
    const message = Object.entries(data)
      .map(([field, messages]) => {
        const text = Array.isArray(messages)
          ? messages.join(" ")
          : typeof messages === "string"
            ? messages
            : JSON.stringify(messages);
        return `${field}: ${text}`;
      })
      .join(" ");
    if (message) return message;
  }

  return error.message || "The request could not be completed.";
};

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ecart_access_token");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Successful responses pass through unchanged.
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      localStorage.getItem("ecart_refresh_token")
    ) {
      originalRequest._retry = true;

      return refreshAccessToken()
        .then((accessToken) => {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${accessToken}`,
          };
          return apiClient(originalRequest);
        })
        .catch((refreshError) => {
          if (refreshError.response?.status === 400 || refreshError.response?.status === 401) {
            localStorage.removeItem("ecart_access_token");
            localStorage.removeItem("ecart_refresh_token");
            localStorage.removeItem("ecart_user");
            window.dispatchEvent(new Event("auth:session-expired"));
          }
          return Promise.reject(refreshError);
        });
    }

    // Handle errors common to all API requests.
    if (error.response) {
      // The server returned an HTTP error.
      console.error("API error:", error.response.status);
    } else if (error.request) {
      // Request was sent, but no response was received.
      console.error("No response received from the server.");
    } else {
      // The request could not be configured.
      console.error("Request error:", error.message);
    }

    return Promise.reject(
      new Error(getErrorMessage(error), { cause: error }),
    );
  }
);

export default apiClient;

export const getListData = (data) =>
  Array.isArray(data) ? data : data?.results ?? [];
