import React, {
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";
// import axios from "axios";
// import BACKEND_URL from "../../config";
import { toast } from "sonner";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [Isverified, setIsverified] = useState(false);
  const [profileSrc, setProfileSrc] = useState(null);

  const username = user
    ? "@" + user.replace(/\s+/g, "").toLowerCase()
    : "";

  // --------------------------------------------------
  // LOCAL AUTH - Restore logged-in user on refresh
  // --------------------------------------------------
  useEffect(() => {
    const savedUser = localStorage.getItem("ecart_user");

    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);

        setUserId(userData.id);
        setUser(userData.username);
        setUserEmail(userData.email);
        setIsverified(userData.isVerified ?? true);
        setProfileSrc(userData.profile ?? null);
        setAccessToken("local-access-token");
      } catch (error) {
        console.error("Failed to restore local user:", error);
        localStorage.removeItem("ecart_user");
      }
    }
  }, []);

  // --------------------------------------------------
  // BACKEND REFRESH - ENABLE LATER
  // --------------------------------------------------
  /*
  useEffect(() => {
    tryRefresh();
  }, []);

  const tryRefresh = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/refresh`,
        {},
        { withCredentials: true }
      );

      const token = response.data.access_token;

      setAccessToken(token);

      const userRes = await axios.get(`${BACKEND_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserId(userRes.data.id);
      setUser(userRes.data.username);
      setUserEmail(userRes.data.email);
      setProfileSrc(userRes.data.profile);
      setIsverified(userRes.data.isVerified);
    } catch (err) {
      console.error("Refresh failed:", err);
      setAccessToken(null);
    }
  };
  */

  // --------------------------------------------------
  // LOCAL LOGIN
  // --------------------------------------------------
  const login = async (email, password) => {
    try {
      const savedUsers = JSON.parse(
        localStorage.getItem("ecart_users") || "[]"
      );

      const existingUser = savedUsers.find(
        (item) => item.email.toLowerCase() === email.toLowerCase()
      );

      if (!existingUser) {
        return {
          success: false,
          message: "No account found with this email.",
        };
      }

      if (existingUser.password !== password) {
        return {
          success: false,
          message: "Incorrect password.",
        };
      }

      // Save current logged-in user
      const loggedInUser = {
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
        profile: existingUser.profile || null,
        isVerified: true,
      };

      localStorage.setItem(
        "ecart_user",
        JSON.stringify(loggedInUser)
      );

      setUserId(loggedInUser.id);
      setUser(loggedInUser.username);
      setUserEmail(loggedInUser.email);
      setProfileSrc(loggedInUser.profile);
      setIsverified(loggedInUser.isVerified);

      // Fake token for local development
      setAccessToken("local-access-token");

      return {
        success: true,
        user: loggedInUser.username,
      };
    } catch (error) {
      console.error("Local login failed:", error);

      return {
        success: false,
        message: "Login failed. Please try again.",
      };
    }
  };

  // --------------------------------------------------
  // BACKEND LOGIN - ENABLE LATER
  // --------------------------------------------------
  /*
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const result = response.data;

      if (result.status === "success") {
        const token = result.access_token;
        const userData = result.username;

        setAccessToken(token);
        setUser(userData);
        setUserEmail(result.email);

        return {
          success: true,
          user: userData,
        };
      }

      return {
        success: false,
        message: result.message || "Login failed",
      };
    } catch (error) {
      console.error("Login Failed:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Login failed. Please try again.",
      };
    }
  };
  */

  // --------------------------------------------------
  // LOCAL SIGNUP
  // --------------------------------------------------
  const signup = async (username, email, password) => {
    try {
      const savedUsers = JSON.parse(
        localStorage.getItem("ecart_users") || "[]"
      );

      const emailExists = savedUsers.some(
        (item) => item.email.toLowerCase() === email.toLowerCase()
      );

      if (emailExists) {
        toast.error("An account with this email already exists.");

        return {
          success: false,
          message: "Email already registered.",
        };
      }

      const newUser = {
        id: Date.now(),
        username,
        email,
        password,
        profile: null,
        isVerified: true,
      };

      savedUsers.push(newUser);

      localStorage.setItem(
        "ecart_users",
        JSON.stringify(savedUsers)
      );

      return {
        success: true,
        user: username,
      };
    } catch (error) {
      console.error("Local signup failed:", error);

      return {
        success: false,
        message: "An error occurred during signup.",
      };
    }
  };

  // --------------------------------------------------
  // BACKEND SIGNUP - ENABLE LATER
  // --------------------------------------------------
  /*
  const signup = async (username, email, password) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/signup`,
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const result = response.data;

      if (result.status === "success") {
        return {
          success: true,
          user: result.username,
        };
      }

      return {
        success: false,
        message: result.message || "Signup failed",
      };
    } catch (error) {
      if (error.response?.data?.status === "register_error") {
        toast.error(error.response.data.message);

        return {
          success: false,
          message: error.response.data.message,
        };
      }

      console.error("Signup Failed:", error);

      return {
        success: false,
        message: "An error occurred during signup.",
      };
    }
  };
  */

  // --------------------------------------------------
  // LOCAL LOGOUT
  // --------------------------------------------------
  const logout = async () => {
    localStorage.removeItem("ecart_user");

    setUserId(null);
    setUser("");
    setUserEmail(null);
    setAccessToken(null);
    setProfileSrc(null);
    setIsverified(false);

    toast.success("Logged out successfully");
  };

  // --------------------------------------------------
  // BACKEND LOGOUT - ENABLE LATER
  // --------------------------------------------------
  /*
  const logout = async () => {
    setAccessToken(null);
    setUser(null);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.status === "success") {
        toast(res.data.message, {
          cancel: {
            label: "Ok",
          },
        });
      }
    } catch (err) {
      toast.error(`Logout error: ${err}`);
    }
  };
  */

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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);