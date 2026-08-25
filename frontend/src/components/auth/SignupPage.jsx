import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
// import GoogleLoginBtn from "../GoogleLoginButton/GoogleLoginButton";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup, setUser, setAccessToken } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !useremail || !userpassword) {
      toast.error("User data is missing!");
      return;
    }

    setLoading(true);

    try {
      const signup_res = await signup(username, useremail, userpassword);

      if (signup_res.success) {
        toast.success(
          `Signup success: ${signup_res.user}, LogIn now!`,
          { duration: 2000 }
        );

        setTimeout(() => {
          toast.info("Please check your mailbox and verify yourself", {
            duration: 4000,
          });
        }, 2000);

        setUsername("");
        setUseremail("");
        setUserpassword("");
      } else {
        toast.error(`${signup_res.message}`);
        return;
      }
    } catch (err) {
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

        {/* Email */}
        <div className="relative">
          <input
            id="userE"
            type="email"
            placeholder=" "
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
            "Signup"
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