import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
// import GoogleLoginBtn from "../GoogleLoginButton/GoogleLoginButton";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function LoginForm() {
  const { login, setAccessToken, setUser } = useAuth();

  const [useremail, setUseremail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!useremail || !userpassword) {
      toast.error("Incomplete User Data");
      return;
    }

    setLoading(true);

    try {
      const res = await login(useremail, userpassword);

      if (res.success) {
        toast.success(`Login Success! Hello ${res.user}`);
      } else {
        toast(`Login Failed: ${res.message}`, {
          cancel: { label: "Ok" },
        });
      }
    } catch (err) {
      toast.error("Login failed! Try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold text-primary mb-1">
        Welcome back 👋
      </h2>

      <p className="text-sm text-text-secondary mb-4">
        Please login to continue
      </p>

      <form className="space-y-4 text-primary" onSubmit={handleLogin}>
        {/* Email */}
        <div className="relative">
          <input
            id="email"
            type="email"
            placeholder=" "
            className="peer w-full bg-surface p-2.5 border border-border-color rounded-md text-sm text-primary placeholder-transparent outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
            value={useremail}
            onChange={(e) => setUseremail(e.target.value)}
            autoComplete="email"
          />

          <label
            htmlFor="email"
            className={`absolute left-2 px-1 top-2 text-text-secondary bg-surface pointer-events-none transition-all ${
              useremail ? "top-[-11px] text-sm" : ""
            } peer-focus:text-sm peer-focus:text-primary peer-focus:top-[-11px]`}
          >
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            id="password"
            type="password"
            placeholder=" "
            className="peer w-full bg-surface p-2.5 border border-border-color rounded-md text-sm text-primary outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
            value={userpassword}
            onChange={(e) => setUserpassword(e.target.value)}
            autoComplete="current-password"
          />

          <label
            htmlFor="password"
            className={`absolute left-2 px-1 bg-surface text-text-secondary transition-all ${
              userpassword ? "top-[-11px] text-sm" : ""
            } peer-placeholder-shown:top-2 peer-focus:top-[-11px] peer-focus:text-sm peer-focus:text-primary`}
          >
            Password
          </label>
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <a
            href="#"
            className="text-xs text-secondary hover:text-secondary-hover hover:underline transition-colors"
          >
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 bg-primary text-white rounded-md hover:bg-primary-hover text-sm font-semibold transition-all cursor-pointer ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
        >
          {loading ? (
            <Loader size={20} className="animate-spin mx-auto" />
          ) : (
            "Login"
          )}
        </button>
      </form>

      {/* 
      <div className="mt-4 border border-border-color rounded-sm">
        <GoogleLoginBtn
          onLogin={({ token, username, dp }) => {
            setUser(username);
            setAccessToken(token);
          }}
        />
      </div> 
      */}
    </>
  );
}