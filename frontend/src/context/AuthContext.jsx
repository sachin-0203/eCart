import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getProfile,
  login as loginRequest,
  logout as logoutRequest,
  refreshAccessToken,
  register as registerRequest,
  sendEmailOTP,
  updateProfile as updateProfileRequest,
  verifyEmailOTP,
} from "./api/authApi";

const AuthContext = createContext({});

const emptyProfileDetails = {
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  phone_number: "",
};

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

const normalizeUser = (userData) => ({
  id: userData.id ?? null,
  username: userData.username ?? "",
  email: userData.email ?? null,
  first_name: userData.first_name ?? "",
  last_name: userData.last_name ?? "",
  phone_number: userData.phone_number ?? "",
  profile: userData.profile ?? null,
  isVerified: userData.isVerified ?? true,
});

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState(null);
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem("ecart_access_token"));
  const [authLoading, setAuthLoading] = useState(true);
  const [Isverified, setIsverified] = useState(false);
  const [profileSrc, setProfileSrc] = useState(null);
  const [profileDetails, setProfileDetails] = useState(emptyProfileDetails);

  const username = user ? "@" + user.replace(/\s+/g, "").toLowerCase() : "";

  const applyUserData = useCallback((userData) => {
    const storedUser = normalizeUser(userData);
    localStorage.setItem("ecart_user", JSON.stringify(storedUser));
    setUserId(storedUser.id);
    setUser(storedUser.username);
    setUserEmail(storedUser.email);
    setProfileSrc(storedUser.profile);
    setProfileDetails({
      username: storedUser.username,
      email: storedUser.email ?? "",
      first_name: storedUser.first_name,
      last_name: storedUser.last_name,
      phone_number: storedUser.phone_number,
    });
    setIsverified(storedUser.isVerified);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem("ecart_access_token");
    localStorage.removeItem("ecart_refresh_token");
    localStorage.removeItem("ecart_user");
    setUserId(null);
    setUser("");
    setUserEmail(null);
    setAccessToken(null);
    setProfileSrc(null);
    setProfileDetails(emptyProfileDetails);
    setIsverified(false);
  }, []);

  useEffect(() => {
    const savedUser = readStoredUser();
    const savedToken = localStorage.getItem("ecart_access_token");
    const savedRefreshToken = localStorage.getItem("ecart_refresh_token");

    if (savedUser) applyUserData(savedUser);

    const handleSessionExpired = () => clearSession();
    window.addEventListener("auth:session-expired", handleSessionExpired);

    if (!savedToken && !savedRefreshToken) {
      setAuthLoading(false);
      return () => window.removeEventListener("auth:session-expired", handleSessionExpired);
    }

    if (savedToken) setAccessToken(savedToken);

    const restoreSession = async () => {
      try {
        let token = savedToken;
        let userData;

        if (!token) {
          token = await refreshAccessToken();
          setAccessToken(token);
        }

        try {
          userData = await getProfile(token);
        } catch (error) {
          if (error.response?.status !== 401) throw error;
          token = await refreshAccessToken();
          setAccessToken(token);
          userData = await getProfile(token);
        }

        applyUserData(userData);
      } catch (error) {
        console.error("Failed to restore authentication session:", getErrorMessage(error));
        clearSession();
      } finally {
        setAuthLoading(false);
      }
    };

    restoreSession();
    return () => window.removeEventListener("auth:session-expired", handleSessionExpired);
  }, [applyUserData, clearSession]);

  const persistSession = (userData, access, refresh) => {
    if (access) {
      localStorage.setItem("ecart_access_token", access);
      setAccessToken(access);
    }

    if (refresh) localStorage.setItem("ecart_refresh_token", refresh);
    applyUserData(userData);
  };

  const updateProfile = async (updates) => {
    const userData = await updateProfileRequest(updates, accessToken);
    setAccessToken(localStorage.getItem("ecart_access_token"));
    applyUserData(userData);
    return userData;
  };

  const login = async (email, password) => {
    try {
      const { access, refresh, user: userData } = await loginRequest({ email, password });
      persistSession(userData, access, refresh);
      return { success: true, user: userData.username };
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      return { success: false, message };
    }
  };

  const loginWithOTP = async (email, verificationToken) => {
    try {
      const { access, refresh, user: userData } = await loginRequest({
        email,
        verification_token: verificationToken,
      });
      persistSession(userData, access, refresh);
      return { success: true, user: userData.username };
    } catch (error) {
      return { success: false, message: getErrorMessage(error) };
    }
  };

  const signup = async (username, email, password, verificationToken) => {
    try {
      const { access, refresh, user: userData } = await registerRequest({
        username,
        email,
        password,
        password2: password,
        verification_token: verificationToken,
      });
      persistSession(userData, access, refresh);
      return { success: true, user: userData.username };
    } catch (error) {
      const message = getErrorMessage(error);
      return { success: false, message };
    }
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("ecart_refresh_token");

    try {
      if (refreshToken) await logoutRequest(refreshToken, accessToken);
    } catch (error) {
      console.error("Logout failed:", getErrorMessage(error));
    } finally {
      clearSession();
      setAuthLoading(false);
      toast.success("Logged out successfully");
    }
  };

  const value = {
    userId,
    user,
    setUser,
    accessToken,
    authLoading,
    setAccessToken,
    login,
    loginWithOTP,
    signup,
    sendEmailOTP,
    verifyEmailOTP,
    logout,
    profileSrc,
    setProfileSrc,
    userEmail,
    profileDetails,
    updateProfile,
    username,
    Isverified,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
