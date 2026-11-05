import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import BACKEND_URL from "../../config";

const AuthContext = createContext({});

const getErrorMessage = (error) => {
  const data = error.response?.data;

  if (typeof data === "string") return data;
  if (typeof data?.detail === "string") return data.detail;

  if (data && typeof data === "object") {
    const message = Object.entries(data)
      .map(([field, value]) => {
        if (Array.isArray(value)) return `${field}: ${value.join(" ")}`;
        if (typeof value === "string") return `${field}: ${value}`;
        return `${field}: ${JSON.stringify(value)}`;
      })
      .join(" ");

    if (message) return message;
  }

  return error.message || "Something went wrong.";
};

const readStoredUser = () => {
  try {
    const savedUser = localStorage.getItem("ecart_user");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error("Failed to restore cached user:", error);
    localStorage.removeItem("ecart_user");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState(null);
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem("ecart_access_token"));
  const [Isverified, setIsverified] = useState(false);
  const [profileSrc, setProfileSrc] = useState(null);

  const username = user ? "@" + user.replace(/\s+/g, "").toLowerCase() : "";

  useEffect(() => {
    const savedUser = readStoredUser();
    const savedToken = localStorage.getItem("ecart_access_token");

    if (savedUser) {
      setUserId(savedUser.id ?? null);
      setUser(savedUser.username ?? "");
      setUserEmail(savedUser.email ?? null);
      setProfileSrc(savedUser.profile ?? null);
      setIsverified(savedUser.isVerified ?? true);
    }

    if (savedToken) {
      setAccessToken(savedToken);
      axios
        .get(`${BACKEND_URL}/api/auth/profile/`, {
          headers: { Authorization: "Bearer " + savedToken },
        })
        .then((response) => {
          const userData = response.data;
          const nextUser = {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            profile: userData.profile ?? null,
            isVerified: true,
          };

          localStorage.setItem("ecart_user", JSON.stringify(nextUser));
          setUserId(nextUser.id);
          setUser(nextUser.username);
          setUserEmail(nextUser.email);
          setProfileSrc(nextUser.profile);
          setIsverified(nextUser.isVerified);
        })
        .catch(() => {
          localStorage.removeItem("ecart_access_token");
          localStorage.removeItem("ecart_refresh_token");
          localStorage.removeItem("ecart_user");
          setAccessToken(null);
          setUser("");
          setUserEmail(null);
          setProfileSrc(null);
          setIsverified(false);
        });
    }
  }, []);

  const persistSession = (userData, access, refresh) => {
    if (access) {
      localStorage.setItem("ecart_access_token", access);
      setAccessToken(access);
    }

    if (refresh) {
      localStorage.setItem("ecart_refresh_token", refresh);
    }

    const storeData = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      profile: userData.profile ?? null,
      isVerified: true,
    };

    localStorage.setItem("ecart_user", JSON.stringify(storeData));
    setUserId(storeData.id);
    setUser(storeData.username);
    setUserEmail(storeData.email);
    setProfileSrc(storeData.profile);
    setIsverified(storeData.isVerified);
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/login/`, {
        email,
        password,
      });

      const { access, refresh, user: userData } = response.data;
      persistSession(userData, access, refresh);

      return {
        success: true,
        user: userData.username,
      };
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);

      return {
        success: false,
        message,
      };
    }
  };

  const signup = async (username, email, password) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/register/`, {
        username,
        email,
        password,
        password2: password,
      });

      const { access, refresh, user: userData } = response.data;
      persistSession(userData, access, refresh);

      return {
        success: true,
        user: userData.username,
      };
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);

      return {
        success: false,
        message,
      };
    }
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("ecart_refresh_token");

    try {
      if (refreshToken) {
        await axios.post(
          `${BACKEND_URL}/api/auth/logout/`,
          { refresh: refreshToken },
          {
            headers: {
              Authorization: accessToken ? "Bearer " + accessToken : undefined,
            },
          },
        );
      }
    } catch (error) {
      console.error("Logout failed:", getErrorMessage(error));
    } finally {
      localStorage.removeItem("ecart_access_token");
      localStorage.removeItem("ecart_refresh_token");
      localStorage.removeItem("ecart_user");
      setUserId(null);
      setUser("");
      setUserEmail(null);
      setAccessToken(null);
      setProfileSrc(null);
      setIsverified(false);
      toast.success("Logged out successfully");
    }
  };

  const value = {
    userId,
    user,
    setUser,
    accessToken,
    setAccessToken,
    login,
    signup,
    logout,
    profileSrc,
    setProfileSrc,
    userEmail,
    username,
    Isverified,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
