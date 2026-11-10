import axios from "axios";
import BACKEND_URL from "../../../config";

const authClient = axios.create({
  baseURL: `${BACKEND_URL}/api/auth/`,
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
});

let refreshRequest = null;

export const sendEmailOTP = async (email) => {
  const { data } = await authClient.post("otp/send/", { email });
  return data;
};

export const verifyEmailOTP = async (email, code) => {
  const { data } = await authClient.post("otp/verify/", { email, code });
  return data;
};

export const register = async (payload) => {
  const { data } = await authClient.post("register/", payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await authClient.post("login/", payload);
  return data;
};

export const refreshAccessToken = () => {
  if (refreshRequest) return refreshRequest;

  const refresh = localStorage.getItem("ecart_refresh_token");
  if (!refresh) {
    return Promise.reject(new Error("No refresh token is available."));
  }

  refreshRequest = authClient
    .post("token/refresh/", { refresh })
    .then(({ data }) => {
      if (!data.access) {
        throw new Error("The token refresh response did not include an access token.");
      }

      localStorage.setItem("ecart_access_token", data.access);
      return data.access;
    })
    .finally(() => {
      refreshRequest = null;
    });

  return refreshRequest;
};

export const logout = async (refresh, accessToken) => {
  const sendLogout = (token) =>
    authClient.post("logout/", { refresh }, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

  try {
    const { data } = await sendLogout(accessToken || localStorage.getItem("ecart_access_token"));
    return data;
  } catch (error) {
    if (error.response?.status !== 401) throw error;
    const token = await refreshAccessToken();
    const { data } = await sendLogout(token);
    return data;
  }
};

export const getProfile = async (accessToken) => {
  const { data } = await authClient.get("profile/", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const updateProfile = async (updates, accessToken) => {
  try {
    const { data } = await authClient.patch("profile/", updates, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (error) {
    if (error.response?.status !== 401) throw error;
    const token = await refreshAccessToken();
    const { data } = await authClient.patch("profile/", updates, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
};