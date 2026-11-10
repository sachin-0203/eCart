import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import LoginStages from "./LoginStages";

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
const isPhone = (value) => /^\+?[0-9\s-]{7,15}$/.test(value.trim());

const getApiErrorMessage = (error) => {
  const data = error.response?.data;
  if (typeof data?.detail === "string") return data.detail;
  if (typeof data === "string") return data;

  if (data && typeof data === "object") {
    const message = Object.entries(data)
      .map(([field, messages]) => {
        const detail = Array.isArray(messages) ? messages.join(" ") : String(messages);
        return `${field.replaceAll("_", " ")}: ${detail}`;
      })
      .join(" ");
    if (message) return message;
  }

  return error.message || "Unable to complete sign-in. Please try again.";
};

const maskEmail = (value) => {
  if (!value || !isEmail(value)) return "your email";

  const [localPart, domain] = value.split("@");
  return `${localPart.slice(0, 2)}***@${domain}`;
};

export default function LoginForm() {
  const { loginWithOTP, signup, sendEmailOTP, verifyEmailOTP } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [stage, setStage] = useState("identifier");
  const [isNewUser, setIsNewUser] = useState(false);
  const [phoneEmailInput, setPhoneEmailInput] = useState("");
  const [showPhoneEmailPopup, setShowPhoneEmailPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [creatingAccount, setCreatingAccount] = useState(false);

  const resetFlow = () => {
    setStage("identifier");
    setOtp("");
    setIsNewUser(false);
    setNewUsername("");
    setNewPassword("");
    setConfirmPassword("");
    setVerificationToken("");
    setPhoneEmailInput("");
    setShowPhoneEmailPopup(false);
  };

  const requestOtp = async (email) => {
    setLoading(true);

    try {
      await sendEmailOTP(email);
      setIdentifier(email);
      setOtp("");
      setVerificationToken("");
      setIsNewUser(false);
      setNewUsername(email.split("@")[0] || "shopper");
      setStage("otp");
      toast.success(`If an account can use ${maskEmail(email)}, a verification code has been sent.`);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleIdentifierSubmit = async (event) => {
    event.preventDefault();
    const value = identifier.trim().toLowerCase();

    if (isEmail(value)) {
      await requestOtp(value);
      return;
    }

    if (isPhone(value)) {
      setPhoneEmailInput("");
      setShowPhoneEmailPopup(true);
      toast.info("Phone sign-in is not available yet. Please enter your email address.");
      return;
    }

    toast.error("Please enter a valid email address.");
  };

  const handlePhoneEmailSubmit = async (event) => {
    event.preventDefault();
    const email = phoneEmailInput.trim().toLowerCase();

    if (!isEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setShowPhoneEmailPopup(false);
    await requestOtp(email);
  };

  const handleOtpVerify = async (event) => {
    event.preventDefault();

    if (verificationToken) {
      if (isNewUser) {
        setStage("password");
      } else {
        await handleContinue();
      }
      return;
    }

    if (!/^\d{6}$/.test(otp.trim())) {
      toast.error("Enter the six-digit verification code.");
      return;
    }

    setVerifyingOtp(true);
    try {
      const verification = await verifyEmailOTP(identifier, otp.trim());
      setVerificationToken(verification.verification_token);
      setIsNewUser(verification.is_new_user);

      if (verification.is_new_user) {
        setStage("password");
        toast.success("Email verified. Finish setting up your account.");
        return;
      }

      const result = await loginWithOTP(identifier, verification.verification_token);
      if (!result.success) {
        toast.error(result.message || "Unable to sign in. Please request a new code.");
        setStage("password");
        return;
      }

      toast.success(`Welcome back, ${result.user}!`);
      resetFlow();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleContinue = async () => {
    if (!verificationToken) {
      toast.error("Verify your email again to continue.");
      resetFlow();
      return;
    }

    setVerifyingOtp(true);
    try {
      const result = await loginWithOTP(identifier, verificationToken);
      if (result.success) {
        toast.success(`Welcome back, ${result.user}!`);
        resetFlow();
      } else {
        toast.error(result.message || "Unable to sign in. Please request a new code.");
      }
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();

    if (!newUsername.trim()) {
      toast.error("Choose a username.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error("Create and confirm your password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setCreatingAccount(true);
    const result = await signup(
      newUsername.trim(),
      identifier,
      newPassword,
      verificationToken,
    );

    if (result.success) {
      toast.success(`Welcome ${result.user}! Your account is ready.`);
      resetFlow();
    } else {
      toast.error(result.message || "Account creation failed.");
    }
    setCreatingAccount(false);
  };

  const headerText =
    stage === "identifier"
      ? "Welcome back"
      : stage === "otp"
        ? "Verify your email"
        : "Create your account";

  return (
    <div className="space-y-4">
      <LoginStages
        stage={stage}
        headerText={headerText}
        identifier={identifier}
        setIdentifier={setIdentifier}
        onIdentifierSubmit={handleIdentifierSubmit}
        loading={loading}
        onReset={resetFlow}
        maskEmail={maskEmail}
        otp={otp}
        setOtp={setOtp}
        onOtpVerify={handleOtpVerify}
        verifyingOtp={verifyingOtp}
        onResendOTP={() => requestOtp(identifier)}
        onPasswordBack={() => setStage("otp")}
        onContinue={handleContinue}
        isNewUser={isNewUser}
        newUsername={newUsername}
        setNewUsername={setNewUsername}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        onCreateAccount={handleCreateAccount}
        creatingAccount={creatingAccount}
      />

      {showPhoneEmailPopup && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0F172A]/40 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-border-color bg-white p-5 shadow-lg">
            <h3 className="text-lg font-bold text-primary">Email required</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Phone sign-in is not available yet. Please enter your email address to continue.
            </p>

            <form className="mt-4 space-y-4" onSubmit={handlePhoneEmailSubmit}>
              <div className="relative">
                <input
                  id="phone-email"
                  type="email"
                  value={phoneEmailInput}
                  onChange={(event) => setPhoneEmailInput(event.target.value)}
                  placeholder=" "
                  className="peer w-full rounded-md border border-border-color bg-surface p-2.5 text-sm text-primary outline-none focus:border-primary"
                />
                <label
                  htmlFor="phone-email"
                  className={`pointer-events-none absolute left-2 top-2 bg-surface px-1 text-sm text-text-secondary transition-all ${
                    phoneEmailInput ? "-top-2.5 text-xs" : ""
                  } peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary`}
                >
                  Email address
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPhoneEmailPopup(false)}
                  className="flex-1 rounded-md border border-border-color bg-surface px-4 py-2.5 text-sm font-semibold text-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-70"
                >
                  {loading ? "Sending..." : "Continue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
