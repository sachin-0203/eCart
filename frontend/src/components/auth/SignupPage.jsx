import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
// import GoogleLoginBtn from "../GoogleLoginButton/GoogleLoginButton";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [otp, setOtp] = useState("");
  const [stage, setStage] = useState("details");
  const [verificationToken, setVerificationToken] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup, loginWithOTP, sendEmailOTP, verifyEmailOTP } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (stage === "details") {
        if (!username || !useremail || !userpassword) {
          toast.error("User data is missing!");
          return;
        }

        await sendEmailOTP(useremail.trim().toLowerCase());
        setStage("otp");
        toast.success("A verification code has been sent to your email.");
        return;
      }

      if (stage === "login") {
        const loginResult = await loginWithOTP(
          useremail.trim().toLowerCase(),
          verificationToken,
        );
        if (loginResult.success) {
          toast.success(`Welcome back, ${loginResult.user}!`);
          setUsername("");
          setUseremail("");
          setUserpassword("");
          setOtp("");
          setVerificationToken("");
          setStage("details");
        } else {
          toast.error(loginResult.message || "Unable to sign in.");
        }
        return;
      }

      let verifiedToken = verificationToken;
      if (stage === "otp") {
        const verification = await verifyEmailOTP(useremail.trim().toLowerCase(), otp.trim());
        if (!verification.is_new_user) {
          setVerificationToken(verification.verification_token);
          setStage("login");
          const loginResult = await loginWithOTP(
            useremail.trim().toLowerCase(),
            verification.verification_token,
          );
          if (loginResult.success) {
            toast.success(`Welcome back, ${loginResult.user}!`);
            setUsername("");
            setUseremail("");
            setUserpassword("");
            setOtp("");
            setVerificationToken("");
            setStage("details");
          } else {
            toast.error(loginResult.message || "Unable to sign in.");
          }
          return;
        }

        verifiedToken = verification.verification_token;
        setVerificationToken(verifiedToken);
        setStage("create");
      }

      const signup_res = await signup(
        username.trim(),
        useremail.trim().toLowerCase(),
        userpassword,
        verifiedToken,
      );

      if (signup_res.success) {
        toast.success(`Welcome ${signup_res.user}! Your account is ready.`);
        setUsername("");
        setUseremail("");
        setUserpassword("");
        setOtp("");
        setVerificationToken("");
        setStage("details");
      } else {
        toast.error(`${signup_res.message}`);
      }
    } catch (error) {
      const message = error.response?.data?.detail || "Unable to complete sign-up. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold text-primary mb-1">
        Create your account 🚀
      </h2>

      <p className="text-sm text-text-secondary mb-4">
        Let’s get you started!
      </p>

      <form className="space-y-3 text-primary" onSubmit={handleSignup}>

        {/* Username */}
        <div className="relative">
          <input
            id="userN"
            type="text"
            placeholder=" "
            className="peer w-full p-2.5 bg-surface border border-border-color rounded-md text-sm text-primary outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <label
            htmlFor="userN"
            className={`absolute top-2 left-2 px-1 text-sm bg-surface text-text-secondary transition-all ${
              username ? "top-[-10px]" : ""
            } peer-placeholder-shown:top-2 peer-focus:top-[-10px] peer-focus:text-primary peer-focus:pr-1`}
          >
            Username
          </label>
        </div>

        {stage === "otp" && (
          <div className="relative">
            <input
              id="signupOtp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder=" "
              className="peer w-full rounded-md border border-border-color bg-surface p-2.5 text-sm text-primary outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
              required
            />
            <label
              htmlFor="signupOtp"
              className={`absolute left-2 top-2 px-1 text-sm text-text-secondary transition-all ${
                otp ? "-top-2.5 bg-surface text-xs" : "peer-focus:-top-2.5 peer-focus:bg-surface peer-focus:text-xs"
              }`}
            >
              Email verification code
            </label>
          </div>
        )}

        {/* Email */}
        <div className="relative">
          <input
            id="userE"
            type="email"
            placeholder=" "
            disabled={stage !== "details"}
            className="peer w-full p-2.5 bg-surface border border-border-color rounded-md text-sm text-primary outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
            value={useremail}
            onChange={(e) => {
              setUseremail(e.target.value);
            }}
          />

          <label
            htmlFor="userE"
            className={`absolute top-2 left-2 px-1 text-sm bg-surface text-text-secondary transition-all ${
              useremail ? "top-[-10px]" : ""
            } peer-focus:text-primary peer-focus:pr-1 peer-focus:top-[-10px]`}
          >
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            id="userP"
            type="password"
            placeholder=" "
            className="peer w-full p-2.5 bg-surface border border-border-color rounded-md text-sm text-primary outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
            value={userpassword}
            onChange={(e) => {
              setUserpassword(e.target.value);
            }}
          />

          <label
            htmlFor="userP"
            className={`absolute top-2 left-2 px-1 text-sm bg-surface text-text-secondary transition-all ${
              userpassword ? "top-[-10px]" : ""
            } peer-focus:text-primary peer-focus:pr-1 peer-focus:top-[-10px]`}
          >
            Password
          </label>
        </div>

        {/* Terms */}
        <div className="flex items-center text-sm">
          <input
            type="checkbox"
            id="terms"
            className="mr-2 h-4 w-4 accent-primary cursor-pointer"
            required
          />

          <label htmlFor="terms" className="text-text-secondary">
            I agree to the{" "}
            <Link
              to="/terms-and-conditions"
              className="text-secondary hover:text-secondary-hover underline transition-colors"
              target="_blank"
            >
              Terms & Conditions
            </Link>
          </label>
        </div>

        {/* Signup Button */}
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
            stage === "details"
              ? "Send verification code"
              : stage === "otp"
                ? "Verify & create account"
                : stage === "login"
                  ? "Continue to account"
                  : "Create account"
          )}
        </button>
      </form>

      {/* 
      <div className="mt-3 border border-border-color rounded-sm">
        <GoogleLoginBtn
          onLogin={({ token, username }) => {
            setUser(username);
            setAccessToken(token);
            navigate("/");
          }}
        />
      </div> 
      */}
    </>
  );
}