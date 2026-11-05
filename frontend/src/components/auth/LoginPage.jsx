import React, { useState } from "react";
import { Loader, ShieldCheck, ArrowLeft, KeyRound, MailCheck, UserPlus } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import BACKEND_URL from "../../../config";
import { useAuth } from "../../context/AuthContext";

const DEMO_OTP = "123456";

const normalizePhone = (value) => value.replace(/\D/g, "");

const looksLikeEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
const looksLikePhone = (value) => /^\+?[0-9\s-]{7,15}$/.test(value.trim());

const getAccountEmailFromIdentifier = (identifier) => {
  const trimmed = identifier.trim();

  if (looksLikeEmail(trimmed)) return trimmed.toLowerCase();

  const digits = normalizePhone(trimmed);
  return digits ? `user${digits}@ecart.local` : "";
};

const maskIdentifier = (value) => {
  if (!value) return "your account";
  if (looksLikeEmail(value)) {
    const [local, domain] = value.split("@");
    if (local.length <= 2) return `${local[0]}***@${domain}`;
    return `${local.slice(0, 2)}***@${domain}`;
  }

  const digits = normalizePhone(value);
  if (digits.length <= 4) return `***${digits.slice(-2)}`;
  return `***${digits.slice(-4)}`;
};

export default function LoginForm() {
  const { login, signup, setUser, setAccessToken } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [creatingAccount, setCreatingAccount] = useState(false);

  const resetFlow = () => {
    setShowOtpStep(false);
    setShowPasswordLogin(false);
    setOtp("");
    setPassword("");
    setMatchedUser(null);
    setShowCreatePopup(false);
  };

  const handleIdentifierSubmit = async (e) => {
    e.preventDefault();

    if (!identifier.trim()) {
      toast.error("Enter your email or phone number.");
      return;
    }

    const trimmed = identifier.trim();
    const isPhone = looksLikePhone(trimmed);

    if (!looksLikeEmail(trimmed) && !isPhone) {
      toast.error("Please enter a valid email or phone number.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`${BACKEND_URL}/api/auth/users/`);
      const users = Array.isArray(response.data) ? response.data : [];

      const foundUser = users.find((user) => {
        const emailMatches = user.email && user.email.toLowerCase() === trimmed.toLowerCase();
        const phoneMatches =
          user.phone_number &&
          normalizePhone(user.phone_number) === normalizePhone(trimmed);

        return emailMatches || phoneMatches;
      });

      if (foundUser) {
        setMatchedUser(foundUser);
        setShowOtpStep(true);
        setShowPasswordLogin(false);
        setShowCreatePopup(false);
        toast.success(`OTP sent to ${maskIdentifier(foundUser.email || foundUser.phone_number || trimmed)}.`);
        return;
      }

      setMatchedUser(null);
      setShowOtpStep(true);
      setShowPasswordLogin(false);
      setShowCreatePopup(true);
      const derivedEmail = getAccountEmailFromIdentifier(trimmed);
      const usernameFromIdentifier = looksLikeEmail(trimmed)
        ? trimmed.split("@")[0]
        : `user${normalizePhone(trimmed).slice(-6)}`;

      setNewUsername(usernameFromIdentifier || "guest_user");
      setPassword("");
      setConfirmPassword("");
      setNewPassword("");
      toast.info(`No account found. Create a password to finish sign up for ${derivedEmail}.`);
    } catch (error) {
      console.error("Identifier lookup failed:", error);
      toast.error("Unable to verify your account right now.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      toast.error("Enter the OTP to continue.");
      return;
    }

    if (otp.trim() !== DEMO_OTP) {
      toast.error("Incorrect OTP. Use 123456 for demo.");
      return;
    }

    if (!matchedUser) {
      setShowCreatePopup(true);
      return;
    }

    const demoUser = {
      id: matchedUser.id,
      username: matchedUser.username,
      email: matchedUser.email,
      profile: null,
      isVerified: true,
    };

    localStorage.setItem("ecart_user", JSON.stringify(demoUser));
    setUser(demoUser.username);
    setAccessToken("demo-otp-token");
    toast.success(`Welcome back, ${demoUser.username}!`);
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();

    if (!matchedUser || !password.trim()) {
      toast.error("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const result = await login(matchedUser.email, password);

      if (!result.success) {
        toast.error(result.message || "Password login failed.");
        return;
      }

      toast.success(`Login success! Hello ${result.user}`);
    } catch (error) {
      toast.error("Password login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    const enteredEmail = getAccountEmailFromIdentifier(identifier);

    if (!newUsername.trim()) {
      toast.error("Choose a username.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error("Create and confirm your password.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setCreatingAccount(true);

    try {
      const result = await signup(newUsername.trim(), enteredEmail, newPassword);

      if (!result.success) {
        toast.error(result.message || "Account creation failed.");
        return;
      }

      setShowCreatePopup(false);
      setShowOtpStep(false);
      setIdentifier("");
      setPassword("");
      setConfirmPassword("");
      setNewPassword("");
      toast.success(`Welcome ${result.user}! Your account is ready.`);
    } catch (error) {
      toast.error("Failed to create account. Try again.");
    } finally {
      setCreatingAccount(false);
    }
  };

  const formTitle = matchedUser ? "Verify your account" : "Create your account";

  return (
    <>
      <div className="space-y-4">
        {!showOtpStep ? (
          <>
            <h2 className="text-xl font-bold text-primary mb-1">Welcome back 👋</h2>
            <p className="text-sm text-text-secondary mb-4">Enter your email or phone to continue</p>

            <form className="space-y-4 text-primary" onSubmit={handleIdentifierSubmit}>
              <div className="relative">
                <input
                  id="identifier"
                  type="text"
                  placeholder=" "
                  className="peer w-full bg-surface p-2.5 border border-border-color rounded-md text-sm text-primary placeholder-transparent outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoComplete="username"
                />

                <label
                  htmlFor="identifier"
                  className={`absolute left-2 px-1 top-2 text-text-secondary bg-surface pointer-events-none transition-all ${
                    identifier ? "top-[-11px] text-sm" : ""
                  } peer-focus:text-sm peer-focus:text-primary peer-focus:top-[-11px]`}
                >
                  Email or phone
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 bg-primary text-white rounded-md hover:bg-primary-hover text-sm font-semibold transition-all cursor-pointer ${
                  loading ? "cursor-not-allowed opacity-70" : ""
                }`}
              >
                {loading ? <Loader size={20} className="animate-spin mx-auto" /> : "Continue"}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="mb-4 flex items-center gap-2">
              <button
                type="button"
                onClick={resetFlow}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-primary transition hover:bg-primary/10"
                aria-label="Back"
              >
                <ArrowLeft size={16} />
              </button>
              <p className="text-sm font-medium text-text-secondary">Back</p>
            </div>

            <h2 className="text-xl font-bold text-primary mb-1">{formTitle}</h2>

            {matchedUser ? (
              <p className="mb-4 text-sm text-text-secondary">
                We found your account. Enter the OTP sent to <span className="font-semibold text-primary">{maskIdentifier(matchedUser.email || matchedUser.phone_number || identifier)}</span>.
              </p>
            ) : (
              <p className="mb-4 text-sm text-text-secondary">No account found for this number. Create a password to finish registration.</p>
            )}

            {matchedUser && !showPasswordLogin ? (
              <form className="space-y-4 text-primary" onSubmit={handleOtpVerify}>
                <div className="relative">
                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder=" "
                    className="peer w-full bg-surface p-2.5 border border-border-color rounded-md text-sm text-primary placeholder-transparent outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  />

                  <label
                    htmlFor="otp"
                    className={`absolute left-2 px-1 top-2 text-text-secondary bg-surface pointer-events-none transition-all ${
                      otp ? "top-[-11px] text-sm" : ""
                    } peer-focus:text-sm peer-focus:text-primary peer-focus:top-[-11px]`}
                  >
                    OTP code
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-primary text-white rounded-md hover:bg-primary-hover text-sm font-semibold transition-all cursor-pointer"
                >
                  Continue
                </button>

                <button
                  type="button"
                  onClick={() => setShowPasswordLogin(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-border-color bg-surface px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/5"
                >
                  <KeyRound size={16} />
                  Login with password
                </button>
              </form>
            ) : matchedUser && showPasswordLogin ? (
              <form className="space-y-4 text-primary" onSubmit={handlePasswordLogin}>
                <div className="relative">
                  <input
                    id="password-login"
                    type="password"
                    placeholder=" "
                    className="peer w-full bg-surface p-2.5 border border-border-color rounded-md text-sm text-primary placeholder-transparent outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />

                  <label
                    htmlFor="password-login"
                    className={`absolute left-2 px-1 top-2 text-text-secondary bg-surface pointer-events-none transition-all ${
                      password ? "top-[-11px] text-sm" : ""
                    } peer-focus:text-sm peer-focus:text-primary peer-focus:top-[-11px]`}
                  >
                    Password
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 bg-primary text-white rounded-md hover:bg-primary-hover text-sm font-semibold transition-all cursor-pointer ${
                    loading ? "cursor-not-allowed opacity-70" : ""
                  }`}
                >
                  {loading ? <Loader size={20} className="animate-spin mx-auto" /> : "Login"}
                </button>
              </form>
            ) : (
              <div className="space-y-3 text-primary">
                <div className="flex items-center gap-2 rounded-xl bg-[#F5F8FC] px-3 py-2 text-xs text-text-secondary">
                  <ShieldCheck size={15} className="text-primary" />
                  Account setup is quick and secure.
                </div>

                <button
                  type="button"
                  onClick={() => setShowCreatePopup(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
                >
                  <UserPlus size={16} />
                  Create password
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {showCreatePopup && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0B2E59]/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-[#DCE6F5] bg-white p-5 shadow-[0_25px_80px_rgba(11,46,89,0.22)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-text-secondary">Create account</p>
                <h3 className="mt-1 text-2xl font-bold text-primary">Set your password</h3>
              </div>

              <button
                type="button"
                onClick={() => setShowCreatePopup(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-primary transition hover:bg-primary/10"
                aria-label="Close create account"
              >
                ×
              </button>
            </div>

            <form className="mt-5 space-y-4" onSubmit={handleCreateAccount}>
              <div className="relative">
                <input
                  id="new-username"
                  type="text"
                  placeholder=" "
                  className="peer w-full bg-surface p-2.5 border border-border-color rounded-md text-sm text-primary placeholder-transparent outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />

                <label
                  htmlFor="new-username"
                  className={`absolute left-2 px-1 top-2 text-text-secondary bg-surface pointer-events-none transition-all ${
                    newUsername ? "top-[-11px] text-sm" : ""
                  } peer-focus:text-sm peer-focus:text-primary peer-focus:top-[-11px]`}
                >
                  Username
                </label>
              </div>

              <div className="relative">
                <input
                  id="new-password"
                  type="password"
                  placeholder=" "
                  className="peer w-full bg-surface p-2.5 border border-border-color rounded-md text-sm text-primary placeholder-transparent outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <label
                  htmlFor="new-password"
                  className={`absolute left-2 px-1 top-2 text-text-secondary bg-surface pointer-events-none transition-all ${
                    newPassword ? "top-[-11px] text-sm" : ""
                  } peer-focus:text-sm peer-focus:text-primary peer-focus:top-[-11px]`}
                >
                  Password
                </label>
              </div>

              <div className="relative">
                <input
                  id="confirm-new-password"
                  type="password"
                  placeholder=" "
                  className="peer w-full bg-surface p-2.5 border border-border-color rounded-md text-sm text-primary placeholder-transparent outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <label
                  htmlFor="confirm-new-password"
                  className={`absolute left-2 px-1 top-2 text-text-secondary bg-surface pointer-events-none transition-all ${
                    confirmPassword ? "top-[-11px] text-sm" : ""
                  } peer-focus:text-sm peer-focus:text-primary peer-focus:top-[-11px]`}
                >
                  Confirm password
                </label>
              </div>

              <button
                type="submit"
                disabled={creatingAccount}
                className={`w-full py-2.5 rounded-md bg-primary text-sm font-semibold text-white transition hover:bg-primary-hover ${
                  creatingAccount ? "cursor-not-allowed opacity-70" : ""
                }`}
              >
                {creatingAccount ? <Loader size={18} className="animate-spin mx-auto" /> : "Create account"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
